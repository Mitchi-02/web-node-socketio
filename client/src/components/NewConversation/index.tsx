'use client'

import Image from 'next/image'
import { HTMLAttributes, useState } from 'react'
import { useSocket } from '@/SocketContext'
import { useRouter } from 'next/navigation'
import { UserModel } from '@/types/models'
import { FileType } from '@/api/socket'
import toast from '@/lib/toast'
import { useSession } from 'next-auth/react'
import MessageForm from '../MessageForm'

type Props = HTMLAttributes<HTMLElement> & {
  users: UserModel[]
}

export default function NewConversation({ users }: Props) {
  const { newConversation } = useSocket()

  const router = useRouter()
  const [selected, setSelec] = useState<string[]>([])
  const { data: session } = useSession()

  const toggle = (u: UserModel) => {
    if (selected.includes(u.inChatId)) {
      setSelec((prev) => prev.filter((id) => id !== u.inChatId))
    } else {
      setSelec((prev) => [...prev, u.inChatId])
    }
  }
  const send = (msg: string, files: FileType[]) => {
    newConversation(selected, msg, files, (res) => {
      if (res.error) {
        toast('error', res.error)
      } else {
        router.push(`/${res.data?._id}`)
      }
    })
  }

  return (
    <section id='container' className='grow flex flex-col px-6 pb-8'>
      <h1 id='titleContainer' className='font-bold text-3xl capitalize my-8'>
        Or create a new conversation
      </h1>
      <ul className='overflow-y-scroll grow max-h-80 place-content-start grid lg:grid-cols-2 mb-8 gap-x-6 gap-y-4'>
        {users
          .filter((u) => u._id !== session?.user?._id)
          .map((u) => (
            <li key={u._id} className='flex items-center gap-4'>
              <Image
                src={u.avatar}
                alt={u.name}
                width={30}
                height={30}
                className='rounded-full'
              />
              <h2 className='font-bold'>{u.name}</h2>
              <input
                type='checkbox'
                className='cursor-pointer'
                onChange={() => toggle(u)}
                checked={selected.includes(u.inChatId)}
              />
            </li>
          ))}
      </ul>
      <MessageForm send={send} />
    </section>
  )
}
