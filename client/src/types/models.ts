export interface IUser {
  name: string
  email: string
  password: string
  inChatId: string
  avatar: string
}

export type UserModel = IUser & {
  _id: string
}