'use server'

import { updateUser } from '@/api/user'
import { dbConnect, getSession } from '@/lib'
import { User } from '@/models'

export default async function updateInfos({
  name,
  email,
}: {
  name: string
  email: string
}) {
  try {
    const session = await getSession()
    if (!session) return { error: 'You must be signed in to update profile' }
    await dbConnect()
    const user = (await User.findById(session.user!._id))!
    if (user.email !== email && (await User.findOne({ email }))) {
      return { error: 'Email already used' }
    }

    user.email = email
    user.name = name
    await user.save()
    await updateUser({ name, avatar: '/profile.jpg' }, user.inChatId)
  } catch (error: any) {
    return { error: 'Something went wrong'}
  }
}
