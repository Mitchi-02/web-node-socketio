import { Router } from 'express'
import * as ConversationController from '@/controllers/ConversationController'
import { paginationSchema } from '@/utils/schemas'
import Validate from '@/middlewares/Validate'
import ValidateId from '@/middlewares/ValidateId'
import AdminMiddleware from '@/middlewares/AdminMiddleware'

const ConversationRoutes = Router()

ConversationRoutes.get(
  '/',
  AdminMiddleware,
  Validate(paginationSchema, 'query'),
  ConversationController.index
)

ConversationRoutes.get(
  '/user',
  Validate(paginationSchema, 'query'),
  ConversationController.indexUser
)

ConversationRoutes.get(
  '/:id',
  ValidateId,
  Validate(paginationSchema, 'query'),
  ConversationController.show
)


export default ConversationRoutes
