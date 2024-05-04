import {
  addMessageToConversation,
  paginateConversationByIdAndUser,
} from '@/repositories/ConversationRepository'
import {
  createMessage,
  populateMessage,
} from '@/repositories/MessageRepository'
import {
  ClientToServerEvents,
  DataType,
  File,
  SendExistsCallback,
  ServerToClientEvents,
} from '@/types/socket'
import { MessageResource } from '@/utils/resources'
import { handleMessageFiles } from '@/utils/storage'
import { Types, startSession } from 'mongoose'
import { Socket, Server } from 'socket.io'

export default async function NewMessage(
  io: Server<ClientToServerEvents, ServerToClientEvents, any, DataType>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents, any, DataType>,
  conversationId: string,
  message: string,
  files: File[],
  callback: SendExistsCallback
) {
  console.log('NEW_MESSAGE')
  try {
    const conversation = await paginateConversationByIdAndUser(
      conversationId,
      socket.data.userId,
      {}
    )
    if (!conversation) {
      callback({ error: 'Conversation not found' })
      return
    }
    const session = await startSession()
    let msg: any = null
    await session.withTransaction(async () => {
      const m = await createMessage({
        content: message,
        user: new Types.ObjectId(socket.data.userId),
        media: await handleMessageFiles(files),
      })
      await addMessageToConversation(conversationId, m.id)
      msg = await populateMessage(m)
    })
    conversation.users.forEach((u) => {
      if (u._id.equals(socket.data.userId)) return
      io.to(u._id.toString()).emit(
        'NEW_MESSAGE',
        MessageResource({
          conversationId: conversation.id,
          ...msg._doc,
        })
      )
    })
    console.log('sending NEW_MESSAGE callback')
    callback({
      data: MessageResource({
        conversationId: conversation.id,
        ...msg._doc,
      }),
    })
  } catch (error) {
    console.log(error)
    callback({ error: 'Something went wrong' })
  }
}
