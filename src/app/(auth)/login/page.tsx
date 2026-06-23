'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/lib/i18n/language-context'
import { Mail } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl text-gray-900 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-600">
              <Mail className="h-5 w-5 text-white" />
            </div>
            MailMind<span className="text-orange-600">AI</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{t.auth.welcomeBack}</h1>
          <p className="mt-2 text-gray-600">{t.auth.signInSubtitle}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input label={t.auth.email} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            <Input label={t.auth.password} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            {error && <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">{error}</div>}
            <Button type="submit" loading={loading} className="w-full" size="lg">{t.auth.signIn}</Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            {t.auth.noAccount}{' '}
            <Link href="/signup" className="font-medium text-orange-600 hover:text-orange-700">{t.auth.signUpFree}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
