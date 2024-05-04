import { Types } from "mongoose"
import { MediaType, UserPopulate } from "./models"

export type MessageResource = {
  user: Types.ObjectId | UserPopulate
  _id: Types.ObjectId
  content: string
  media: MediaType[]
  createdAt: Date
  conversationId?: string
}

export type ConversationResource = {
    users: UserPopulate[];
    _id: Types.ObjectId;
    customerId: Types.ObjectId;
    messages: MessageResource[];
}