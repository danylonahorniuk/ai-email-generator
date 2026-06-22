import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Navbar } from '@/components/layout/navbar'
import { LandingContent } from '@/components/landing/landing-content'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar user={user} />
      <LandingContent user={user} />
    </div>
  )
}
