'use server'

import { getConversation } from '@/api/conversation'
import { Conversation } from '@/api/conversation/Conversation'

export default async function getConversationAction(
  id: string,
  page?: number,
  page_size?: number
): Promise<Conversation | null> {
  try {
    const { conversation } = await getConversation(id, page || 1, page_size || 10)
    return conversation
  } catch (error) {
    return null
  }
}
