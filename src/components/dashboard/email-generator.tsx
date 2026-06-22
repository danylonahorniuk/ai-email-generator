'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
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

const LANGUAGE_OPTIONS = [
  { value: 'English', label: 'English' },
  { value: 'Ukrainian', label: 'Ukrainian' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Portuguese', label: 'Portuguese' },
  { value: 'Polish', label: 'Polish' },
]

export function EmailGenerator() {
  const [form, setForm] = useState({
    purpose: '',
    tone: 'professional',
    recipientName: '',
    senderName: '',
    keyPoints: '',
    language: 'English',
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
      setError('Please describe the purpose of your email.')
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
    const text = `Subject: ${result.subject}\n\n${result.body}`
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDownload() {
    if (!result) return
    const text = `Subject: ${result.subject}\n\n${result.body}`
    const blob = new Blob([text], { type: 'text/plain' })
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
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Email details</h2>
        <form onSubmit={handleGenerate} className="space-y-5">
          <Textarea
            label="Email purpose *"
            placeholder="e.g. Follow up after a meeting with a potential client about a software project"
            value={form.purpose}
            onChange={e => updateField('purpose', e.target.value)}
            rows={3}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Tone"
              options={TONE_OPTIONS}
              value={form.tone}
              onChange={e => updateField('tone', e.target.value)}
            />
            <Select
              label="Language"
              options={LANGUAGE_OPTIONS}
              value={form.language}
              onChange={e => updateField('language', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Recipient name"
              placeholder="Sarah Johnson"
              value={form.recipientName}
              onChange={e => updateField('recipientName', e.target.value)}
            />
            <Input
              label="Your name"
              placeholder="John Doe"
              value={form.senderName}
              onChange={e => updateField('senderName', e.target.value)}
            />
          </div>

          <Textarea
            label="Key points to include"
            placeholder="e.g. Mention the Q4 budget, ask about timeline, propose a call next week"
            value={form.keyPoints}
            onChange={e => updateField('keyPoints', e.target.value)}
            rows={3}
          />

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <Button type="submit" loading={loading} className="w-full" size="lg">
            <Sparkles className="h-4 w-4" />
            {loading ? 'Generating...' : 'Generate email'}
          </Button>
        </form>
      </div>

      {/* Result */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Generated email</h2>
          {result && (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setResult(null)}>
                <RotateCcw className="h-4 w-4" />
                Clear
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant={copied ? 'secondary' : 'primary'} size="sm" onClick={handleCopy}>
                {copied ? <CheckCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy'}
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
              <p className="text-gray-600 font-medium">Crafting your email...</p>
              <p className="text-sm text-gray-400">This usually takes a few seconds</p>
            </div>
          </div>
        )}

        {!loading && !result && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-3 max-w-xs">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <Sparkles className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Your generated email will appear here.</p>
              <p className="text-sm text-gray-400">Fill in the details on the left and click Generate.</p>
            </div>
          </div>
        )}

        {!loading && result && (
          <div className="flex-1 space-y-4">
            <div className="rounded-lg bg-violet-50 border border-violet-100 px-4 py-3">
              <div className="text-xs font-medium text-violet-500 uppercase tracking-wide mb-1">Subject</div>
              <div className="text-sm font-semibold text-gray-900">{result.subject}</div>
            </div>
            <div className="rounded-lg bg-gray-50 border border-gray-100 px-4 py-4 flex-1">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Body</div>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                {result.body}
              </pre>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={handleCopy} variant={copied ? 'secondary' : 'primary'}>
                {copied ? <CheckCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy email'}
              </Button>
              <Button variant="outline" onClick={handleGenerate} disabled={loading}>
                <RotateCcw className="h-4 w-4" />
                Regenerate
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
