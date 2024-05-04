import { ASSETS_URL_PREFIX } from '@/config/storage'
import {
  MessagePopulate,
  PopulatedConversation,
  PopulatedMessage,
} from '@/types/models'
import {
  ConversationResource as ConvResType,
  MessageResource as MsgResType,
} from '@/types/resources'

export function MessageResource(
  m: PopulatedMessage | MessagePopulate | ((PopulatedMessage | MessagePopulate) & {conversationId: string})
): MsgResType {
  return {
    user: m.user,
    _id: m._id,
    content: m.content,
    media: m.media.map((med) => {
      return {src: ASSETS_URL_PREFIX + med.src, name: med.name}
    }),
    createdAt: m.createdAt,
    conversationId: m.conversationId
  }
}

export function ConversationResource(conv: PopulatedConversation): ConvResType {
  return {
    users: conv.users,
    _id: conv._id,
    customerId: conv.customerId,
    messages: conv.messages.map((m) => MessageResource(m))
  }
}

export function ConversationResourceCollection(
  convs: PopulatedConversation[]
): ConvResType[] {
  return convs.map((c) => ConversationResource(c))
}
