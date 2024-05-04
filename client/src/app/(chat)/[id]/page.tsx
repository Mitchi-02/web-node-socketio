import getConversationAction from "@/actions/getConversation"
import Conversation from "@/components/Conversation"
import NotFoundAnimation from "@/components/NotFound"

export default async function Chat({ params: { id } }: { params: { id: string } }) {
  const res = await getConversationAction(id)
  if (!res) {
    return (
      <div className="grid place-content-center grow">
        <NotFoundAnimation />
      </div>
    )
  }
  return <Conversation c={res}/>
}
