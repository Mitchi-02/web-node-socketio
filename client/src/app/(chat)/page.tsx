import { getUsersAction } from '@/actions'
import NewConversation from '@/components/NewConversation'

export default async function NewChat() {
  const users = await getUsersAction()
  return <NewConversation users={users} />
}
