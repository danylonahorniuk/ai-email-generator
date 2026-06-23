'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n/language-context'
import { ArrowRight, Star, ChevronDown, Zap, Shield, Globe, Clock, Sparkles, Users, ShoppingBag, Heart, Headphones, UserCheck, Copy, RefreshCw, Wand2, Scissors, TrendingUp, Send, CheckCircle2 } from 'lucide-react'
import { ContactModal } from './contact-modal'

const FEATURE_ICONS = [Zap, Sparkles, Globe, Shield, Clock, Users]
const INDUSTRY_ICONS = [ShoppingBag, Heart, Headphones, UserCheck]

const testimonials = [
  { name: 'Sarah K.', role: 'Sales Manager', text: 'I used to spend 30 minutes writing follow-up emails. Now it takes 30 seconds. Game changer.', rating: 5 },
  { name: 'Дмитро В.', role: 'Freelance Designer', text: 'Моя комунікація з клієнтами покращилась суттєво. Опції тону — саме те що треба.', rating: 5 },
  { name: 'Lisa M.', role: 'Startup Founder', text: 'MailMindAI handles investor outreach, team updates, and partner emails. Indispensable.', rating: 5 },
  { name: 'Олена Ш.', role: 'HR Manager', text: 'Рекрутингові листи стали в рази ефективніші. Кандидати відповідають частіше, бо текст живий і природний.', rating: 5 },
  { name: 'Marco R.', role: 'Account Executive', text: 'Cold outreach response rates went up 40% after switching to MailMindAI. The tone options are brilliant.', rating: 5 },
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
      <section className="bg-white pt-14 pb-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto text-gray-600">
                    {t.hero.howItWorksBtn} →
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-gray-400 mb-10">{t.hero.noCreditCard}</p>

              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-4">
                  {t.hero.industriesLabel}
                </p>
                <div className="flex flex-wrap gap-4">
                  {(t.hero.industries as string[]).map((ind: string, i: number) => {
                    const Icon = INDUSTRY_ICONS[i % INDUSTRY_ICONS.length]
                    return (
                      <div key={ind} className="flex items-center gap-2 text-sm text-gray-600">
                        <Icon className="h-4 w-4 text-gray-400" />
                        <span>{ind}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right — mockup */}
            <div className="relative hidden lg:flex items-start gap-4">

              {/* Annotation top */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
                <span className="font-['Georgia',serif] italic text-orange-500 text-sm whitespace-nowrap">Почніть з чого-небудь</span>
                <svg width="40" height="28" viewBox="0 0 40 28" fill="none" className="mt-0.5">
                  <path d="M20 2 C10 8, 5 18, 12 26" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                  <path d="M12 26 L8 22 M12 26 L16 22" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>

              {/* Stamp top-right */}
              <div className="absolute -top-6 -right-2 z-10 rotate-6">
                <div className="border-2 border-orange-400 rounded px-2 py-0.5">
                  <span className="text-[9px] font-bold text-orange-500 uppercase tracking-widest">Подальший контакт</span>
                </div>
              </div>

              {/* Idea card */}
              <div className="rounded-2xl border border-gray-200 bg-white shadow-md p-5 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-gray-800">{t.hero.previewYourIdea}</span>
                  <span className="text-[11px] text-gray-400">109/300</span>
                </div>
                <div className="rounded-xl bg-gray-50 border border-gray-100 p-3.5 text-[13px] text-gray-500 leading-relaxed mb-4 min-h-[96px]">
                  Написати follow-up потенційному клієнту після дзвінка. Згадати про пропозицію і запитати чи є питання.
                </div>
                {[
                  [t.hero.previewTone, 'Професійний'],
                  ['Мова', 'Українська'],
                  ['Довжина', 'Короткий'],
                  [t.hero.previewPurpose, 'Подальший контакт'],
                ].map(([label, val]) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-xs text-gray-400">{label}</span>
                    <span className="text-xs text-gray-700 font-medium flex items-center gap-1">{val} <ChevronDown className="h-3 w-3" /></span>
                  </div>
                ))}
                <button className="mt-4 w-full rounded-xl bg-orange-600 text-white text-sm font-medium py-2.5 flex items-center justify-center gap-2">
                  {t.hero.previewGenerateBtn} <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Sparkle button between cards */}
              <div className="flex-none self-center -mx-2 z-10">
                <div className="h-11 w-11 rounded-full bg-orange-500 shadow-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Result card */}
              <div className="rounded-2xl border border-gray-200 bg-white shadow-md p-5 flex-1 relative">
                {/* Stamp outside bottom-right of card */}
                <div className="absolute -bottom-4 -right-6 -rotate-6 z-10">
                  <div className="border-2 border-green-500 rounded px-2 py-0.5">
                    <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest">Відповідь клієнта</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-gray-800">{t.hero.previewYourEmail}</span>
                  <span className="flex items-center gap-1.5 text-[11px] text-green-600 font-medium">
                    <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />
                    {t.hero.previewGenStatus}
                  </span>
                </div>
                <div className="text-xs font-semibold text-gray-800 mb-3">
                  {t.hero.previewSubject}: Після нашої розмови
                </div>
                <div className="text-[13px] text-gray-500 leading-relaxed">
                  Привіт, Саро,<br /><br />
                  Дякую що знайшли час поспілкуватись зі мною сьогодні. Я прикріплю пропозицію, про яку ми говорили. Будь ласка, дайте знати, якщо у вас є запитання або якщо я можу щось уточнити.<br /><br />
                  З повагою,<br />Алекс
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button className="rounded-lg border border-gray-200 text-xs text-gray-600 py-2 hover:bg-gray-50 flex items-center justify-center gap-1.5">
                    <Copy className="h-3.5 w-3.5" /> {t.hero.previewCopy}
                  </button>
                  <button className="rounded-lg border border-gray-200 text-xs text-gray-600 py-2 hover:bg-gray-50 flex items-center justify-center gap-1.5">
                    <RefreshCw className="h-3.5 w-3.5" /> {t.hero.previewRegen}
                  </button>
                  <button className="rounded-lg border border-gray-200 text-xs text-gray-600 py-2 hover:bg-gray-50 flex items-center justify-center gap-1.5">
                    <Wand2 className="h-3.5 w-3.5" /> Ввічливіше
                  </button>
                  <button className="rounded-lg border border-gray-200 text-xs text-gray-600 py-2 hover:bg-gray-50 flex items-center justify-center gap-1.5">
                    <Scissors className="h-3.5 w-3.5" /> Коротше
                  </button>
                </div>
              </div>

              {/* Decorative accent */}
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-orange-100 -z-10" />
              <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-orange-50 -z-10" />
            </div>
          </div>
        </div>
      </section>


      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-orange-50 to-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                        <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Треба нагадати клієнту про оплату, але{' '}
                            <em className="not-italic underline decoration-orange-400">ввічливо</em>{' '}
                            й{' '}
                            <em className="not-italic underline decoration-orange-400">без тиску</em>.
                          </p>
                          <div className="flex justify-end mt-3">
                            <Send className="h-4 w-4 text-gray-300" />
                          </div>
                        </div>
                      )}
                      {i === 1 && (
                        <div className="flex flex-wrap gap-2">
                          {[
                            { icon: '🙂', label: 'Дружній' },
                            { icon: '🌐', label: 'Українська' },
                            { icon: '≡', label: 'Короткий' },
                          ].map(opt => (
                            <div key={opt.label} className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm">
                              <span>{opt.icon}</span>
                              <span>{opt.label}</span>
                              <ChevronDown className="h-3.5 w-3.5 text-gray-400 ml-0.5" />
                            </div>
                          ))}
                        </div>
                      )}
                      {i === 2 && (
                        <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4">
                          <p className="text-xs font-semibold text-orange-500 mb-2">Нагадування щодо оплати</p>
                          <p className="text-xs text-gray-600 leading-relaxed mb-3">
                            Доброго дня!<br />
                            Нагадуємо, що оплата за рахунком №124 від 02.05.2024 ще не надійшла. Будемо вдячні, якщо зможете здійснити оплату найближчим часом.
                          </p>
                          <div className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Готово до відправки
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                      ? 'bg-gradient-to-br from-orange-500 to-orange-600 border-orange-400 text-white'
                      : 'bg-white border-gray-200 hover:border-orange-200',
                  ].join(' ')}
                >
                  <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${featured ? 'bg-white/20' : 'bg-orange-50'}`}>
                    <Icon className={`h-5 w-5 ${featured ? 'text-white' : 'text-orange-600'}`} />
                  </div>
                  <div>
                    <h3 className={`text-base font-semibold mb-1.5 ${featured ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                    <p className={`text-sm leading-relaxed ${featured ? 'text-orange-100' : 'text-gray-500'}`}>{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-orange-50 border-t border-orange-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{t.testimonials.title}</h2>
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
