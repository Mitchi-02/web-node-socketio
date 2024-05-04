import InfosSection from '@/components/Profile/InfosSection'
import PasswordSection from '@/components/Profile/PasswordSection'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Chat Profile Page.',
}

const Profile = async () => {
  return (
    <section className='grid md:grid-cols-[1fr_auto_1fr] gap-10 py-10'>
      <InfosSection />
      <hr className='h-full bg-thirdColor opacity-40 w-1 rounded-xl' />
      <PasswordSection />
    </section>
  )
}

export default Profile
