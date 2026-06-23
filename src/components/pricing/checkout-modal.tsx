'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, CreditCard, Lock, CheckCircle2, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Plan {
  name: string
  price: string
  period: string
  features: string[]
}

interface CheckoutModalProps {
  open: boolean
  onClose: () => void
  plan: Plan | null
}

export function CheckoutModal({ open, onClose, plan }: CheckoutModalProps) {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' })

  if (!open || !plan) return null

  function formatCard(value: string) {
    return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  }

  function formatExpiry(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2)
    return digits
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    await new Promise(r => setTimeout(r, 1200))
    setStatus('success')
  }

  function handleClose() {
    setStatus('idle')
    setCard({ number: '', expiry: '', cvv: '', name: '' })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">

        {status === 'success' ? (
          <div className="p-10 text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Вітаємо!</h3>
            <p className="text-gray-500 mb-2">Ви успішно підключили план <span className="font-semibold text-gray-800">{plan.name}</span>.</p>
            <p className="text-sm text-gray-400 mb-8">Деталі підписки надіслано на вашу електронну пошту.</p>
            <Button size="lg" className="w-full" onClick={() => { handleClose(); router.push('/dashboard') }}>Перейти до дашборду</Button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-orange-50 border-b border-orange-100 px-6 py-5">
              <button onClick={handleClose} className="absolute right-4 top-4 p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-600">Підключення плану</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-500 text-sm">/{plan.period}</span>
                <span className="ml-2 text-lg font-semibold text-gray-900">{plan.name}</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
                {plan.features.slice(0, 3).map(f => (
                  <span key={f} className="text-xs text-gray-500 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-orange-400" /> {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Ім'я на картці</label>
                <input
                  required
                  value={card.name}
                  onChange={e => setCard(p => ({ ...p, name: e.target.value }))}
                  placeholder="IVAN PETRENKO"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 uppercase"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Номер картки</label>
                <div className="relative">
                  <input
                    required
                    value={card.number}
                    onChange={e => setCard(p => ({ ...p, number: formatCard(e.target.value) }))}
                    placeholder="0000 0000 0000 0000"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 pl-11 text-sm text-gray-900 placeholder-gray-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 font-mono tracking-wider"
                  />
                  <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Термін дії</label>
                  <input
                    required
                    value={card.expiry}
                    onChange={e => setCard(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                    placeholder="MM/YY"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">CVV</label>
                  <input
                    required
                    value={card.cvv}
                    onChange={e => setCard(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) }))}
                    placeholder="•••"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 font-mono"
                  />
                </div>
              </div>

              <Button type="submit" size="lg" loading={status === 'loading'} className="w-full mt-2">
                Оплатити {plan.price}/міс
              </Button>

              <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
                <Lock className="h-3 w-3" /> Захищено SSL-шифруванням. Реальна оплата не відбудеться.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
