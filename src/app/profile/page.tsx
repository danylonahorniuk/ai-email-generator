import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Navbar } from '@/components/layout/navbar'
import { ProfileClient } from '@/components/profile/profile-client'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar user={user} />
      <main className="flex-1 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">
        <ProfileClient user={{ id: user.id, email: user.email ?? '', created_at: user.created_at }} />
      </main>
    </div>
  )
}
