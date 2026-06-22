'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from './language-switcher'
import { useLanguage } from '@/lib/i18n/language-context'
import { Mail, Menu, X, Zap } from 'lucide-react'

interface NavbarProps {
  user?: { email?: string | null } | null
}

export function Navbar({ user }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useLanguage()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const navLinks = user
    ? [
        { href: '/dashboard', label: t.nav.dashboard },
        { href: '/pricing', label: t.nav.pricing },
        { href: '/profile', label: t.nav.profile },
      ]
    : [
        { href: '/#features', label: t.nav.features },
        { href: '/#faq', label: 'FAQ' },
        { href: '/pricing', label: t.nav.pricing },
      ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
              <Mail className="h-4 w-4 text-white" />
            </div>
            <span>MailMind<span className="text-violet-600">AI</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-violet-600 ${
                  pathname === link.href ? 'text-violet-600' : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            {user ? (
              <>
                <span className="text-sm text-gray-500 truncate max-w-[160px]">{user.email}</span>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  {t.nav.signOut}
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">{t.nav.signIn}</Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">
                    <Zap className="h-3.5 w-3.5" />
                    {t.nav.getStarted}
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-3">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-violet-600 py-1"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
            <LanguageSwitcher />
            {user ? (
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                {t.nav.signOut}
              </Button>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">{t.nav.signIn}</Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full">{t.nav.getStarted}</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
