import { Types } from 'mongoose'
import { TypeOf, z } from 'zod'

export const basicAuthSchema = z.object({
  userId: z.string().refine((val) => {
    return Types.ObjectId.isValid(val)
  }),
  ttl: z.number().default(60), //in minutes
})

export type BasicAuthInput = TypeOf<typeof basicAuthSchema>

export const userSchema = z.object({
  name: z.string().trim().nonempty(),
  avatar: z.string().nonempty(),
})

export type UserInput = TypeOf<typeof userSchema>

export const paginationSchema = z.object({
  page: z.coerce
    .number({
      invalid_type_error: 'Expected number',
    })
    .positive()
    .optional(),
  page_size: z.coerce
    .number({
      invalid_type_error: 'Expected number',
    })
    .positive()
    .optional(),
})


export type Pagination = TypeOf<typeof paginationSchema>