import axios from 'axios'
import { ApiUser } from './User'

export async function getToken(userId: string, ttl: number = 1000) {
  const basic = Buffer.from(
    `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
  ).toString('base64')
  const {
    data: { token },
  } = await axios.post(
    `${process.env.SERVER_URL}/auth`,
    { ttl: 1000, userId: userId },
    {
      headers: {
        Authorization: `Basic ${basic}`,
      },
    }
  )
  return token as string
}

export async function createUser(u: ApiUser) {
  const token = await getToken(process.env.CLIENT_ADMIN_USER!)
  const { data } = await axios.post(`${process.env.SERVER_URL}/users`, u, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data.user as ApiUser
}

export async function updateUser(u: ApiUser, id: string) {
  const token = await getToken(process.env.CLIENT_ADMIN_USER!)
  const { data } = await axios.put(
    `${process.env.SERVER_URL}/users/${id}`,
    { name: u.name, avatar: u.avatar },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return data.user as ApiUser
}
