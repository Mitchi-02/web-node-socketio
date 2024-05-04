import { Response, Request, NextFunction } from 'express'

export default function NotFoundHandler(
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: NextFunction
) {
  return res.status(404).json({
    message: 'Not found',
  })
}
