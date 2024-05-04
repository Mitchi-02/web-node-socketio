import Conversation from '@/models/Conversation'
import {
  ConversationDocument,
  IConversation,
  MessagePopulate,
  PopulatedConversation,
  UserPopulate,
} from '@/types/models'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/utils/constants'

export function paginateConversationsByUser(
  userId: string,
  {
    page,
    page_size,
  }: {
    page?: number
    page_size?: number
  }
): Promise<PopulatedConversation[]> {
  const limit = page_size || DEFAULT_PAGE_SIZE
  const skip = ((page || DEFAULT_PAGE) - 1) * limit
  return Conversation.find(
    { users: userId },
    {
      messages: {
        $slice: 1,
      },
    }
  )
    .skip(skip)
    .limit(limit)
    .populate<{ users: UserPopulate[]; messages: MessagePopulate[] }>([
      {
        path: 'users',
        select: 'name avatar',
      },
      {
        path: 'messages',
        populate: {
          path: 'user',
          select: 'name avatar',
        },
      },
    ])
}

export function countConversationsByUser(userId: string) {
  return Conversation.countDocuments({ users: userId })
}

export function paginateConversationByIdAndUser(
  _id: string,
  userId: string,
  {
    page,
    page_size,
  }: {
    page?: number
    page_size?: number
  }
): Promise<PopulatedConversation | null> {
  const limit = page_size || DEFAULT_PAGE_SIZE
  const skip = ((page || DEFAULT_PAGE) - 1) * limit
  return Conversation.findOne(
    { _id, users: userId },
    {
      messages: {
        $slice: [skip, limit],
      },
    }
  ).populate<{ users: UserPopulate[]; messages: MessagePopulate[] }>([
    {
      path: 'users',
      select: 'name avatar',
    },
    {
      path: 'messages',
      populate: {
        path: 'user',
        select: 'name avatar createdAt',
      },
    },
  ])
}

export function createConversation(c: IConversation) {
  return Conversation.create(c)
}

export function addMessageToConversation(_id: string, msgId: string) {
  return Conversation.findByIdAndUpdate(_id, {
    $push: {
      messages: {
        //add to the start to limit sorting
        $each: [msgId],
        $position: 0,
      },
    },
  })
}

export function paginateConversationsByCustomer(
  customerId: string,
  {
    page,
    page_size,
  }: {
    page?: number
    page_size?: number
  }
): Promise<PopulatedConversation[]> {
  const limit = page_size || DEFAULT_PAGE_SIZE
  const skip = ((page || DEFAULT_PAGE) - 1) * limit

  return Conversation.find({ customerId })
    .skip(skip)
    .limit(limit)
    .populate<{ users: UserPopulate[]; messages: MessagePopulate[] }>([
      {
        path: 'users',
        select: 'name avatar',
      },
      {
        path: 'messages',
        populate: {
          path: 'user',
          select: 'name avatar',
        },
      },
    ])
}

export function countConversationsByCustomer(customerId: string) {
  return Conversation.countDocuments({ customerId })
}

export function populateConversation(
  c: ConversationDocument
): Promise<PopulatedConversation> {
  return Conversation.populate<{
    users: UserPopulate[]
    messages: MessagePopulate[]
  }>(c, [
    {
      path: 'users',
      select: 'name avatar',
    },
    {
      path: 'messages',
      perDocumentLimit: 1,
      populate: {
        path: 'user',
        select: 'name avatar',
      },
    },
  ])
}
