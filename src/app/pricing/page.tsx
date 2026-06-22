import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Navbar } from '@/components/layout/navbar'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Zap } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for individuals trying AI email writing.',
    features: [
      '10 emails per month',
      'All 4 tone options',
      'English only',
      'Copy to clipboard',
      'Email history (7 days)',
    ],
    cta: 'Get started free',
    href: '/signup',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'per month',
    description: 'For professionals who write emails daily.',
    features: [
      'Unlimited emails',
      'All tone options',
      '20+ languages',
      'Email history (unlimited)',
      'Priority AI model',
      'Copy & download',
      'Email support',
    ],
    cta: 'Upgrade to Pro',
    href: '/signup?plan=pro',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$49',
    period: 'per month',
    description: 'For teams that want to write better, together.',
    features: [
      'Everything in Pro',
      'Up to 10 team members',
      'Shared templates',
      'Team analytics',
      'Admin dashboard',
      'Priority support',
      'Custom integrations',
    ],
    cta: 'Start team trial',
    href: '/signup?plan=team',
    highlighted: false,
  },
]

export default async function PricingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar user={user} />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-violet-50 via-white to-indigo-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start free, upgrade when you need more. No hidden fees, cancel anytime.
            </p>
          </div>
        </section>

        {/* Plans */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {plans.map(plan => (
                <div
                  key={plan.name}
                  className={`rounded-2xl border p-8 relative ${
                    plan.highlighted
                      ? 'border-violet-500 shadow-xl ring-2 ring-violet-500 bg-white'
                      : 'border-gray-200 bg-white shadow-sm'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-600 px-4 py-1 text-xs font-semibold text-white">
                        <Zap className="h-3 w-3" /> Most popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-500 text-sm">/{plan.period}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-violet-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={user ? '/dashboard' : plan.href}>
                    <Button
                      className="w-full"
                      size="lg"
                      variant={plan.highlighted ? 'primary' : 'outline'}
                    >
                      {user && plan.name === 'Free' ? 'Current plan' : plan.cta}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ / guarantee */}
        <section className="py-16 bg-gray-50 border-t border-gray-100">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">30-day money-back guarantee</h2>
            <p className="text-gray-600">
              Not satisfied? We&apos;ll refund your payment within 30 days — no questions asked.
            </p>
            <p className="mt-6 text-sm text-gray-500">
              Questions?{' '}
              <a href="mailto:support@mailmindai.com" className="text-violet-600 hover:underline">
                Contact support
              </a>
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
