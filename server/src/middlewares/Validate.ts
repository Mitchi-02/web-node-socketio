import { NextFunction, Request, Response } from 'express'
import GlobalError from '@/utils/GlobalError'
import { AnyZodObject } from 'zod'

export default function Validate(schema: AnyZodObject, target?: 'body' | 'query') {
  return (req: Request, _: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target || 'body'])
    if (!result.success) {
      return next(
        new GlobalError('Validation error', 422, result.error.flatten().fieldErrors)
      )
    }
    req[target || 'body'] = result.data
    next()
  }
}
