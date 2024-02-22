function DefineRegisterCode(sequelize) {
    sequelize.define('registerCode', {
        email: {
            type: "VARCHAR(60)",
            allowNull: false,
            unique: true
        },
        hashedPassword: {
            type: "VARCHAR(60)",
            allowNull: false
        },
        firstName: {
            type: "VARCHAR(60)",
            allowNull: false
        },
        code: {
            type: "VARCHAR(200)",
            allowNull: false,
            unique: true
        }
    })
}

export default DefineRegisterCode