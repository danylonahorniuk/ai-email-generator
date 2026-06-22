'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { type Locale, translations, type Translations } from './translations'

interface LanguageContextType {
  locale: Locale
  t: Translations
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'ua',
  t: translations.ua,
  setLocale: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ua')

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale | null
    if (saved && translations[saved]) setLocaleState(saved)
  }, [])

  function setLocale(newLocale: Locale) {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
