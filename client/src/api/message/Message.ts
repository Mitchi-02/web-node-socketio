export type Message = {
  _id: string
  content: string
  user: {
    _id: string
    name: string
    avatar: string
  }
  media: {
    src: string
    name: string
  }[]
  conversationId?: string
  createdAt: string
}