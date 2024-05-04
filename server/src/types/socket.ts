export interface ServerToClientEvents {
  NEW_MESSAGE: (message: Message) => void
}

export interface SocketData {
  user: string
}

export type SendExistsCallback = (_: { error?: string; data?: Message }) => void

export interface ClientToServerEvents {
  SEND_EXIST: (message: string, callback: SendExistsCallback) => void
}

export interface Message {
  user: string
  content: string
  created_at: string
}
