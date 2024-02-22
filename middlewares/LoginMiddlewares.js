import { body } from 'express-validator'
import ValidationMiddleware from './ValidationMiddleware.js'

const LoginMiddlewares = [
    body('email')
        .exists().withMessage('Потрібен email'),
    body('password')
        .exists().withMessage('Потрібен пароль'),
    ValidationMiddleware
]

export default LoginMiddlewares