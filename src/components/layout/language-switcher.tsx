'use client'

import { useLanguage } from '@/lib/i18n/language-context'
import { type Locale } from '@/lib/i18n/translations'

const LOCALES: { value: Locale; label: string; flag: string }[] = [
  { value: 'ua', label: 'UA', flag: '🇺🇦' },
  { value: 'en', label: 'EN', flag: '🇬🇧' },
  { value: 'ru', label: 'RU', flag: '🇷🇺' },
]

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()

  return (
    <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5">
      {LOCALES.map(l => (
        <button
          key={l.value}
          onClick={() => setLocale(l.value)}
          className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-all ${
            locale === l.value
              ? 'bg-orange-600 text-white'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <span>{l.flag}</span>
          <span>{l.label}</span>
        </button>
      ))}
    </div>
  )
}
