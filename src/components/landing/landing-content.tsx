'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n/language-context'
import { Zap, Shield, Globe, Clock, ChevronDown, Star, ArrowRight, Mail, Sparkles, Users } from 'lucide-react'

const ICONS = [Zap, Sparkles, Globe, Shield, Clock, Users]

const testimonials = [
  { name: 'Sarah K.', role: 'Sales Manager', text: 'I used to spend 30 minutes writing follow-up emails. Now it takes 30 seconds. Game changer.', rating: 5 },
  { name: 'Дмитро В.', role: 'Freelance Designer', text: 'Моя комунікація з клієнтами покращилась суттєво. Опції тону — саме те що треба.', rating: 5 },
  { name: 'Lisa M.', role: 'Startup Founder', text: 'MailMindAI handles investor outreach, team updates, and partner emails. Indispensable.', rating: 5 },
]

interface LandingContentProps {
  user?: { email?: string | null } | null
}

export function LandingContent({ user }: LandingContentProps) {
  const { t } = useLanguage()

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-50 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-sm font-medium text-violet-700 mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            {t.hero.badge}
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
            {t.hero.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
              {t.hero.titleAccent}
            </span>{' '}
            {t.hero.titleEnd}
          </h1>

          <p className="mt-6 mx-auto max-w-2xl text-lg sm:text-xl text-gray-600 leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={user ? '/dashboard' : '/signup'}>
              <Button size="lg" className="w-full sm:w-auto">
                <Zap className="h-5 w-5" />
                {user ? t.hero.ctaDashboard : t.hero.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                {t.hero.viewPricing}
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-sm text-gray-500">{t.hero.noCreditCard}</p>

          {/* App preview card */}
          <div className="mt-16 mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-gray-400 ml-2">{t.hero.previewBadge}</span>
            </div>
            <div className="p-6 text-left space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-violet-50 border border-violet-100 px-3 py-2">
                  <div className="text-xs text-violet-500 mb-1">{t.hero.previewTone}</div>
                  <div className="text-sm font-medium text-gray-800">Professional</div>
                </div>
                <div className="rounded-lg bg-violet-50 border border-violet-100 px-3 py-2">
                  <div className="text-xs text-violet-500 mb-1">{t.hero.previewPurpose}</div>
                  <div className="text-sm font-medium text-gray-800">Follow-up meeting</div>
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 border border-gray-100 p-4 space-y-2">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">{t.hero.previewGenerated}</div>
                <div className="text-sm font-semibold text-gray-800">{t.hero.previewSubject}: Following Up on Our Discussion</div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  Dear Sarah, I hope this message finds you well. I wanted to follow up on our conversation...
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
                  <span className="text-xs text-white font-medium">{t.hero.previewCopy}</span>
                </div>
                <div className="flex-1 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <span className="text-xs text-gray-600 font-medium">{t.hero.previewRegen}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            {[
              { value: '10,000+', label: t.stats.emails },
              { value: '2,500+', label: t.stats.users },
              { value: '3', label: t.stats.languages },
              { value: '4.9★', label: t.stats.rating },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8">
                {i > 0 && <div className="w-px h-10 bg-gray-200 hidden sm:block" />}
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{t.features.title}</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{t.features.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.features.items.map((feature, i) => {
              const Icon = ICONS[i]
              return (
                <div key={feature.title} className="group rounded-2xl border border-gray-100 p-6 hover:border-violet-200 hover:shadow-lg transition-all duration-300">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 group-hover:bg-violet-100 transition-colors">
                    <Icon className="h-6 w-6 text-violet-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-violet-50 to-indigo-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{t.testimonials.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(tm => (
              <div key={tm.name} className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: tm.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">&ldquo;{tm.text}&rdquo;</p>
                <div>
                  <div className="font-semibold text-gray-900">{tm.name}</div>
                  <div className="text-sm text-gray-500">{tm.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{t.faq.title}</h2>
          </div>
          <div className="space-y-4">
            {t.faq.items.map(({ q, a }) => (
              <details key={q} className="group rounded-xl border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-900">{q}</span>
                  <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-violet-600 to-indigo-600">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t.cta.title}</h2>
          <p className="text-violet-200 text-lg mb-10">{t.cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={user ? '/dashboard' : '/signup'}>
              <Button size="lg" variant="secondary">
                <Zap className="h-5 w-5 text-violet-600" />
                {user ? t.cta.buttonDashboard : t.cta.button}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                {t.cta.viewPlans}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-white font-bold">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600">
                <Mail className="h-3.5 w-3.5 text-white" />
              </div>
              MailMindAI
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/pricing" className="hover:text-white transition-colors">{t.nav.pricing}</Link>
              <Link href="/#features" className="hover:text-white transition-colors">{t.nav.features}</Link>
              <Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link>
            </div>
            <p className="text-sm">{t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </>
  )
}
