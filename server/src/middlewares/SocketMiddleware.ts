import { Socket } from 'socket.io'

export default function SocketMiddleware(socket: Socket, next: any) {
  console.log('trying to connect')
  console.log('user joined server')
  next()
}
