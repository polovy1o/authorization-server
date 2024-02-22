import { param } from 'express-validator'
import ValidationMiddleware from './ValidationMiddleware.js'

const ConfirmEmailMiddlewares = [
    param('code').isHexadecimal().withMessage('Некоректний код'),
    ValidationMiddleware
]

export default ConfirmEmailMiddlewares