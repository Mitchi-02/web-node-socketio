import {
  createConversation,
  populateConversation,
} from '@/repositories/ConversationRepository'
import { createMessage } from '@/repositories/MessageRepository'
import {
  ClientToServerEvents,
  DataType,
  File,
  SendNotExistsCallback,
  ServerToClientEvents,
} from '@/types/socket'
import { Types, startSession } from 'mongoose'
import { Socket, Server } from 'socket.io'
import { writeFile } from "fs"
import { STORAGE_PATH } from '@/config/storage'
import { handleMessageFiles, storeFile } from '@/utils/storage'
import { ConversationResource } from '@/utils/resources'

export default async function NewConversation(
  io: Server<ClientToServerEvents, ServerToClientEvents, any, DataType>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents, any, DataType>,
  users: string[],
  message: string,
  files: File[],
  callback: SendNotExistsCallback
) {
  try {
    console.log('NEW_CONVERSATION')
    let conversation: any = null
    const session = await startSession()
    await session.withTransaction(async () => {
      const msg = await createMessage({
        content: message,
        user: new Types.ObjectId(socket.data.userId),
        media: await handleMessageFiles(files)
      })
      users.push(socket.data.userId)
      const set = new Set(users)
      const usrs = [...set].map((u) => new Types.ObjectId(u))
      const c = await createConversation({
        customerId: new Types.ObjectId(socket.data.customerId),
        messages: [msg._id],
        users: usrs,
      })
      conversation = await populateConversation(c)
    })
    conversation.users.forEach((u: any) => {
      if (u._id.equals(socket.data.userId)) return
      io.to(u._id.toString()).emit(
        'NEW_CONVERSATION',
        ConversationResource(conversation)
      )
    })
    console.log('sending NEW_CONVERSATION callback')
    callback({
      data: ConversationResource(conversation)
    })
  } catch (error) {
    console.log(error)
    callback({ error: 'Something went wrong' })
  }
}