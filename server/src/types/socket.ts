import { IConversation, IMessage } from './models'
import { JwtPayload } from 'jsonwebtoken'
import { Types } from 'mongoose'
import { ConversationResource, MessageResource } from '@/types/resources'

export type DataType = JwtPayload & {
  userId: string
  customerId: string
  admin: boolean
}

type CallbackPayload<T> = {
  error?: string
  data?: T
}

export type File = {
  buffer: Buffer
  name: string
}

export type SendNotExistsCallback = (
  p: CallbackPayload<ConversationResource>
) => void

export interface ServerToClientEvents {
  NEW_MESSAGE: (message: MessageResource) => void
  NEW_CONVERSATION: (
    conversation: ConversationResource
  ) => void
}

export type SendExistsCallback = (p: CallbackPayload<MessageResource>) => void

export interface ClientToServerEvents {
  SEND_EXIST: (
    conversationId: string,
    message: string,
    files: File[],
    callback: SendExistsCallback
  ) => void
  SEND_NOT_EXIST: (
    users: string[],
    message: string,
    files: File[],
    callback: SendNotExistsCallback
  ) => void
}