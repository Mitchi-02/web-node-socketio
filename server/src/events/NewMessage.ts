import {
  ClientToServerEvents,
  SendExistsCallback,
  ServerToClientEvents,
  SocketData,
} from '@/types/socket'
import { Socket, Server } from 'socket.io'

export const MESSAGES = []

export default async function NewMessage(
  io: Server<ClientToServerEvents, ServerToClientEvents, any>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents, any, SocketData>,
  message: string,
  _: SendExistsCallback
) {
  console.log('NEW_MESSAGE')
  const msg = {
    user: socket.id,
    content: message,
    created_at: new Date().toISOString(),
  }

  io.emit('NEW_MESSAGE', msg)
  socket.data.user, console.log('sending NEW_MESSAGE callback')
}
