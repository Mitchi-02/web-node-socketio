'use server'

import db from '@/lib/db'
import { User } from '@/models'
import { IUser, UserModel } from '@/types/models'

export default async function getUsers(): Promise<any[]> {
  await db()
  const users = await User.find()
  return users
}
