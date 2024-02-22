import { body } from 'express-validator'
import ValidationMiddleware from './ValidationMiddleware.js'

const ResetPasswordMiddlewares = [
    body('email')
        .exists().withMessage('Потрібен email').bail()
        .normalizeEmail().isEmail().withMessage('Некоректний email'),
    ValidationMiddleware
]

export default ResetPasswordMiddlewares