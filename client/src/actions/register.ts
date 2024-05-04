'use server'

import { createUser } from '@/api/user'
import { dbConnect } from '@/lib'
import { User } from '@/models'
import { hash } from "bcryptjs"

export default async function register({
  email,
  name,
  password,
}: {
  email: string
  name: string
  password: string
}) {
  try {
    await dbConnect()
    const user = await User.findOne({
      email,
    })
    if (user) return { error: 'Email already used' }

    const u = await createUser({ name, avatar: '/profile.jpg' })
    await User.create({
      inChatId: u._id,
      name,
      email,
      password: await hash(password, 10),
      avatar: '/profile.jpg'
    })
  } catch (error: any) {
    return { error: error.message }
  }
}
