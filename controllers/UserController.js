import PasswordCodeService from "../services/PasswordCodeService.js";
import RegisterCodeService from "../services/RegisterCodeService.js";
import UserService from "../services/UserService.js";
import CryptoUtil from "../utils/crypto.js";
import EmailUtil from "../utils/email.js";
import TokenUtil from "../utils/token.js";

export class User {
    
    async register(req, res, next) {
        const { email, firstName, password } = req.body;

        try {
            if (await UserService.isExixtsByEmail(email)) {
                res.status(409).json({ message: "User is already exist"})
                return;
            }

            if (await RegisterCodeService.isExistsByEmail(email))
            {
                res.status(409).json({ message: "Code is already sent" })
                return;
            }

            const hashedPassword = await CryptoUtil.hashPassword(password)
            const code = await CryptoUtil.randomCode(email)

            await EmailUtil.sendRegisterLink(email, code, firstName)
            await RegisterCodeService.create({ firstName, hashedPassword, email, code })

            res.sendStatus(201)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        const { email, password } = req.body;

        try {
            const user = await UserService.comparePassword({ email, password })

            if (!user) {
                res.sendStatus(404)
                return;
            }

            res.cookie('refreshToken', TokenUtil.generateRefreshToken(user.id), {
                maxAge: 2592000,
                httpOnly: true
            })

            res.json(TokenUtil.generateAccessToken(user.id))
        } catch (e) {
            next(e)
        }
    }

    async confirmEmail(req, res, next) {
        const { code } = req.params;

        try {
            const { firstName, hashedPassword, email, id } = await RegisterCodeService.getByCode(code)

            if (!id) {
                res.sendStatus(404)
                return;
            }

            await RegisterCodeService.delete(id)
            await UserService.create({ firstName, hashedPassword, email })

            res.sendStatus(201)
        } catch (e) {
            next(e)
        }
    }

    async resetPassword(req, res, next)
    {
        const { email } = req.body;

        try {
            const user = await UserService.getUserByEmail(email)

            if (!user) {
                res.sendStatus(404)
                return;
            }

            const exists = await PasswordCodeService.isExistsByUser(user.id)

            if (exists) {
                res.sendStatus(409)
                return;
            }

            const code = await CryptoUtil.randomCode(user.id)

            await EmailUtil.sendPasswordLink(email, code, user.email)
            await PasswordCodeService.create({ userId: user.id, code })

            res.sendStatus(201)
        } catch(e) {
            next(e)
        }
    }

    async getPasswordCodeUser(req, res, next)
    {
        const { code } = req.params;

        try {
            const user = await PasswordCodeService.getUserByCode(code)

            if (!user) 
            {
                res.sendStatus(404)
                return
            }

            res.json(user)
        } catch(e) {
            next(e)
        }
    }

    async setPassword(req, res, next)
    {
        const { code } = req.params
        const { newPassword } = req.body;

        try {
            const user = await PasswordCodeService.getUserByCode(code)

            if (!user) 
            {
                res.sendStatus(404)
                return
            }

            const newHashedPassword = await CryptoUtil.hashPassword(newPassword)

            await UserService.update(user.id, { hashedPassword: newHashedPassword })
            await PasswordCodeService.delete(code)

            res.sendStatus(201)
        } catch(e) {
            next(e)
        }
    }
}

const UserController = new User();

export default UserController;