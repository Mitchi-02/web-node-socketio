'use client'

import { HTMLAttributes, useMemo, useRef, useState } from 'react'
import { useSocket } from '@/SocketContext'
import { Conversation } from '@/api/conversation/Conversation'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Button from '../Button'
import getConversationsAction from '@/actions/getConversations'
import toast from '@/lib/toast'

type ConvListProps = HTMLAttributes<HTMLElement> & {
  conversations: Conversation[]
}

const useDebounce = <T extends any[]>(func: (...params: T) => any) => {
  const wait = 1000 // 1 second
  let timerId: NodeJS.Timeout
  return (...args: T) => {
    if (timerId) clearTimeout(timerId)
    timerId = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

export default function ConvList({ conversations, className }: ConvListProps) {
  const [list, setList] = useState(conversations)
  const [filter, setFilter] = useState('')
  const { data: session } = useSession()
  const filtered = useMemo(
    () =>
      list
        .filter(
          (c) =>
            c.users.find(
              (u) =>
                u._id !== session?.user?.inChatId &&
                u.name.toLowerCase().includes(filter.toLowerCase())
            ) !== undefined
        )
        .toSorted((c1, c2) => {
          if (
            new Date(c1.messages[0].createdAt) >
            new Date(c2.messages[0].createdAt)
          )
            return 0
          else return 1
        }),
    [list, filter]
  )
  const [loading, setLoading] = useState(false)
  const pageRef = useRef(1)
  const router = useRouter()
  const debounce = useDebounce((s: string) => {
    setFilter(s)
  })
  const { subscribeToNewConversation, subscribeToNewMessage } = useSocket()
  subscribeToNewConversation((conv) => {
    toast('success', conv.messages[0].content)
    setList((prev) => [conv, ...prev])
  })
  subscribeToNewMessage((msg) => {
    toast('success', msg.content)
    setList((prev) => {
      const left = prev.filter((c) => c._id !== msg.conversationId)
      return [
        {
          _id: msg.conversationId,
          messages: [msg],
          users: [msg.user],
        } as Conversation,
        ...left,
      ]
    })
  })

  const fetchMore = async () => {
    setLoading(true)
    const data = await getConversationsAction(pageRef.current + 1)
    setLoading(false)
    if (!data) return
    pageRef.current++
    setList((prev) => [...prev, ...data])
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounce(e.target.value)
  }

  return (
    <aside
      className={`w-[24rem] hidden sm:block text-center pt-3 pb-4 bg-gray-100 dark:bg-[#212121] shadow-lg  ${className}`}
    >
      <div className='grid'>
        <input
          type='text'
          onChange={handleSearch}
          placeholder='Search'
          className='text-gray-400 rounded-3xl my-4 mx-3 py-3 px-4'
        />
      </div>
      <ul className='text-start'>
        {filtered.map((conv) => (
          <li
            key={conv._id}
            className='px-3 mx-2 rounded-xl flex gap-4 py-3 items-center cursor-pointer transition-all duration-300 hover:bg-gray-50 dark:hover:bg-[#323232]'
            onClick={() => router.push(`/${conv._id}`)}
          >
            <Image
              src={conv.users[0].avatar}
              alt=''
              width={45}
              height={45}
              className='rounded-full shrink-0'
            />
            <div>
              <h2 className='line-clamp-1 mb-1 capitalize font-medium'>
                {conv.users.length < 3
                  ? conv.users.find((e) => e._id !== session?.user?.inChatId)
                      ?.name
                  : conv.users.filter(
                      (e) => e._id !== session?.user?.inChatId
                    )[0].name +
                    ', ' +
                    conv.users.filter(
                      (e) => e._id !== session?.user?.inChatId
                    )[1].name}
              </h2>
              <p className='line-clamp-1 text-sm text-gray-400'>
                {conv.messages[0].content}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <Button loading={loading} className='mt-4' onClick={fetchMore}>
        Load more
      </Button>
    </aside>
  )
}
