import { Router } from 'express'
import * as UserController from '@/controllers/UserController'
import Validate from '@/middlewares/Validate'
import { paginationSchema, userSchema } from '@/utils/schemas'
import ValidateId from '@/middlewares/ValidateId'
import AdminMiddleware from '@/middlewares/AdminMiddleware'

const UserRoutes = Router()

UserRoutes.use(AdminMiddleware)
UserRoutes.get('/', Validate(paginationSchema, 'query'), UserController.index)
UserRoutes.post('/', Validate(userSchema), UserController.store)
UserRoutes.put('/:id', ValidateId, Validate(userSchema), UserController.update)
UserRoutes.get('/:id', ValidateId, UserController.show)
UserRoutes.delete('/:id', ValidateId, UserController.del)

export default UserRoutes
