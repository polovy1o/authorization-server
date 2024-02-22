function DefinePasswordCode(sequelize) {
    const PasswordCode = sequelize.define('passwordCode', {
        code: {
            type: "VARCHAR(200)",
            primaryKey: true
        }
    })
    
    PasswordCode.belongsTo(sequelize.models.user, { as: 'user', onDelete: 'CASCADE'})
}

export default DefinePasswordCode