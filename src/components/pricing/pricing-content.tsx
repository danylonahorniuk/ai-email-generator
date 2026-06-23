'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n/language-context'
import { CheckCircle2, Zap } from 'lucide-react'
import { CheckoutModal } from './checkout-modal'
import { ContactModal } from '@/components/landing/contact-modal'

const PLANS = [
  {
    key: 'free',
    name: 'Free',
    price: '$0',
    period: { ua: 'назавжди', en: 'forever', ru: 'навсегда' },
    description: { ua: 'Ідеально для знайомства з AI-написанням листів.', en: 'Perfect for individuals trying AI email writing.', ru: 'Идеально для знакомства с AI-написанием писем.' },
    features: {
      ua: ['10 листів на місяць', 'Всі 4 тони', 'UA / EN / RU мови', 'Копіювати в буфер', 'Історія листів (7 днів)'],
      en: ['10 emails per month', 'All 4 tone options', 'UA / EN / RU languages', 'Copy to clipboard', 'Email history (7 days)'],
      ru: ['10 писем в месяц', 'Все 4 тона', 'UA / EN / RU языки', 'Копировать в буфер', 'История писем (7 дней)'],
    },
    href: '/signup',
    highlighted: false,
  },
  {
    key: 'pro',
    name: 'Pro',
    price: '$12',
    period: { ua: 'на місяць', en: 'per month', ru: 'в месяц' },
    description: { ua: 'Для професіоналів які пишуть листи щодня.', en: 'For professionals who write emails daily.', ru: 'Для профессионалов, которые пишут письма каждый день.' },
    features: {
      ua: ['Необмежені листи', 'Всі тони і мови', 'Необмежена історія', 'Пріоритетна AI модель', 'Копіювати і завантажити', 'Email підтримка'],
      en: ['Unlimited emails', 'All tone options', 'Unlimited history', 'Priority AI model', 'Copy & download', 'Email support'],
      ru: ['Неограниченные письма', 'Все тона и языки', 'Неограниченная история', 'Приоритетная AI модель', 'Копировать и скачать', 'Email поддержка'],
    },
    href: '/signup?plan=pro',
    highlighted: true,
  },
  {
    key: 'team',
    name: 'Team',
    price: '$49',
    period: { ua: 'на місяць', en: 'per month', ru: 'в месяц' },
    description: { ua: 'Для команд які хочуть писати краще разом.', en: 'For teams that want to write better, together.', ru: 'Для команд, которые хотят писать лучше вместе.' },
    features: {
      ua: ['Все з Pro', 'До 10 учасників', 'Спільні шаблони', 'Аналітика команди', 'Адмін панель', 'Пріоритетна підтримка'],
      en: ['Everything in Pro', 'Up to 10 team members', 'Shared templates', 'Team analytics', 'Admin dashboard', 'Priority support'],
      ru: ['Всё из Pro', 'До 10 участников', 'Общие шаблоны', 'Аналитика команды', 'Панель администратора', 'Приоритетная поддержка'],
    },
    href: '/signup?plan=team',
    highlighted: false,
  },
]

const CTA = {
  free:  { ua: 'Почати безкоштовно', en: 'Get started free', ru: 'Начать бесплатно' },
  pro:   { ua: 'Перейти на Pro', en: 'Upgrade to Pro', ru: 'Перейти на Pro' },
  team:  { ua: 'Почати тріал команди', en: 'Start team trial', ru: 'Начать триал команды' },
}

interface Props {
  user?: { email?: string | null } | null
}

export function PricingContent({ user }: Props) {
  const { t, locale } = useLanguage()
  const [checkoutPlan, setCheckoutPlan] = useState<null | { name: string; price: string; period: string; features: string[] }>(null)
  const [contactOpen, setContactOpen] = useState(false)

  function handleUpgrade(plan: typeof PLANS[0]) {
    if (!user) return
    setCheckoutPlan({
      name: plan.name,
      price: plan.price,
      period: plan.period[locale],
      features: plan.features[locale],
    })
  }

  return (
    <main className="flex-1">
      <section className="bg-gray-100 border-b border-gray-200 py-20">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1400px] px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{t.pricing.title}</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t.pricing.subtitle}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {PLANS.map(plan => (
              <div
                key={plan.key}
                className={`rounded-2xl border p-8 relative ${
                  plan.highlighted
                    ? 'border-orange-400 shadow-xl ring-2 ring-orange-400 bg-white -translate-y-4'
                    : 'border-gray-200 bg-white shadow-md'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-4 py-1 text-xs font-semibold text-white">
                      <Zap className="h-3 w-3" /> {t.pricing.popular}
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 text-sm">/{plan.period[locale]}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{plan.description[locale]}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features[locale].map(f => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>

                {user && plan.key !== 'free' ? (
                  <Button
                    className="w-full"
                    size="lg"
                    variant={plan.highlighted ? 'primary' : 'outline'}
                    onClick={() => handleUpgrade(plan)}
                  >
                    {CTA[plan.key as keyof typeof CTA][locale]}
                  </Button>
                ) : (
                  <Link href={user ? '/dashboard' : plan.key === 'free' ? plan.href : '/login?redirect=/pricing'}>
                    <Button className="w-full" size="lg" variant={plan.highlighted ? 'primary' : 'outline'}>
                      {user && plan.key === 'free' ? t.pricing.currentPlan : CTA[plan.key as keyof typeof CTA][locale]}
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100 border-t border-gray-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.pricing.guarantee}</h2>
          <p className="text-gray-500">{t.pricing.guaranteeText}</p>
          <p className="mt-6 text-sm text-gray-500">
            {t.pricing.contact}{' '}
            <button onClick={() => setContactOpen(true)} className="text-orange-600 hover:text-orange-700 hover:underline transition-colors">
              {t.pricing.contactLink}
            </button>
          </p>
        </div>
      </section>

      <CheckoutModal
        open={!!checkoutPlan}
        onClose={() => setCheckoutPlan(null)}
        plan={checkoutPlan}
      />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  )
}
