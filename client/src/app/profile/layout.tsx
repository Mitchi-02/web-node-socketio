import '@/styles/globals.css'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='py-10 PageContainer'>
      {children}
    </div>
  )
}
