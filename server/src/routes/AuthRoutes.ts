import { Router } from 'express'
import * as AuthController from '@/controllers/AuthController'
import BasicAuthParser from '@/middlewares/BasicAuthParser'
import Validate from '@/middlewares/Validate'
import { basicAuthSchema } from '@/utils/schemas'

const AuthRoutes = Router()

AuthRoutes.post('/auth', BasicAuthParser, Validate(basicAuthSchema), AuthController.authenticate)

export default AuthRoutes
