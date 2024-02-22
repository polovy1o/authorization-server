import sequelize from "../database.js";
import CryptoUtil from "../utils/crypto.js";

class User
{
    getUser(userId)
    {
        return sequelize.models.user.findByPk(userId)
    }

    getUserByEmail(email)
    {
        return sequelize.models.user.findOne({ where: { email } })
    }

    async getUserIdByEmail(email)
    {
        const data = await sequelize.models.user.findOne({ where: { email }, attributes: ['id'] });
        return data ? data.id : null;
    }

    async isExixtsByEmail(email)
    {
        const count = await sequelize.models.user.count({where: {email}})
        return count > 0; 
    }

    async create({ email, firstName, hashedPassword })
    {
        const [user, created] = await sequelize.models.user.findOrCreate({
            where: { email },
            defaults: { hashedPassword, firstName }
        })
        return !created;
    }

    async comparePassword({ email, password })
    {
        const user = await sequelize.models.user.findOne({ where: { email } });

        if (user) {
            const isCompared = await CryptoUtil.comparePasswords(password, user.hashedPassword)
            return isCompared ? user : false;
        }

        return null;
    }

    update(userId, updatedData)
    {
        return sequelize.models.user.update(updatedData, { where: { id: userId } })
    }
}

const UserService = new User()

export default UserService