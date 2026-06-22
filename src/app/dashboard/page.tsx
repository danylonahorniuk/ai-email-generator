import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Navbar } from '@/components/layout/navbar'
import { EmailGenerator } from '@/components/dashboard/email-generator'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar user={user} />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Email Generator</h1>
          <p className="mt-1 text-gray-600">Fill in the details below and let AI craft the perfect email for you.</p>
        </div>
        <EmailGenerator />
      </main>
    </div>
  )
}
