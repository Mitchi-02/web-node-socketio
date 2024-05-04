import { Message } from "../message/Message"

export type Conversation = {
  _id: string
  users: {
    _id: string
    name: string
    avatar: string
  }[]
  messages: Message[]
}
