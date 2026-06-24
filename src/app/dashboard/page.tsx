import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Navbar } from '@/components/layout/navbar'
import { DashboardContent } from '@/components/dashboard/dashboard-content'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar user={user} />
      <main className="flex-1 mx-auto w-full max-w-7xl 2xl:max-w-[1400px] px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <DashboardContent />
      </main>
    </div>
  )
}
