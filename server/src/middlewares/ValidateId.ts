import { NextFunction, Request, Response } from 'express'
import GlobalError from '@/utils/GlobalError'
import { Types } from 'mongoose'

export default function ValidateId(
  req: Request<{ id: string }>,
  _: Response,
  next: NextFunction
) {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return next(new GlobalError('User not found', 404))
  }
  next()
}
