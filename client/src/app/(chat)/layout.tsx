import '@/styles/globals.css'
import ConvList from '@/components/ConvSideBar'
import { getInitialConversationsAction } from '@/actions'


export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const conv = await getInitialConversationsAction()
  return (
    <div className='flex'>
      <ConvList conversations={conv || []}/>
      {children}
    </div>
  )
}
