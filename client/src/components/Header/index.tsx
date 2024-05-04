'use client'

import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import DarkModeToggle from '../DarkModeToggle'
import { useSocket } from '@/SocketContext'

const Header = () => {
  const { data: session } = useSession()
  const { disconnect } = useSocket()
  return (
    <header className=' py-5 border-b text-mainBlack relative z-[1000]'>
      <div className='flex md:justify-between gap-6 items-center PageContainer'>
        <Link href='/' className='flex gap-2 items-center font-bold text-lg'>
          <Image src='/images/logo.svg' alt='Chat' width={30} height={30} />
          <span className='hidden sm:inline'>Chat</span>
        </Link>
        <div className='flex items-center gap-6 order-2 md:order-3 ml-auto md:ml-0'>
          <DarkModeToggle />
          {session ? (
            <div className='flex items-center gap-4'>
              <button
                className='inline text-primaryColor font-semibold hover:text-secondaryColor transition-all duration-300'
                onClick={() => {
                  disconnect()
                  signOut()
                }}
              >
                Sign out
              </button>
              <Link href="/profile">
                <img
                  src={session.user?.avatar}
                  alt='avatar'
                  width={30}
                  height={30}
                  className='rounded-full'
                />
              </Link>
            </div>
          ) : (
            <div className='gap-2 text-primaryColor hidden md:flex'>
              <Link
                href='/sign-in'
                className='font-semibold hover:text-secondaryColor transition-all duration-300'
              >
                Sign In
              </Link>
              |
              <Link
                href='/sign-up'
                className='font-semibold hover:text-secondaryColor transition-all duration-300'
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
