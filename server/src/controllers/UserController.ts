import { NextFunction, Response, Request } from 'express'
import {
  countUsersByCustomer,
  createUser,
  deleteUserByIdAndCustomer,
  paginateUsersByCustomer,
  readUserByIdAndCustomer,
  updateUserByIdAndCustomer,
} from '@/repositories/UserRepository'
import GlobalError from '@/utils/GlobalError'
import { Pagination, UserInput } from '@/utils/schemas'
import { Types } from 'mongoose'

export async function index(
  req: Request<
    Record<string, string>,
    Record<string, string>,
    Record<string, string>,
    Pagination
  >,
  res: Response
) {
  res.status(200).json({
    page: req.query.page || 1,
    page_size: req.query.page || 10,
    count: await countUsersByCustomer(req.user.customerId),
    users: await paginateUsersByCustomer(req.user.customerId, req.query),
  })
}

export async function store(
  req: Request<Record<string, string>, Record<string, string>, UserInput>,
  res: Response
) {
  res.status(201).json({
    user: await createUser({
      customerId: new Types.ObjectId(req.user.customerId),
      ...req.body,
      isAdmin: false
    }),
  })
}

export async function update(
  req: Request<{ id: string }, Record<string, string>, UserInput>,
  res: Response,
  next: NextFunction
) {
  const user = await updateUserByIdAndCustomer(
    req.params.id,
    req.user.customerId,
    {
      ...req.body,
    }
  )
  if (!user) {
    return next(new GlobalError('User not found', 404))
  }
  res.status(200).json({
    user,
  })
}

export async function show(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  const user = await readUserByIdAndCustomer(req.params.id, req.user.customerId)
  if (!user) {
    return next(new GlobalError('User not found', 404))
  }
  res.status(200).json({
    user,
  })
}

export async function del(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  const user = await deleteUserByIdAndCustomer(
    req.params.id,
    req.user.customerId
  )
  if (!user) {
    return next(new GlobalError('User not found', 404))
  }
  res.status(200).json({
    user,
  })
}
