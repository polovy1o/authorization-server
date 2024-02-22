import { param } from 'express-validator'
import ValidationMiddleware from './ValidationMiddleware.js'

const GetPasswordCodeUserMiddlewares = [
    param('code').isHexadecimal().withMessage('Некоректний код'),
    ValidationMiddleware
]

export default GetPasswordCodeUserMiddlewares