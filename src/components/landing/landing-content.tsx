'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n/language-context'
import { ArrowRight, Star, ChevronDown, Zap, Shield, Globe, Clock, Sparkles, Users, ShoppingBag, Heart, Headphones, UserCheck, Copy, RefreshCw, Wand2, Scissors, TrendingUp, Send, CheckCircle2 } from 'lucide-react'
import { ContactModal } from './contact-modal'
import Image from 'next/image'
import { HeroMockup } from './hero-mockup'

const FEATURE_ICONS = [Zap, Sparkles, Globe, Shield, Clock, Users]
const INDUSTRY_ICONS = [ShoppingBag, Heart, Headphones, UserCheck]

const testimonials = [
  { name: 'Sarah K.', role: 'Sales Manager', text: 'I used to spend 30 minutes writing follow-up emails. Now it takes 30 seconds. Game changer.', rating: 5 },
  { name: 'Дмитро В.', role: 'Freelance Designer', text: 'Моя комунікація з клієнтами покращилась суттєво. Опції тону — саме те що треба.', rating: 5 },
  { name: 'Lisa M.', role: 'Startup Founder', text: 'QuillAI handles investor outreach, team updates, and partner emails. Indispensable.', rating: 5 },
  { name: 'Олена Ш.', role: 'HR Manager', text: 'Рекрутингові листи стали в рази ефективніші. Кандидати відповідають частіше, бо текст живий і природний.', rating: 5 },
  { name: 'Marco R.', role: 'Account Executive', text: 'Cold outreach response rates went up 40% after switching to QuillAI. The tone options are brilliant.', rating: 5 },
  { name: 'Андрій К.', role: 'Product Manager', text: 'Нарешті інструмент який не пише як робот. Листи партнерам і інвесторам — тепер задоволення, а не мука.', rating: 5 },
]

function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(() => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [email])
  return (
    <div className="inline-flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
      <span className="text-sm text-gray-700 font-medium">{email}</span>
      <button
        onClick={copy}
        className="flex items-center gap-1.5 rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-orange-700 transition-colors"
      >
        <Copy className="h-3.5 w-3.5" />
        {copied ? 'Скопійовано!' : 'Копіювати'}
      </button>
    </div>
  )
}

function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-3">
      {items.map(({ q, a }, i) => (
        <div key={q} className="rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-100 transition-colors"
          >
            <span className="font-medium text-gray-900 text-sm">{q}</span>
            <ChevronDown className={`h-4 w-4 text-gray-400 flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
          </button>
          <div className={`grid transition-all duration-300 ease-in-out ${open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden">
              <div className="px-6 pb-5 pt-4 text-sm text-gray-500 leading-relaxed border-t border-gray-200">{a}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

interface LandingContentProps {
  user?: { email?: string | null } | null
}

export function LandingContent({ user }: LandingContentProps) {
  const { t } = useLanguage()
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      {/* ── HERO ── */}
      <section className="bg-gray-50 min-h-[calc(100vh-64px)] flex items-center overflow-hidden">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-14 items-center">

            {/* Left */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-gray-900 leading-[1.12] mb-6">
                {t.hero.title}{' '}
                <span className="text-orange-600">{t.hero.titleAccent}</span>
                {t.hero.titleEnd ? <>{' '}{t.hero.titleEnd}</> : null}
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-md">
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
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    {t.hero.howItWorksBtn} →
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-gray-400">{t.hero.noCreditCard}</p>
            </div>

            {/* Right — animated mockup */}
            <HeroMockup />
          </div>
        </div>
      </section>


      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-orange-50 to-white overflow-hidden">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 items-start">

            {/* Left */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-6">{t.howItWorks.title}</h2>
              <p className="text-gray-500 leading-relaxed mb-4">{t.howItWorks.subtitle}</p>
              <p className="text-gray-500 leading-relaxed mb-10">{(t.howItWorks as any).subtitle2}</p>

              <div className="flex flex-col gap-5">
                {([
                  { icon: Clock, label: (t.howItWorks as any).perks?.[0] },
                  { icon: TrendingUp, label: (t.howItWorks as any).perks?.[1] },
                  { icon: Shield, label: (t.howItWorks as any).perks?.[2] },
                ] as { icon: React.ElementType; label: string }[]).map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-100 bg-white shadow-sm">
                      <Icon className="h-5 w-5 text-orange-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — steps */}
            <div className="flex flex-col lg:pt-12">
              {(t.howItWorks.steps as { number: string; title: string; desc: string }[]).map((step, i, arr) => (
                <div key={step.number} className="relative flex gap-6 pb-10 last:pb-0">
                  {/* Connector line */}
                  <div className="flex flex-col items-center flex-none w-14">
                    <span className="text-4xl font-bold text-orange-500 leading-none">{step.number}</span>
                    {i < arr.length - 1 && (
                      <div className="mt-3 w-px flex-1 border-l-2 border-dashed border-orange-200 min-h-[40px]" />
                    )}
                  </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-sm text-gray-500 mb-4">{step.desc}</p>

                      {/* Step mockup */}
                      {i === 0 && (
                        <div className="rounded-xl border border-gray-200 bg-white shadow-md p-4 space-y-2">
                          <div className="text-xs font-medium text-gray-500">Мета листа *</div>
                          <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 leading-relaxed">
                            Треба нагадати клієнту про оплату, але ввічливо й без тиску.
                          </div>
                        </div>
                      )}
                      {i === 1 && (
                        <div className="flex flex-wrap gap-2">
                          {['Дружній', 'Українська', 'Короткий'].map(label => (
                            <div key={label} className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm">
                              <span>{label}</span>
                              <ChevronDown className="h-3.5 w-3.5 text-gray-400 ml-0.5" />
                            </div>
                          ))}
                        </div>
                      )}
                      {i === 2 && (
                        <div className="rounded-xl border border-gray-200 bg-white shadow-md p-4 space-y-3">
                          <div className="rounded-lg bg-orange-50 border border-orange-100 px-4 py-3">
                            <div className="text-xs font-medium text-orange-500 uppercase tracking-wide mb-1">Тема</div>
                            <div className="text-sm font-semibold text-gray-900">Нагадування щодо оплати</div>
                          </div>
                          <div className="rounded-lg bg-gray-50 border border-gray-100 px-4 py-3">
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Лист</div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              Доброго дня!<br />
                              Нагадуємо, що оплата за рахунком №124 від 02.05.2024 ще не надійшла. Будемо вдячні, якщо зможете здійснити оплату найближчим часом.
                            </p>
                          </div>
                          <div className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Готово до відправки
                          </div>
                        </div>
                      )}
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 bg-gray-100 border-t border-gray-200">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{t.features.title}</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">{t.features.subtitle}</p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-3 gap-4 auto-rows-[minmax(160px,auto)]">
            {(t.features.items as { title: string; description: string }[]).map((feature, i) => {
              const Icon = FEATURE_ICONS[i]
              // wide: 0, 3, 5 → col-span-2; narrow: 1, 2, 4 → col-span-1
              const wide = i === 0 || i === 3 || i === 5
              const featured = i === 0
              return (
                <div
                  key={feature.title}
                  className={[
                    'rounded-2xl border p-7 flex flex-col justify-between transition-all duration-200 hover:shadow-md',
                    wide ? 'col-span-2' : 'col-span-1',
                    featured
                      ? 'bg-orange-50 border-orange-200 hover:border-orange-300'
                      : 'bg-white border-gray-200 hover:border-orange-200',
                  ].join(' ')}
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
                    <Icon className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-1.5 text-gray-900">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-500">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-24 bg-orange-50 border-t border-orange-100">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.testimonials.title}</h2>
            <p className="text-gray-500 max-w-xl mx-auto">{(t.testimonials as any).subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map(tm => (
              <div key={tm.name} className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: tm.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-5 text-sm">&ldquo;{tm.text}&rdquo;</p>
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
      <section id="faq" className="py-24 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16">

            {/* Left */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.faq.title}</h2>
              <p className="text-gray-500 leading-relaxed mb-8">{(t.faq as any).subtitle}</p>
              <Button size="md" onClick={() => setContactOpen(true)}>
                Написати нам <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Right */}
            <FaqAccordion items={t.faq.items as { q: string; a: string }[]} />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-orange-50 py-16 border-t border-orange-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white shadow-sm border border-orange-100 overflow-hidden">
            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left */}
              <div className="px-10 py-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-600">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold text-gray-900">Quill<span className="text-orange-600">AI</span></span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-3">
                  {t.cta.title.split((t.cta as any).titleAccent)[0]}
                  <span className="text-orange-500">{(t.cta as any).titleAccent}</span>
                </h2>
                <p className="text-gray-500 leading-relaxed mb-6 text-sm">{t.cta.subtitle}</p>
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <Link href={user ? '/dashboard' : '/signup'}>
                    <Button size="md" className="whitespace-nowrap">
                      {user ? t.cta.buttonDashboard : t.cta.button}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button variant="outline" size="md" className="whitespace-nowrap">
                      {t.cta.viewPlans} →
                    </Button>
                  </Link>
                </div>
                <p className="text-sm text-gray-400">{t.hero.noCreditCard}</p>
              </div>

              {/* Right — email mockup */}
              <div className="hidden lg:flex items-center px-6 py-6 bg-white border-l border-orange-100">
                <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-md p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-800">Ваш лист</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-[11px] font-medium text-green-700">
                      <CheckCircle2 className="h-3 w-3" /> Готово до відправки
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-gray-800 mb-3">
                    Тема: Пропозиція щодо співпраці
                  </div>
                  <div className="text-[13px] text-gray-500 leading-relaxed mb-5">
                    Доброго дня, Олено!<br /><br />
                    Дякуємо за інтерес до нашого рішення. Воно допомагає командам економити час на рутинних листах.<br /><br />
                    З повагою, Команда QuillAI
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="rounded-lg border border-gray-200 text-xs text-gray-600 py-2 hover:bg-gray-50 flex items-center justify-center gap-1.5">
                      <Copy className="h-3.5 w-3.5" /> Копіювати
                    </button>
                    <button className="rounded-lg border border-gray-200 text-xs text-gray-600 py-2 hover:bg-gray-50 flex items-center justify-center gap-1.5">
                      <RefreshCw className="h-3.5 w-3.5" /> Регенерувати
                    </button>
                    <button className="rounded-lg border border-gray-200 text-xs text-gray-600 py-2 hover:bg-gray-50 flex items-center justify-center gap-1.5">
                      <Wand2 className="h-3.5 w-3.5" /> Ввічливіше
                    </button>
                    <button className="rounded-lg border border-gray-200 text-xs text-gray-600 py-2 hover:bg-gray-50 flex items-center justify-center gap-1.5">
                      <Scissors className="h-3.5 w-3.5" /> Коротше
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100">
              {((t.cta as any).stats as { value: string; label: string }[]).map(({ value, label }, i) => {
                const Icon = [Zap, Globe, Wand2][i]
                return (
                  <div key={label} className="flex items-center gap-3 px-8 py-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 flex-none">
                      <Icon className="h-3.5 w-3.5 text-orange-500" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{value}</div>
                      <div className="text-xs text-gray-400">{label}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-950 text-gray-400">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1400px] px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10">

            {/* Brand col */}
            <div>
              <div className="flex items-center gap-2.5 font-bold text-white mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-orange-500 bg-white overflow-hidden flex-none">
                  <Image src="/logo.png" alt="Quill" width={64} height={64} className="scale-150 object-contain" />
                </div>
                <span className="text-xl tracking-tight">Quill<span className="text-orange-500">AI</span></span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                {t.hero.subtitle}
              </p>
            </div>

            {/* Product col */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Продукт</p>
              <ul className="space-y-3 text-sm">
                <li><Link href="/#how-it-works" className="hover:text-white transition-colors">{(t.nav as any).howItWorks}</Link></li>
                <li><Link href="/#features" className="hover:text-white transition-colors">{t.nav.features}</Link></li>
                <li><Link href="/#testimonials" className="hover:text-white transition-colors">{(t.nav as any).testimonials}</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">{t.nav.pricing}</Link></li>
              </ul>
            </div>

            {/* Support col */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Підтримка</p>
              <ul className="space-y-3 text-sm">
                <li><Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">{t.nav.signIn}</Link></li>
                <li><Link href="/signup" className="hover:text-white transition-colors">{t.nav.getStarted}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800">
          <div className="mx-auto max-w-7xl 2xl:max-w-[1400px] px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs">{t.footer.rights}</p>
            <p className="text-xs">Made with ♥ in Ukraine</p>
          </div>
        </div>
      </footer>
    </>
  )
}
