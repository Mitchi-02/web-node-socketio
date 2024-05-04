import { Response, Request, NextFunction } from 'express'
import GlobalError from '@/utils/GlobalError'

export default function ErrorHandler(
  err: GlobalError,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: NextFunction
) {
  return res.status(err.status || 500).json({
    message: err.message || 'Something went wrong',
    errors: err.errors || null
  })
}
