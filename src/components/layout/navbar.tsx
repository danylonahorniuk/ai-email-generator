'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from './language-switcher'
import { useLanguage } from '@/lib/i18n/language-context'
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard } from 'lucide-react'
import Image from 'next/image'

interface NavbarProps {
  user?: { email?: string | null } | null
}

export function Navbar({ user }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const accountRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

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
      ]
    : [
        { href: '/#how-it-works', label: (t.nav as any).howItWorks },
        { href: '/#features', label: t.nav.features },
        { href: '/#testimonials', label: (t.nav as any).testimonials },
        { href: '/#faq', label: t.nav.faq },
        { href: '/pricing', label: t.nav.pricing },
      ]

  const initials = user?.email?.[0]?.toUpperCase() ?? '?'

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-gray-900">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-orange-500 bg-white overflow-hidden flex-none">
              <Image src="/logo.png" alt="Quill" width={64} height={64} className="scale-150 object-contain" />
            </div>
            <span className="text-xl tracking-tight">Quill<span className="text-orange-600">AI</span></span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-orange-600 ${
                  pathname === link.href ? 'text-orange-600' : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />

            {user ? (
              <div className="relative" ref={accountRef}>
                <button
                  onClick={() => setAccountOpen(v => !v)}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white py-1 pl-1 pr-3 text-sm text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-600 text-xs font-semibold text-white">
                    {initials}
                  </div>
                  <span className="max-w-[120px] truncate text-sm text-gray-700">{user.email}</span>
                  <ChevronDown className={`h-3.5 w-3.5 text-gray-400 transition-transform ${accountOpen ? 'rotate-180' : ''}`} />
                </button>

                {accountOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-gray-100 bg-white shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="text-xs text-gray-400 truncate">{user.email}</div>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4 text-gray-400" />
                      {t.nav.dashboard}
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <User className="h-4 w-4 text-gray-400" />
                      {t.nav.profile}
                    </Link>
                    <div className="border-t border-gray-100 mt-1">
                      <button
                        onClick={() => { setAccountOpen(false); handleSignOut() }}
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        {t.nav.signOut}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">{t.nav.signIn}</Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">{t.nav.getStarted}</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-3">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-orange-600 py-1"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
            <LanguageSwitcher />
            {user ? (
              <>
                <div className="flex items-center gap-2 py-1">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-600 text-xs font-semibold text-white">
                    {initials}
                  </div>
                  <span className="text-sm text-gray-600 truncate">{user.email}</span>
                </div>
                <Link href="/profile" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">{t.nav.profile}</Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="w-full text-red-600 hover:bg-red-50 hover:text-red-700">
                  {t.nav.signOut}
                </Button>
              </>
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
