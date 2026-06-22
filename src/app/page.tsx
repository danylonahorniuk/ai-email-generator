import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Navbar } from '@/components/layout/navbar'
import { Button } from '@/components/ui/button'
import {
  Zap, Shield, Globe, Clock, ChevronDown, Star, ArrowRight, Mail,
  Sparkles, Users
} from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate polished emails in under 3 seconds. No more staring at a blank page.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Quality',
    description: 'Claude AI ensures every email is coherent, professional, and on-brand.',
  },
  {
    icon: Globe,
    title: 'Multilingual',
    description: 'Write emails in 20+ languages without worrying about grammar or tone.',
  },
  {
    icon: Shield,
    title: 'Private & Secure',
    description: 'Your data is never stored or used to train AI models.',
  },
  {
    icon: Clock,
    title: 'Save Hours Weekly',
    description: 'Teams report saving 4–6 hours per week on email writing.',
  },
  {
    icon: Users,
    title: 'Team Ready',
    description: 'Collaborative plans for growing teams with shared templates.',
  },
]

const faqs = [
  {
    q: 'How does the AI email generator work?',
    a: 'You provide the context — purpose, tone, key points — and our AI crafts a complete, professional email in seconds. You can copy, edit, and send.',
  },
  {
    q: 'Is my data safe?',
    a: 'Absolutely. We never store your email content or use it to train models. Your inputs are processed in real-time and discarded.',
  },
  {
    q: 'Can I use it for free?',
    a: 'Yes! Our Free plan gives you 10 emails per month. No credit card required to get started.',
  },
  {
    q: 'What languages are supported?',
    a: 'MailMindAI supports English, Ukrainian, Spanish, French, German, Italian, Portuguese, Japanese, Chinese, and 15+ more.',
  },
  {
    q: 'Can I switch AI providers?',
    a: 'The architecture is provider-agnostic. We currently use Claude by Anthropic for best-in-class quality.',
  },
]

const testimonials = [
  {
    name: 'Sarah K.',
    role: 'Sales Manager',
    text: 'I used to spend 30 minutes writing follow-up emails. Now it takes 30 seconds. Game changer.',
    rating: 5,
  },
  {
    name: 'Dmytro V.',
    role: 'Freelance Designer',
    text: 'My client communication improved dramatically. The tone options are exactly what I needed.',
    rating: 5,
  },
  {
    name: 'Lisa M.',
    role: 'Startup Founder',
    text: 'MailMindAI handles investor outreach, team updates, and partner emails. Indispensable.',
    rating: 5,
  },
]

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar user={user} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-50 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-sm font-medium text-violet-700 mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by Claude AI
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
            Write perfect emails{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
              10× faster
            </span>{' '}
            with AI
          </h1>

          <p className="mt-6 mx-auto max-w-2xl text-lg sm:text-xl text-gray-600 leading-relaxed">
            Stop wasting time on email drafts. MailMindAI generates professional,
            personalized emails in seconds — for any tone, purpose, or language.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={user ? '/dashboard' : '/signup'}>
              <Button size="lg" className="w-full sm:w-auto">
                <Zap className="h-5 w-5" />
                {user ? 'Go to Dashboard' : 'Start for free'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                View pricing
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-sm text-gray-500">No credit card required · 10 free emails/month</p>

          {/* App preview card */}
          <div className="mt-16 mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-gray-400 ml-2">MailMindAI Dashboard</span>
            </div>
            <div className="p-6 text-left space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-violet-50 border border-violet-100 px-3 py-2">
                  <div className="text-xs text-violet-500 mb-1">Tone</div>
                  <div className="text-sm font-medium text-gray-800">Professional</div>
                </div>
                <div className="rounded-lg bg-violet-50 border border-violet-100 px-3 py-2">
                  <div className="text-xs text-violet-500 mb-1">Purpose</div>
                  <div className="text-sm font-medium text-gray-800">Follow-up meeting</div>
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 border border-gray-100 p-4 space-y-2">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Generated Email</div>
                <div className="text-sm font-semibold text-gray-800">Subject: Following Up on Our Discussion</div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  Dear Sarah, I hope this message finds you well. I wanted to follow up on our conversation from Tuesday...
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
                  <span className="text-xs text-white font-medium">Copy Email</span>
                </div>
                <div className="flex-1 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <span className="text-xs text-gray-600 font-medium">Regenerate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="border-y border-gray-100 bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            {[
              { value: '10,000+', label: 'Emails generated' },
              { value: '2,500+', label: 'Happy users' },
              { value: '20+', label: 'Languages' },
              { value: '4.9★', label: 'Average rating' },
            ].map((stat, i) => (
              <>
                {i > 0 && <div key={`sep-${i}`} className="w-px h-10 bg-gray-200 hidden sm:block" />}
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Everything you need to write better emails
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Built for professionals who want to communicate clearly without spending hours crafting the perfect message.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="group rounded-2xl border border-gray-100 p-6 hover:border-violet-200 hover:shadow-lg transition-all duration-300">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 group-hover:bg-violet-100 transition-colors">
                  <Icon className="h-6 w-6 text-violet-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-violet-50 to-indigo-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Loved by professionals</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(t => (
              <div key={t.name} className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to write smarter emails?
          </h2>
          <p className="text-violet-200 text-lg mb-10">
            Join thousands of professionals already using MailMindAI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={user ? '/dashboard' : '/signup'}>
              <Button size="lg" variant="secondary">
                <Zap className="h-5 w-5 text-violet-600" />
                {user ? 'Go to Dashboard' : 'Get started free'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                View plans
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
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
              <Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link>
            </div>
            <p className="text-sm">© 2026 MailMindAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
