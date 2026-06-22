import { createClient } from '@/lib/supabase/server'
import { Navbar } from '@/components/layout/navbar'
import { PricingContent } from '@/components/pricing/pricing-content'

export default async function PricingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar user={user} />
      <PricingContent user={user} />
    </div>
  )
}
