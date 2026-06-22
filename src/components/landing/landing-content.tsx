'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n/language-context'
import { ArrowRight, Star, ChevronDown, Zap, Shield, Globe, Clock, Sparkles, Users, TrendingUp, Briefcase, HeadphonesIcon, UserSearch } from 'lucide-react'

const FEATURE_ICONS = [Zap, Sparkles, Globe, Shield, Clock, Users]
const INDUSTRY_ICONS = [TrendingUp, Briefcase, HeadphonesIcon, UserSearch]

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
      {/* ── HERO ── */}
      <section className="bg-white pt-14 pb-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-12 items-center">

            {/* Left */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-gray-900 leading-[1.12] mb-6">
                {t.hero.title}{' '}
                <span className="text-orange-600">{t.hero.titleAccent}</span>
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                {t.hero.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <Link href={user ? '/dashboard' : '/signup'}>
                  <Button size="lg" className="w-full sm:w-auto">
                    {user ? t.hero.ctaDashboard : t.hero.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/#how-it-works">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto text-gray-600">
                    {t.hero.howItWorksBtn} →
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-gray-400 mb-10">{t.hero.noCreditCard}</p>

              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
                  {t.hero.industriesLabel}
                </p>
                <div className="flex flex-wrap gap-5">
                  {(t.hero.industries as string[]).map((ind: string, i: number) => {
                    const Icon = INDUSTRY_ICONS[i]
                    return (
                      <div key={ind} className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Icon className="h-4 w-4 text-gray-400" />
                        {ind}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right — mockup */}
            <div className="relative hidden lg:block">

              {/* "Почніть з чого-небудь" annotation */}
              <div className="absolute -top-7 left-[28%] flex flex-col items-center pointer-events-none select-none z-10">
                <span className="text-xs text-orange-500 italic" style={{ fontFamily: 'Georgia, serif' }}>Почніть з чого-небудь</span>
                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" className="mt-0.5 text-orange-400">
                  <path d="M10 2 C14 8, 14 15, 10 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                  <path d="M10 20 L7 16 M10 20 L13 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>

              {/* "ПОДАЛЬШИЙ КОНТАКТ" stamp — top right of whole mockup */}
              <div className="absolute -top-4 right-2 border-2 border-orange-400 rounded px-2.5 py-1 rotate-2 pointer-events-none select-none z-10 bg-white">
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">Подальший контакт</span>
              </div>

              {/* Outer cream container */}
              <div className="relative rounded-3xl bg-orange-50/70 border border-orange-100 p-3 pt-5">
                <div className="grid grid-cols-2 gap-2 relative">

                  {/* Idea card */}
                  <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-800">{t.hero.previewYourIdea}</span>
                      <span className="text-xs text-gray-400">109/300</span>
                    </div>
                    <div className="rounded-xl bg-gray-50 border border-gray-100 p-3.5 text-sm text-gray-500 leading-relaxed mb-4" style={{ minHeight: '100px' }}>
                      Написати follow-up потенційному клієнту після дзвінка. Згадайте, що я прикріпив пропозицію, і запитайте, чи є в нього запитання.
                    </div>
                    {[
                      [t.hero.previewTone, 'Професійний'],
                      ['Мова', 'Українська'],
                      ['Довжина', 'Короткий'],
                      [t.hero.previewPurpose, 'Подальший контакт'],
                    ].map(([label, val]) => (
                      <div key={label} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                        <span className="text-sm text-gray-400">{label}</span>
                        <span className="text-sm text-gray-700 font-medium flex items-center gap-1.5">{val} <ChevronDown className="h-3.5 w-3.5 text-gray-400" /></span>
                      </div>
                    ))}
                    <button className="mt-5 w-full rounded-xl bg-orange-600 text-white text-sm font-semibold py-3 flex items-center justify-center gap-2 hover:bg-orange-700 transition-colors">
                      {t.hero.previewGenerateBtn} <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Orange sparkle button between panels */}
                  <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="h-11 w-11 rounded-full bg-orange-600 shadow-lg flex items-center justify-center ring-4 ring-orange-100">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  {/* Result card */}
                  <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-800">{t.hero.previewYourEmail}</span>
                      <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                        {t.hero.previewGenStatus}
                        <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />
                      </span>
                    </div>
                    <div className="text-sm mb-3">
                      <span className="text-gray-500">{t.hero.previewSubject}: </span>
                      <span className="font-semibold text-gray-800">Після нашої розмови</span>
                    </div>
                    <div className="text-sm text-gray-600 leading-relaxed space-y-2">
                      <p>Привіт, Саро,</p>
                      <p>Дякую, що знайшли час поспілкуватись зі мною сьогодні.</p>
                      <p>Я прикріпив пропозицію, про яку ми говорили. Будь ласка, дайте знати, якщо у вас є запитання або якщо я можу щось уточнити.</p>
                      <p>З повагою,<br />Алекс</p>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      {['Копіювати', 'Згенерувати ще раз', 'Зробити ввічливішим', 'Зробити коротшим'].map(btn => (
                        <button key={btn} className="rounded-lg border border-gray-200 text-xs text-gray-600 py-2 px-2 hover:bg-gray-50 transition-colors">
                          {btn}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-gray-100 bg-gray-50 py-7">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            {[
              { value: '10,000+', label: t.stats.emails },
              { value: '2,500+', label: t.stats.users },
              { value: '3', label: t.stats.languages },
              { value: '4.9★', label: t.stats.rating },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8">
                {i > 0 && <div className="w-px h-8 bg-gray-200 hidden sm:block" />}
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{t.howItWorks.title}</h2>
            <p className="mt-3 text-lg text-gray-500">{t.howItWorks.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(t.howItWorks.steps as { number: string; title: string; desc: string }[]).map((step) => (
              <div key={step.number} className="relative">
                <div className="text-6xl font-bold text-orange-100 leading-none mb-4 select-none">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{t.features.title}</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">{t.features.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(t.features.items as { title: string; description: string }[]).map((feature, i) => {
              const Icon = FEATURE_ICONS[i]
              return (
                <div key={feature.title} className="rounded-2xl border border-gray-200 bg-white p-6 hover:border-orange-200 hover:shadow-md transition-all duration-200">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                    <Icon className="h-5 w-5 text-orange-600" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{t.testimonials.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(tm => (
              <div key={tm.name} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: tm.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-5 text-sm">&ldquo;{tm.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-700">
                    {tm.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{tm.name}</div>
                    <div className="text-xs text-gray-400">{tm.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{t.faq.title}</h2>
          </div>
          <div className="space-y-3">
            {(t.faq.items as { q: string; a: string }[]).map(({ q, a }) => (
              <details key={q} className="group rounded-xl border border-gray-200 bg-white overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-900 text-sm">{q}</span>
                  <ChevronDown className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA (dark) ── */}
      <section className="bg-gray-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-4">
                {t.cta.subtitle}
              </p>
              <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                {t.cta.title.split(' ').slice(0, -2).join(' ')}{' '}
                <span className="text-orange-500">{t.cta.title.split(' ').slice(-2).join(' ')}</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={user ? '/dashboard' : '/signup'}>
                  <Button size="lg" className="w-full sm:w-auto">
                    {user ? t.cta.buttonDashboard : t.cta.button}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto text-gray-400 hover:text-white hover:bg-white/10">
                    {t.cta.viewPlans}
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-500">{t.hero.noCreditCard}</p>
            </div>

            {/* Dark mockup */}
            <div className="hidden lg:block">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs text-gray-500 ml-1">MailMindAI</span>
                </div>
                <div className="space-y-2 mb-3">
                  <div className="text-xs text-gray-400">Кому: ваш наступний клієнт</div>
                  <div className="text-xs text-gray-400">Тема: Після нашої розмови</div>
                </div>
                <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-xs text-gray-400 leading-relaxed min-h-[80px]">
                  Починайте із вашої ідеї...
                </div>
                <div className="mt-3 flex justify-end">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-950 text-gray-500 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-600">
                <Zap className="h-3.5 w-3.5 text-white" />
              </div>
              MailMindAI
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/pricing" className="hover:text-white transition-colors">{t.nav.pricing}</Link>
              <Link href="/#features" className="hover:text-white transition-colors">{t.nav.features}</Link>
              <Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link>
            </div>
            <p className="text-xs">{t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </>
  )
}
