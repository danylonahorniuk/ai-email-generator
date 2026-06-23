'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/lib/i18n/language-context'
import { User, Mail, Calendar, LogOut, Shield, KeyRound } from 'lucide-react'

interface ProfileClientProps {
  user: { id: string; email: string; created_at: string }
}

export function ProfileClient({ user }: ProfileClientProps) {
  const router = useRouter()
  const { t } = useLanguage()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pwLoading, setPwLoading] = useState(false)
  const [pwError, setPwError] = useState('')
  const [pwSuccess, setPwSuccess] = useState(false)
  const [signOutLoading, setSignOutLoading] = useState(false)

  const joinedDate = new Date(user.created_at).toLocaleDateString('uk-UA', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault()
    setPwError('')
    setPwSuccess(false)
    if (newPassword !== confirmPassword) { setPwError(t.auth.passwordMismatch); return }
    if (newPassword.length < 6) { setPwError(t.auth.passwordShort); return }
    setPwLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) { setPwError(error.message) } else { setPwSuccess(true); setNewPassword(''); setConfirmPassword('') }
    setPwLoading(false)
  }

  async function handleSignOut() {
    setSignOutLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t.profile.title}</h1>
        <p className="mt-1 text-gray-500">{t.profile.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 items-start">

        {/* Left — account info + sign out */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <User className="h-4 w-4 text-orange-500" /> {t.profile.accountInfo}
            </h2>
            <div className="space-y-1">
              <div className="flex items-center gap-3 py-3.5 border-b border-gray-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 border border-gray-100">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">{t.profile.emailAddress}</div>
                  <div className="text-sm font-medium text-gray-900">{user.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 py-3.5 border-b border-gray-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 border border-gray-100">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">{t.profile.memberSince}</div>
                  <div className="text-sm font-medium text-gray-900">{joinedDate}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 py-3.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 border border-gray-100">
                  <Shield className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">{t.profile.currentPlan}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">Free</span>
                    <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">10 emails/mo</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-gray-100">
              <Button variant="primary" onClick={() => router.push('/pricing')} className="w-full sm:w-auto">
                {t.profile.upgradePro}
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">{t.profile.accountActions}</h2>
            <Button variant="danger" loading={signOutLoading} onClick={handleSignOut} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" /> {t.profile.signOut}
            </Button>
          </div>
        </div>

        {/* Right — change password */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-1 flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-orange-500" /> {t.profile.changePassword}
          </h2>
          <p className="text-sm text-gray-400 mb-6">Оновіть пароль для входу в акаунт.</p>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <Input label={t.profile.newPassword} type="password" placeholder={t.auth.passwordMin} value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <Input label={t.profile.confirmPassword} type="password" placeholder={t.auth.repeatPassword} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            {pwError && <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">{pwError}</div>}
            {pwSuccess && <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-600">{t.profile.passwordUpdated}</div>}
            <Button type="submit" loading={pwLoading} variant="outline">{t.profile.updatePassword}</Button>
          </form>
        </div>

      </div>
    </div>
  )
}
