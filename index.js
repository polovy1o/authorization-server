import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import UserRouter from './routers/UserRouter.js'
import { connectDatabase } from './database.js'
import ErrorHandlerMiddleware from './middlewares/ErrorHandlerMiddleware.js'

const app = express()

app.use(express.json())
app.use(cors({ origin: true, credentials: true }))
app.use(cookieParser())

app.use(
    '/auth',   
    UserRouter
)

app.use(ErrorHandlerMiddleware)

startServer()

async function startServer() {
    try {
        app.listen(process.env.PORT || 3001, () => {
            connectDatabase().then(() => {
                console.log('Сервер був запущений на порту:', (process.env.PORT || 3001), '\n\n\n')
            }).catch((e) => {
                console.log(e, 'Помилка при створенні БД\n\n\n')
            }) 
        }).on('close', () => {
            sequelize.close()
        })
    } catch (e) {
        console.error(e.message, '\n\n\nПомилка при запуску сервера')
    }
}