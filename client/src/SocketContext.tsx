'use client'

import {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from 'react'
import { Socket, io } from 'socket.io-client'
import {
  ClientToServerEvents,
  FileType,
  NewConversationCallback,
  NewMessageCallback,
  SendExistsCallback,
  SendNotExistsCallback,
  ServerToClientEvents,
} from '@/api/socket'
import { getCookie } from 'cookies-next'

type SocketContextType = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null
  connect: () => void
  sendMessage: (
    id: string,
    msg: string,
    files: FileType[],
    cb: SendExistsCallback
  ) => void
  newConversation: (
    users: string[],
    msg: string,
    files: FileType[],
    cb: SendNotExistsCallback
  ) => void
  subscribeToNewConversation: (cb: NewConversationCallback) => void
  subscribeToNewMessage: (cb: NewMessageCallback) => void
  disconnect: () => void
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  connect: () => {},
  subscribeToNewConversation: () => {},
  subscribeToNewMessage: () => {},
  disconnect: () => {},
  sendMessage: () => {},
  newConversation: () => {},
})

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null)

  const connect = useCallback(() => {
    if (socket) return
    console.log('connectin')
    setSocket(
      io(process.env.NEXT_PUBLIC_SERVER_URL!, {
        auth: {
          token: getCookie('chatToken') || '',
        },
      })
    )
  }, [socket])

  const sendMessage = (
    id: string,
    msg: string,
    files: FileType[],
    cb: SendExistsCallback
  ) => socket?.emit('SEND_EXIST', id, msg, files, cb)

  const newConversation = (
    users: string[],
    msg: string,
    files: FileType[],
    cb: SendNotExistsCallback
  ) => socket?.emit('SEND_NOT_EXIST', users, msg, files, cb)

  const subscribeToNewConversation = (cb: NewConversationCallback) =>
    useEffect(() => {
      socket?.on('NEW_CONVERSATION', cb)
      return () => {
        socket?.removeListener('NEW_CONVERSATION', cb)
      }
    }, [socket])

  const subscribeToNewMessage = (cb: NewMessageCallback) =>
    useEffect(() => {
      socket?.on('NEW_MESSAGE', cb)
      return () => {
        socket?.removeListener('NEW_MESSAGE', cb)
      }
    }, [socket])

  const disconnect = useCallback(() => {
    if (!socket) return
    socket.disconnect()
    setSocket(null)
  }, [socket])

  useEffect(() => {
    if (!socket) return
    socket.on('connect', () => {
      console.log('connect', socket)
    })
    socket.on('connect_error', (err) => {
      console.log('error', err.message)
    })
    socket.on('NEW_CONVERSATION', (conv) => {
      console.log('NEW_CONVERSATION', conv)
    })
    socket.on('NEW_MESSAGE', (msg) => {
      console.log('NEW_MESSAGE', msg)
    })
  }, [socket])

  useEffect(() => {
    if (getCookie('chatToken') && !socket) {
      connect()
    }
  }, [])

  return (
    <SocketContext.Provider
      value={{
        disconnect,
        socket,
        connect,
        newConversation,
        sendMessage,
        subscribeToNewConversation,
        subscribeToNewMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}
