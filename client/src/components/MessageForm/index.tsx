'use client'

import { FileType } from '@/api/socket'
import { FormHTMLAttributes, useRef, useState } from 'react'
import FileDisplay from '../FileDisplay'
import { set } from 'mongoose'

type Props = FormHTMLAttributes<HTMLFormElement> & {
  send: (msg: string, files: FileType[]) => void
}

export default function MessageForm({ send }: Props) {
  const [files, setFiles] = useState<FileType[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const handleFileChange = (fs: FileList | null) => {
    if (!fs) return
    const res: FileType[] = []
    for (let i = 0; i < fs.length; i++) {
      res.push({
        name: fs[i].name,
        buffer: fs[i],
      })
    }
    setFiles(res)
  }
  const onSubmit = (e: any) => {
    e.preventDefault()

    send(inputRef.current?.value || "", files)
    setFiles([])
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }
  return (
    <form onSubmit={onSubmit} className='px-5 py-4' id='actionsContainer'>
      <ul className='flex gap-4 pb-4'>
        {files.map((f, index) => (
          <li key={index}>
            <FileDisplay file={f} />
          </li>
        ))}
      </ul>
      <div className='flex gap-2'>
        <input
          ref={inputRef}
          type='text'
          placeholder='Message'
          className='text-gray-400 whitespace-pre-line placeholder:text-gray-600 grow py-3 bg-gray-200 dark:bg-[#212121] px-4 rounded-xl'
        />
        <label className='p-2 hover:bg-gray-300 dark:hover:bg-[#323232] rounded-xl cursor-pointer'>
          <svg
            width='30'
            height='30'
            viewBox='0 0 30 30'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M11.25 8.75H10.25C8.84987 8.75 8.1498 8.75 7.61503 9.02249C7.14461 9.26216 6.76216 9.64461 6.52249 10.115C6.25 10.6498 6.25 11.3499 6.25 12.75V22.25C6.25 23.6501 6.25 24.3503 6.52249 24.885C6.76216 25.3554 7.14461 25.7379 7.61503 25.9775C8.1498 26.25 8.84987 26.25 10.25 26.25H14.75C16.1501 26.25 16.8502 26.25 17.385 25.9775C17.8554 25.7379 18.2379 25.3554 18.4775 24.885C18.75 24.3503 18.75 23.6501 18.75 22.25V21.25M23.75 10V17.25C23.75 18.6501 23.75 19.3502 23.4775 19.885C23.2379 20.3554 22.8554 20.7379 22.385 20.9775C21.8503 21.25 21.1501 21.25 19.75 21.25H15.25C13.8499 21.25 13.1498 21.25 12.615 20.9775C12.1446 20.7379 11.7622 20.3554 11.5225 19.885C11.25 19.3502 11.25 18.6501 11.25 17.25V7.75C11.25 6.34987 11.25 5.6498 11.5225 5.11503C11.7622 4.64461 12.1446 4.26216 12.615 4.02249C13.1498 3.75 13.8499 3.75 15.25 3.75H17.5M23.75 10L17.5 3.75M23.75 10H19.5C18.7999 10 18.4499 10 18.1825 9.86376C17.9472 9.74391 17.7561 9.55269 17.6363 9.31749C17.5 9.0501 17.5 8.70006 17.5 8V3.75'
              className='stroke-primaryBlack dark:stroke-white'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>

          <input
            className='hidden'
            type='file'
            multiple={true}
            onChange={(e) => handleFileChange(e.target.files)}
          />
        </label>

        <button
          type='submit'
          className='self-center p-3 rounded-xl bg-primaryOrange justify-self-center'
        >
          <svg
            width='30'
            height='30'
            viewBox='0 0 30 30'
            fill='none'
            className='w-5 h-5'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M27.075 15C27.076 15.4733 26.9427 15.9372 26.6904 16.3378C26.4381 16.7383 26.0773 17.059 25.65 17.2625L7.3375 25.9375C7.00234 26.1202 6.63105 26.2269 6.25 26.25C5.83302 26.2491 5.42288 26.144 5.05692 25.9441C4.69096 25.7442 4.3808 25.456 4.15469 25.1057C3.92858 24.7553 3.79369 24.354 3.7623 23.9382C3.73092 23.5224 3.80404 23.1053 3.975 22.725L6.825 16.25H13.75C14.0815 16.25 14.3995 16.1183 14.6339 15.8839C14.8683 15.6495 15 15.3315 15 15C15 14.6685 14.8683 14.3505 14.6339 14.1161C14.3995 13.8817 14.0815 13.75 13.75 13.75H6.825L3.975 7.33749C3.76849 6.8715 3.70935 6.35352 3.8055 5.85298C3.90165 5.35243 4.1485 4.89323 4.51297 4.53692C4.87744 4.18061 5.34211 3.94422 5.8447 3.85943C6.3473 3.77463 6.86381 3.84548 7.325 4.06249L25.6375 12.7375C26.0672 12.9392 26.4306 13.2591 26.6851 13.6598C26.9397 14.0605 27.0749 14.5253 27.075 15Z'
              className='fill-white'
            />
          </svg>
        </button>
      </div>
    </form>
  )
}
