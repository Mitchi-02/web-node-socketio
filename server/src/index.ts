import express from 'express'
import { CorsOptions } from 'cors'
import { config } from 'dotenv'
config()
import './config/db'
import initServer from './server'
import initSocket from './socket'
import connectToDB from './config/db'

const options: CorsOptions = {
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200,
}

const app = express()

connectToDB()

const server = initServer({
  app,
  corsOptions: options,
})

const io = initSocket({
  server,
  corsOptions: options,
})

server.listen(process.env.SERVER_PORT || 4000, () => {
  console.log(
    'Server is running at http://localhost:' + (process.env.SERVER_PORT || 4000)
  )
})
