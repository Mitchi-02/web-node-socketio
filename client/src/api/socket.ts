import { Conversation } from "./conversation/Conversation"
import { Message } from "./message/Message"

type CallbackPayload<T> = {
  error?: string
  data?: T
}
export type FileType = {
  buffer: File | string
  name: string
}

export type SendNotExistsCallback = (p: CallbackPayload<Conversation>) => void
export type SendExistsCallback = (p: CallbackPayload<Message>) => void

export type NewMessageCallback = (message: Message) => void
export type NewConversationCallback = (conversation: Conversation) => void

export interface ServerToClientEvents {
  NEW_MESSAGE: NewMessageCallback
  NEW_CONVERSATION: NewConversationCallback
}

export interface ClientToServerEvents {
  SEND_EXIST: (
    conversationId: string,
    message: string,
    files: FileType[],
    callback: SendExistsCallback
  ) => void
  SEND_NOT_EXIST: (
    users: string[],
    message: string,
    files: FileType[],
    callback: SendNotExistsCallback
  ) => void
}

export type DataType = any
