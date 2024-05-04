import { CorsOptions } from 'cors'
import { Express, urlencoded, json } from 'express'
import cors from 'cors'
import NotFoundHandler from '@/middlewares/NotFoundHandler'
import { createServer } from 'http'

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

  app.use('*', NotFoundHandler)

  const server = createServer(app)

  return server
}
