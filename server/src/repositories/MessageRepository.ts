import Message from '@/models/Message'
import {
  IMessage,
  MessageDocument,
  PopulatedMessage,
  UserPopulate,
} from '@/types/models'

export function createMessage(c: IMessage) {
  return Message.create(c)
}

export function populateMessage(m: MessageDocument): Promise<PopulatedMessage> {
  //@ts-ignore
  return Message.populate<{ user: UserPopulate }>(m, {
    path: 'user',
    select: 'name avatar',
  })
}
