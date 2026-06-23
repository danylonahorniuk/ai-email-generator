'use client'

import { useLanguage } from '@/lib/i18n/language-context'
import { EmailGenerator } from './email-generator'

export function DashboardContent() {
  const { t } = useLanguage()

  return (
    <>
      <div className="mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t.dashboard.title}</h1>
        <p className="mt-1 text-sm sm:text-base text-gray-500">{t.dashboard.subtitle}</p>
      </div>
      <EmailGenerator />
    </>
  )
}
