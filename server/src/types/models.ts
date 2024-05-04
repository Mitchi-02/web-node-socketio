import { MergeType } from 'mongoose'
import { Document, Types } from 'mongoose'

export type MediaType = {
    src: string
    name: string
  }

export interface IConversation {
  users: Types.ObjectId[]
  messages: Types.ObjectId[]
  customerId: Types.ObjectId
}

export interface IMessage {
  user: Types.ObjectId
  content: string
  media: MediaType[]
}

export interface IUser {
  name: string
  customerId: Types.ObjectId
  avatar: string
  isAdmin: boolean
}

export interface ICustomer {
  email: string
  password: string
  name: string
  CLIENT_ID: string
  CLIENT_SECRET: string
  billing_infos: Map<string, string>
}


export type UserDocument = Document<unknown, {}, IUser> &
  IUser & {
    _id: Types.ObjectId
  }

export type CustomerDocument = Document<unknown, {}, ICustomer> &
  ICustomer & {
    _id: Types.ObjectId
  }

export type ConversationDocument = Document<unknown, {}, IConversation> &
  IConversation & {
    _id: Types.ObjectId
  }

export type MessageDocument = Document<unknown, {}, IMessage> &
  IMessage & {
    _id: Types.ObjectId
  }

export type UserPopulate = {
  name: string
  avatar: string
  _id: Types.ObjectId
}

export type MessagePopulate = {
  content: string
  user: UserPopulate
  _id: Types.ObjectId
  media: MediaType[]
  createdAt: Date
  conversationId?: string
}

export type PopulatedConversation = Omit<
  Document<unknown, {}, IConversation> &
    IConversation & {
      _id: Types.ObjectId
    },
  'users' | 'messages'
> & {
  users: UserPopulate[]
  messages: MessagePopulate[]
}

export type PopulatedMessage = MergeType<
  Document<unknown, {}, IMessage> &
    IMessage & {
      _id: Types.ObjectId
    },
  {
    createdAt: Date
    conversationId?: string
    user: UserPopulate
  }
>