import sequelize from "../database.js"

class PasswordCode
{
    async getUserByCode(code)
    {
        const passwordCode = await sequelize.models.passwordCode.findOne({ where: { code } })

        if (!passwordCode) return null;
        
        const user = await passwordCode.getUser()

        return user;
    }

    async isExistsByUser(userId)
    {
        const count = await sequelize.models.passwordCode.count({ where: { userId }})
        return count > 0;
    }

    delete(code)
    {
        return sequelize.models.passwordCode.destroy({ where: { code }})
    }

    async create({ userId, code })
    {
        const [user, created] = await sequelize.models.passwordCode.findOrCreate({
            where: { userId },
            defaults: { userId, code }
        })
        return !created;
    }
}

const PasswordCodeService = new PasswordCode()

export default PasswordCodeService