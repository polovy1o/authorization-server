import sequelize from "../database.js"

class RegisterCode
{
    async getByCode(code)
    {
        const registerCode = await sequelize.models.registerCode.findOne({ where: { code } })
        return registerCode ? registerCode.dataValues : {}
    }

    async isExistsByEmail(email)
    {
        const count = await sequelize.models.registerCode.count({where: {email}})
        return count > 0;
    }

    delete(id)
    {
        return sequelize.models.registerCode.destroy({ where: { id }})
    }

    async create({ firstName, hashedPassword, email, code })
    {
        const [user, created] = await sequelize.models.registerCode.findOrCreate({
            where: { email },
            defaults: { hashedPassword, firstName, code }
        })
        return !created;
    }
}

const RegisterCodeService = new RegisterCode()

export default RegisterCodeService