import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { User } from '@/models'
import { dbConnect } from '@/lib'
import { AuthOptions, User as UserType } from 'next-auth'
import { getToken } from '@/api/user'
import { cookies } from 'next/headers'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      //@ts-ignore
      async authorize(credentials, req) {
        await dbConnect()
        const { email, password } = credentials as {
          email: string
          password: string
        }
        const user = await User.findOne({
          email: email,
        })
        if (!user) {
          console.log('no user with email')
          throw new Error('Invalid credentials')
        }

        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) {
          console.log('wrong password')
          throw new Error('Invalid credentials')
        }
        const token = await getToken(user.inChatId)
        cookies().set('chatToken', token)
        return {
          name: user.name,
          _id: user._id,
          email: user.email,
          inChatId: user.inChatId,
          avatar: user.avatar
        }
      },
      //@ts-ignore
      credentials: undefined,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      user && (token.user = user)
      if (trigger === 'update') {
        token.user = session.user
      }
      return token
    },
    session: async ({ session, token }) => {
      const user = token.user as UserType
      session.user = user
      return session
    },
  },
  events: {
    signOut: () => {
      cookies().delete('chatToken')
    }
  }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
