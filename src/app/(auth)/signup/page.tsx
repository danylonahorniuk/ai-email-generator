'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/lib/i18n/language-context'
import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/dashboard'
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) { setError(t.auth.passwordMismatch); return }
    if (password.length < 6) { setError(t.auth.passwordShort); return }
    setLoading(true)
    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: `${window.location.origin}${redirect}` },
    })
    if (error) { setError(error.message); setLoading(false); return }
    if (data.session) {
      // email confirmation вимкнено — юзер вже залогінений
      localStorage.setItem('quillai_toast', 'Акаунт створено. Ласкаво просимо!')
      router.push(redirect)
      router.refresh()
      return
    }
    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-10">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.auth.checkEmail}</h2>
            <p className="text-gray-600 mb-6">{t.auth.confirmSent} <strong>{email}</strong>. {t.auth.confirmClick}</p>
            <Link href={`/login${redirect !== '/dashboard' ? `?redirect=${redirect}` : ''}`}>
              <Button variant="outline" className="w-full">{t.auth.backToSignIn}</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 font-bold text-xl text-gray-900 mb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-orange-500 bg-white overflow-hidden flex-none">
              <Image src="/logo.png" alt="QuillAI" width={64} height={64} className="scale-150 object-contain" />
            </div>
            <span className="text-xl tracking-tight">Quill<span className="text-orange-600">AI</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{t.auth.createAccount}</h1>
          <p className="mt-2 text-gray-600">{t.auth.startFree}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input label={t.auth.email} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            <Input label={t.auth.password} type="password" placeholder={t.auth.passwordMin} value={password} onChange={e => setPassword(e.target.value)} required />
            <Input label={t.auth.confirmPassword} type="password" placeholder={t.auth.repeatPassword} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            {error && <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">{error}</div>}
            <Button type="submit" loading={loading} className="w-full" size="lg">{t.auth.createBtn}</Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            {t.auth.haveAccount}{' '}
            <Link
              href={`/login${redirect !== '/dashboard' ? `?redirect=${redirect}` : ''}`}
              className="font-medium text-orange-600 hover:text-orange-700"
            >
              {t.auth.signIn}
            </Link>
          </p>
        </div>
        <p className="mt-4 text-center text-xs text-gray-500">{t.auth.terms}</p>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  )
}
