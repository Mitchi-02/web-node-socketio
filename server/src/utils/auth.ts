import { verify, sign, JwtPayload } from 'jsonwebtoken'
import { Types } from 'mongoose'

export function generateToken(userId: string, customerId: string, ttl: number) {
  return sign({ customerId, userId }, process.env.SECRET_KEY || '', {
    issuer: 'APP',
    algorithm: 'HS256',
    expiresIn: ttl*60
  })
}

export function verifyToken(token: string) {
  try {
    const t = verify(token, process.env.SECRET_KEY || '', {
      issuer: 'APP',
      algorithms: ['HS256'],
    })
    if (
      typeof t !== 'object' ||
      !Types.ObjectId.isValid(t.userId) ||
      !Types.ObjectId.isValid(t.customerId)
    )
      return null
    return t as JwtPayload & {
      admin: boolean
      userId: string
      customerId: string
    }
  } catch (error) {
    return null
  }
}

export function decodeBasicToken(token: string) {
  try {
    const [CLIENT_ID, CLIENT_SECRET] = Buffer.from(token, 'base64')
      .toString('ascii')
      .split(':')
    if (!CLIENT_ID || !CLIENT_SECRET) return null

    return { CLIENT_ID, CLIENT_SECRET }
  } catch (error) {
    return null
  }
}
