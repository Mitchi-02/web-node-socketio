'use server'

import { getConversations } from '@/api/conversation'
import { Conversation } from '@/api/conversation/Conversation'

export default async function getConversationsAction(page?: number, page_size?: number): Promise<Conversation[] | null> {
  try {
    const { conversations } = await getConversations(page || 1, page_size || 10)
    return conversations
  } catch (error) {
   return null
  }
}
