import { param, body } from 'express-validator'
import ValidationMiddleware from './ValidationMiddleware.js'

const SetPasswordMiddlewares = [
    param('code').isHexadecimal().withMessage('Некоректний код'),
    body('newPassword')
        .exists().withMessage('Потрібен пароль').bail()
        .isLength({min: 8}).withMessage('Мінімальная довжина паролю 6 символів').bail()
        .isLength({max: 24}).withMessage('Максимальна довжина паролю 24 символа'),
    ValidationMiddleware
]

export default SetPasswordMiddlewares