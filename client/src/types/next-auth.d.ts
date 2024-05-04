import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: User
  }

  interface User {
    _id: string
    name: string
    email: string
    inChatId: string
    avatar: string
  }

    interface JWT {
      user?: User
    }
}
