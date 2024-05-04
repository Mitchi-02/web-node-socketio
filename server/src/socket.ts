import { CorsOptions } from 'cors'
import { Server as srv } from 'ws'
import { Server as ServerType } from 'http'
import {
  ClientToServerEvents,
  DataType,
  ServerToClientEvents,
} from '@/types/socket'
import { Server } from 'socket.io'
import NewMessage from '@/events/NewMessage'
import NewConversation from '@/events/NewConversation'
import SocketMiddleware from '@/middlewares/SocketMiddleware'

export default function initSocket({
  server,
  corsOptions,
}: {
  server: ServerType
  corsOptions: CorsOptions
}) {
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    any,
    DataType
  >(server, {
    maxHttpBufferSize: 1e7,
    cors: corsOptions,
    wsEngine: srv,
  })

  io.use(SocketMiddleware)

  io.on('connection', (socket) => {
    console.log('connection')
    socket.on('SEND_EXIST', (...arg) => NewMessage(io, socket, ...arg))
    socket.on('SEND_NOT_EXIST', (...arg) => NewConversation(io, socket, ...arg))
    socket.on('disconnect', () => console.log('user disconnected'))
  })

  return io
}
