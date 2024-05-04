import { CorsOptions } from 'cors'
import { Express, urlencoded, json, static as static_ } from 'express'
import cors from 'cors'
import AuthRoutes from '@/routes/AuthRoutes'
import AuthMiddleware from '@/middlewares/AuthMiddleware'
import UserRoutes from '@/routes/UserRoutes'
import ConversationRoutes from '@/routes/ConversationRoutes'
import ErrorHandler from '@/middlewares/ErrorHandler'
import NotFoundHandler from '@/middlewares/NotFoundHandler'
import { createServer } from 'http'
import { ASSETS_PREFIX, STORAGE_PATH } from './config/storage'

export default function initServer({
  app,
  corsOptions,
}: {
  app: Express
  corsOptions: CorsOptions
}) {
  app.use(cors(corsOptions))
  app.use(urlencoded({ extended: false }))
  app.use(json())
  app.use(ASSETS_PREFIX, static_(STORAGE_PATH))
  app.use(AuthRoutes)
  app.use('/users', AuthMiddleware, UserRoutes)
  app.use('/conversations', AuthMiddleware, ConversationRoutes)

  app.use(ErrorHandler)
  app.use('*', NotFoundHandler)

  const server = createServer(app)

  return server
}
