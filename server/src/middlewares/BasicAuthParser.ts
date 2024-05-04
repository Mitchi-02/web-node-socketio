import { Response, NextFunction, Request } from 'express'
import { decodeBasicToken } from '@/utils/auth'
import GlobalError from '@/utils/GlobalError'

export default function BasicAuthParser(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const token = req.headers.authorization
  if (!token || !token.startsWith('Basic ')) {
    return next(new GlobalError('Unauthenticated', 401))
  }
  const cred = decodeBasicToken(token.replace('Basic ', ''))
  if (!cred) return next(new GlobalError('Unauthenticated', 401))
  req.credentials = cred
  next()
}
