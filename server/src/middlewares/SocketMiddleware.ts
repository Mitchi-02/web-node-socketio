import { verifyToken } from '@/utils/auth'
import { Socket } from 'socket.io'


export default function SocketMiddleware(socket: Socket, next: any) {
  console.log('trying to connect')
  const token = socket.handshake.auth.token
  const user = verifyToken(token)
  if (!user) {
    return next(new Error('Not authenticated'))
  }
  socket.join(user.userId)
  console.log('user joined room ' + user.userId)
  socket.data = user
  next()
}