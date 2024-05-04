'use client'

import { Conversation as ConvType } from '@/api/conversation/Conversation'
import Image from 'next/image'
import { Fragment, useState, useEffect, useRef } from 'react'
import { useSocket } from '@/SocketContext'
import Message from '@/components/Message'
import { useSession } from 'next-auth/react'
import toast from '@/lib/toast'
import { FileType } from '@/api/socket'
import MessageForm from '../MessageForm'
import getConversationAction from '@/actions/getConversation'
import Button from '../Button'

export default function Conversation({ c }: { c: ConvType }) {
  const [msgs, setMsgs] = useState(c.messages || [])
  const { data: session } = useSession()
  const [h, setH] = useState<number>(300)
  const { subscribeToNewMessage, sendMessage } = useSocket()
  const [loading, setLoading] = useState(false)
  const pageRef = useRef(1)

  const send = (msg: string, files: FileType[]) => {
    sendMessage(c._id, msg, files, (res) => {
      console.log('msg sent')
      if (res.error) {
        toast('error', res.error)
      } else {
        //@ts-ignore        
        setMsgs((prev) => [res.data, ...prev])
      }
    })
  }
  
  subscribeToNewMessage((msg) => {
    if(msg.conversationId !== c._id) return
    setMsgs((prev) => [msg, ...prev])
  })

  useEffect(() => {
    const container = document.getElementById('container')
    const titleContainer = document.getElementById('titleContainer')
    const actionsContainer = document.getElementById('actionsContainer')
    
    setH(container?.clientHeight! - titleContainer?.clientHeight! - actionsContainer?.clientHeight!)
  }, [])

  const fetchMore = async () => {
    setLoading(true)
    const data = await getConversationAction(c._id, pageRef.current + 1)
    setLoading(false)
    if (!data) return
    pageRef.current++
    setMsgs((prev) => [...prev, ...data.messages])
  }

  return (
    <section id='container' className='grow'>
      <div
        id='titleContainer'
        className='flex ml-[1px] gap-4 py-3 px-4 bg-gray-100 dark:bg-[#212121] shadow-sm items-center'
      >
        <Image
          src='/profile.jpg'
          width={40}
          height={40}
          alt=''
          className='rounded-full'
        />
        <h1 className='text-lg font-medium capitalize line-clamp-1'>
          {c.users
            .filter((u) => u._id !== session?.user?.inChatId)
            .map((u, index) => (
              <Fragment key={u._id}>
                {u.name}
                {index !== c.users.length - 2 ? ', ' : ''}{' '}
              </Fragment>
            ))}
        </h1>
      </div>

      <ul
        style={{ maxHeight: h }}
        className='flex flex-col-reverse px-5 py-3 gap-2 overflow-y-scroll'
      >
        {msgs.map((m) => (
          <Message key={m._id} message={m} />
        ))}
        <Button loading={loading} className='w-fit mx-auto mb-8' onClick={fetchMore}>
          Load more
        </Button>
      </ul>

      <MessageForm send={send} />
    </section>
  )
}
