import { Router } from "express";
import UserController from "../controllers/UserController.js";
import RegisterMiddlewares from "../middlewares/RegisterMiddlewares.js";
import LoginMiddlewares from "../middlewares/LoginMiddlewares.js";
import ResetPasswordMiddlewares from "../middlewares/ResetPasswordMiddlewares.js";
import GetPasswordCodeUserMiddlewares from "../middlewares/GetPasswordCodeUserMiddlewares.js";
import SetPasswordMiddlewares from "../middlewares/SetPasswordMiddlewares.js";
import ConfirmEmailMiddlewares from "../middlewares/ConfirmEmailMiddlewares.js";

const UserRouter = new Router()

UserRouter.post('/register', RegisterMiddlewares, UserController.register)
UserRouter.post('/register/:code', ConfirmEmailMiddlewares, UserController.confirmEmail)
UserRouter.post('/login', LoginMiddlewares, UserController.login)
UserRouter.post('/reset', ResetPasswordMiddlewares, UserController.resetPassword)
UserRouter.get('/reset/:code', GetPasswordCodeUserMiddlewares, UserController.getPasswordCodeUser)
UserRouter.put('/reset/:code', SetPasswordMiddlewares, UserController.setPassword)

export default UserRouter