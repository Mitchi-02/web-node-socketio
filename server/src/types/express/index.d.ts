import { JwtPayload } from 'jsonwebtoken'


export {}

declare global {
  namespace Express {
    export interface Request {
      user: JwtPayload & {
        userId: string
        customerId: string
      }
      credentials: {
        CLIENT_ID: string
        CLIENT_SECRET: string
      }
    }
  }
}
