import { body } from 'express-validator'
import ValidationMiddleware from './ValidationMiddleware.js'

const RegisterMiddlewares = [
    body('firstName')
        .exists().withMessage('Потрібне ваше ім\'я').bail(),
    body('email')
        .exists().withMessage('Потрібен email').bail()
        .normalizeEmail().isEmail().withMessage('Некоректний email'),
    body('password')
        .exists().withMessage('Потрібен пароль').bail()
        .isLength({min: 8}).withMessage('Мінімальная довжина паролю 6 символів').bail()
        .isLength({max: 24}).withMessage('Максимальна довжина паролю 24 символа'),
    ValidationMiddleware
]

export default RegisterMiddlewares