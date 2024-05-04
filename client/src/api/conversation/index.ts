import API from '@/lib/chat-client'

export async function getConversations(page: number, page_size: number) {
  const { data } = await API.get(
    `/conversations/user?page=${page}&page_size=${page_size}`
  )
  return data
}

export async function getConversation(_id: string, page: number, page_size: number) {
  const { data } = await API.get(
    `/conversations/${_id}?page=${page}&page_size=${page_size}`
  )
  return data
}