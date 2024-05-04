import { Response, NextFunction, Request } from 'express'
import GlobalError from '@/utils/GlobalError'
import { readUserByIdAndCustomer } from '@/repositories/UserRepository'


export default async function AdminMiddleware(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const user = await readUserByIdAndCustomer(req.user.userId, req.user.customerId)
  if(!user || !user.isAdmin) {
    return next(new GlobalError('Not allowed to access this resource', 403))
  }
  next()
}
