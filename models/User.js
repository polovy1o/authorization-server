function DefineUser(sequelize) {
    const User = sequelize.define('user', {
        email: {
            type: "VARCHAR(60)",
            allowNull: false,
            unique: true
        },
        firstName: {
            type: "VARCHAR(60)",
            allowNull: false
        },
        hashedPassword: {
            type: "VARCHAR(60)",
            allowNull: false
        }
    })
}

export default DefineUser