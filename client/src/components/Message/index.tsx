'use client'

import { Message } from '@/api/message/Message'
import { DateTime } from 'luxon'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { HTMLAttributes } from 'react'
import FileDisplay from '../FileDisplay'

type PropsType = HTMLAttributes<HTMLLIElement> & {
  message: Message
}

export default function Message({ message }: PropsType) {
  const { data: session } = useSession()
  const isMe = message.user._id === session?.user?.inChatId
  
  return (
    <li className={`flex gap-2 items-end ${isMe ? 'flex-row-reverse' : ''}`}>
      <Image
        src={message.user.avatar}
        width={45}
        height={45}
        alt=''
        className='rounded-full mb-1'
      />
      <div
        className={`px-3 py-2 bg-gray-200 dark:bg-[#212121] rounded-2xl relative ${
          isMe ? 'rounded-br-none' : 'rounded-bl-none'
        }`}
      >
        {!isMe && (
          <p className='font-semibold capitalize'>{message.user.name}</p>
        )}
        <p className='whitespace-pre-line'>{message.content}</p>
        <ul className='flex gap-4 py-2'>
          {message.media.map((m, index) => (
            <li key={index}>
              <FileDisplay file={{ buffer: m.src, name: m.name }} />
            </li>
          ))}
        </ul>
        <p className='text-xs text-gray-500 mt-1 text-end'>
          {DateTime.fromISO(message.createdAt).toLocaleString(
            DateTime.TIME_SIMPLE
          )}
        </p>
        <div
          className={`absolute ${
            isMe ? 'left-full border-l-[12px]' : 'right-full border-r-[12px]'
          } border-t-[15px] dark:border-t-transparent border-t-transparent border-gray-200 dark:border-[#212121] bottom-0 `}
        />
      </div>
    </li>
  )
}
