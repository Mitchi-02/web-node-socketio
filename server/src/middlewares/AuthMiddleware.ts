import { Response, NextFunction, Request } from 'express'
import { verifyToken } from '@/utils/auth'
import GlobalError from '@/utils/GlobalError'


export default function AuthMiddleware(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) {
    throw new GlobalError('Unauthenticated', 401)
  }
  const user = verifyToken(token)
  if (!user) {
    throw new GlobalError('Unauthenticated', 401)
  }
  req.user = user
  next()
}
