import { Sequelize } from "sequelize";
import DefineUser from "./models/User.js";
import DefineRegisterCode from "./models/RegisterCode.js";
import DefinePasswordCode from "./models/PasswordCode.js";

const sequelize = new Sequelize(
    process.env.MYSQL_DB, 
    process.env.MYSQL_USER, 
    process.env.MYSQL_PASSWORD, 
    {
        dialect: 'mysql',
        logging: false
    }
)

DefineUser(sequelize)
DefineRegisterCode(sequelize)
DefinePasswordCode(sequelize)

export async function connectDatabase() {
    const isDevelopment = process.env.NODE_ENV !== 'production';
    await sequelize.authenticate();
    await sequelize.sync({ force: isDevelopment, alter: isDevelopment })

    console.log('\n\n\nConnection to database has been established successfully.');

    if (isDevelopment) {
        await createRecordsForDevelopment()
        console.warn('  WARNING! Database in development mode\n')
    }
}


async function createRecordsForDevelopment() {
    //some new records
}

export default sequelize;