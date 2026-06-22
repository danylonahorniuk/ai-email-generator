'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { useLanguage } from '@/lib/i18n/language-context'
import { Sparkles, Copy, RotateCcw, CheckCheck, Download } from 'lucide-react'

interface GeneratedEmail {
  subject: string
  body: string
}

const TONE_OPTIONS = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'formal', label: 'Formal' },
  { value: 'casual', label: 'Casual' },
]

const LENGTH_OPTIONS = [
  { value: 'short', label: 'Short (3–5 sentences)' },
  { value: 'medium', label: 'Medium (2–3 paragraphs)' },
  { value: 'long', label: 'Long (4–5 paragraphs)' },
]

const LANGUAGE_OPTIONS = [
  { value: 'Ukrainian', label: '🇺🇦 Українська' },
  { value: 'English', label: '🇬🇧 English' },
  { value: 'Russian', label: '🇷🇺 Русский' },
]

export function EmailGenerator() {
  const { t } = useLanguage()
  const [form, setForm] = useState({
    purpose: '',
    tone: 'professional',
    length: 'medium',
    recipientName: '',
    senderName: '',
    keyPoints: '',
    language: 'Ukrainian',
  })
  const [result, setResult] = useState<GeneratedEmail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  function updateField(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    if (!form.purpose.trim()) {
      setError(t.dashboard.purposeRequired)
      return
    }
    setError('')
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to generate email')
      }
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function handleCopy() {
    if (!result) return
    await navigator.clipboard.writeText(`Subject: ${result.subject}\n\n${result.body}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDownload() {
    if (!result) return
    const blob = new Blob([`Subject: ${result.subject}\n\n${result.body}`], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'email.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">{t.dashboard.formTitle}</h2>
        <form onSubmit={handleGenerate} className="space-y-5">
          <Textarea
            label={t.dashboard.purpose}
            placeholder={t.dashboard.purposePlaceholder}
            value={form.purpose}
            onChange={e => updateField('purpose', e.target.value)}
            rows={3}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label={t.dashboard.tone}
              options={TONE_OPTIONS}
              value={form.tone}
              onChange={e => updateField('tone', e.target.value)}
            />
            <Select
              label={t.dashboard.length}
              options={LENGTH_OPTIONS}
              value={form.length}
              onChange={e => updateField('length', e.target.value)}
            />
          </div>
          <Select
            label={t.dashboard.language}
            options={LANGUAGE_OPTIONS}
            value={form.language}
            onChange={e => updateField('language', e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t.dashboard.recipient}
              placeholder="Sarah Johnson"
              value={form.recipientName}
              onChange={e => updateField('recipientName', e.target.value)}
            />
            <Input
              label={t.dashboard.sender}
              placeholder="John Doe"
              value={form.senderName}
              onChange={e => updateField('senderName', e.target.value)}
            />
          </div>
          <Textarea
            label={t.dashboard.keyPoints}
            placeholder={t.dashboard.keyPointsPlaceholder}
            value={form.keyPoints}
            onChange={e => updateField('keyPoints', e.target.value)}
            rows={3}
          />
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">{error}</div>
          )}
          <Button type="submit" loading={loading} className="w-full" size="lg">
            <Sparkles className="h-4 w-4" />
            {loading ? t.dashboard.generating : t.dashboard.generate}
          </Button>
        </form>
      </div>

      {/* Result */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">{t.dashboard.resultTitle}</h2>
          {result && (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setResult(null)}>
                <RotateCcw className="h-4 w-4" /> {t.dashboard.clear}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant={copied ? 'secondary' : 'primary'} size="sm" onClick={handleCopy}>
                {copied ? <CheckCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? t.dashboard.copied : t.dashboard.copy}
              </Button>
            </div>
          )}
        </div>

        {loading && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 animate-pulse">
                <Sparkles className="h-8 w-8 text-violet-600" />
              </div>
              <p className="text-gray-600 font-medium">{t.dashboard.craftingTitle}</p>
              <p className="text-sm text-gray-400">{t.dashboard.craftingSubtitle}</p>
            </div>
          </div>
        )}

        {!loading && !result && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-3 max-w-xs">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <Sparkles className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500">{t.dashboard.emptyTitle}</p>
              <p className="text-sm text-gray-400">{t.dashboard.emptySubtitle}</p>
            </div>
          </div>
        )}

        {!loading && result && (
          <div className="flex-1 space-y-4">
            <div className="rounded-lg bg-violet-50 border border-violet-100 px-4 py-3">
              <div className="text-xs font-medium text-violet-500 uppercase tracking-wide mb-1">{t.dashboard.subject}</div>
              <div className="text-sm font-semibold text-gray-900">{result.subject}</div>
            </div>
            <div className="rounded-lg bg-gray-50 border border-gray-100 px-4 py-4">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">{t.dashboard.body}</div>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{result.body}</pre>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={handleCopy} variant={copied ? 'secondary' : 'primary'}>
                {copied ? <CheckCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? t.dashboard.copied : t.dashboard.copyEmail}
              </Button>
              <Button variant="outline" onClick={handleGenerate} disabled={loading}>
                <RotateCcw className="h-4 w-4" /> {t.dashboard.regenerate}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
