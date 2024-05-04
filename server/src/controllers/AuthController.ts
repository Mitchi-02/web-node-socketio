import { NextFunction, Request, Response } from 'express'
import { readCustomerByCredentials } from '@/repositories/CustomerRepository'
import { readUserByIdAndCustomer } from '@/repositories/UserRepository'
import { generateToken } from '@/utils/auth'
import GlobalError from '@/utils/GlobalError'
import { BasicAuthInput } from '@/utils/schemas'

export async function authenticate(
  req: Request<
    Record<string, string>,
    Record<string, string>,
    BasicAuthInput
  >,
  res: Response,
  next: NextFunction
) {
  const customer = await readCustomerByCredentials(req.credentials)
  if (!customer) {
    return next(new GlobalError('Invalid credentials', 401))
  }
  const user = await readUserByIdAndCustomer(req.body.userId, customer.id)
  if (!user) {
    return next(new GlobalError('User not found', 404))
  }
  return res.status(200).json({
    token: generateToken(user.id, customer.id, req.body.ttl),
  })
}
