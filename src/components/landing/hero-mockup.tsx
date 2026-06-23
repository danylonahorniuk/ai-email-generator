'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ArrowRight, Copy, RefreshCw, Wand2, Scissors, CheckCircle2, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'

const SCENARIOS = [
  {
    idea: 'Написати follow-up клієнту після дзвінка. Згадати про пропозицію і запитати чи є питання.',
    tone: 'Професійний',
    lang: 'Українська',
    length: 'Короткий',
    purpose: 'Подальший контакт',
    subject: 'Після нашої розмови',
    body: 'Привіт, Саро!\n\nДякую що знайшли час поспілкуватись сьогодні. Прикріплюю пропозицію, про яку ми говорили. Дайте знати, якщо є запитання або якщо я можу щось уточнити.\n\nЗ повагою,\nАлекс',
  },
  {
    idea: 'Попросити колегу про фідбек по презентації до п\'ятниці. Потрібна думка по структурі і слайдам.',
    tone: 'Дружній',
    lang: 'Українська',
    length: 'Короткий',
    purpose: 'Прохання',
    subject: 'Невелике прохання',
    body: 'Привіт, Максе!\n\nЧи є у тебе 15 хвилин переглянути презентацію до п\'ятниці? Буду дуже вдячний за будь-який фідбек по структурі і слайдам.\n\nДякую,\nОлена',
  },
  {
    idea: 'Написати рекрутеру після співбесіди. Подякувати і підтвердити інтерес до вакансії.',
    tone: 'Офіційний',
    lang: 'Українська',
    length: 'Середній',
    purpose: 'Подяка',
    subject: 'Дякую за зустріч',
    body: 'Доброго дня, Ірино!\n\nДякую за можливість поспілкуватись вчора. Мені дуже сподобалась команда і проєкт — підтверджую свій інтерес до позиції.\n\nЗ повагою,\nДанило',
  },
  {
    idea: 'Нагадати партнеру про дедлайн по договору. Ввічливо, але чітко.',
    tone: 'Нейтральний',
    lang: 'Українська',
    length: 'Короткий',
    purpose: 'Нагадування',
    subject: 'Нагадування щодо договору',
    body: 'Доброго дня, Андрію!\n\nХочу нагадати, що дедлайн підписання договору — п\'ятниця, 27 червня. Будь ласка, дайте знати якщо є питання або потрібен додатковий час.\n\nДякую,\nВіктор',
  },
  {
    idea: 'Привітати клієнта з успішним запуском проєкту. Висловити радість і запропонувати подальшу співпрацю.',
    tone: 'Дружній',
    lang: 'Українська',
    length: 'Короткий',
    purpose: 'Привітання',
    subject: 'Вітаємо з запуском! 🎉',
    body: 'Привіт, Наталко!\n\nЩиро вітаємо з успішним запуском! Це великий крок і ви молодці. Якщо знадобиться допомога на наступному етапі — ми завжди поруч.\n\nЗ повагою,\nКоманда QuillAI',
  },
  {
    idea: 'Написати холодний лист потенційному інвестору. Коротко про продукт і запросити на дзвінок.',
    tone: 'Професійний',
    lang: 'English',
    length: 'Середній',
    purpose: 'Холодний контакт',
    subject: 'Quick intro — AI email tool',
    body: 'Hi Michael,\n\nI\'m building QuillAI — an AI email generator that helps teams write professional emails 10x faster. We\'ve got 200+ users after 2 weeks.\n\nWould love to show you a quick demo. Do you have 15 minutes this week?\n\nBest,\nDanylo',
  },
]

type Phase = 'typing-idea' | 'generating' | 'typing-email' | 'reading' | 'erasing-email' | 'erasing-idea'

function sleep(ms: number) {
  return new Promise<void>(r => setTimeout(r, ms))
}

export function HeroMockup() {
  const { t } = useLanguage()
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing-idea')
  const [ideaLen, setIdeaLen] = useState(0)
  const [emailLen, setEmailLen] = useState(0)
  const [dots, setDots] = useState('')

  const sc = SCENARIOS[idx]

  useEffect(() => {
    let alive = true

    async function run() {
      const sc = SCENARIOS[idx]

      setPhase('typing-idea')
      setIdeaLen(0)
      setEmailLen(0)

      // Type idea
      for (let i = 1; i <= sc.idea.length; i++) {
        if (!alive) return
        setIdeaLen(i)
        await sleep(28)
      }

      if (!alive) return
      await sleep(500)

      // Generating animation
      setPhase('generating')
      await sleep(2200)
      if (!alive) return

      // Type email body
      setPhase('typing-email')
      for (let i = 1; i <= sc.body.length; i++) {
        if (!alive) return
        setEmailLen(i)
        await sleep(18)
      }

      if (!alive) return

      // Reading pause
      setPhase('reading')
      await sleep(2800)
      if (!alive) return

      // Erase email
      setPhase('erasing-email')
      for (let i = sc.body.length; i >= 0; i--) {
        if (!alive) return
        setEmailLen(i)
        await sleep(8)
      }

      if (!alive) return
      await sleep(250)

      // Erase idea
      setPhase('erasing-idea')
      for (let i = sc.idea.length; i >= 0; i--) {
        if (!alive) return
        setIdeaLen(i)
        await sleep(8)
      }

      if (!alive) return
      await sleep(400)

      setIdx(prev => (prev + 1) % SCENARIOS.length)
    }

    run()
    return () => { alive = false }
  }, [idx])

  // Animated dots during generating
  useEffect(() => {
    if (phase !== 'generating') return
    let count = 0
    const interval = setInterval(() => {
      count = (count + 1) % 4
      setDots('.'.repeat(count))
    }, 380)
    return () => clearInterval(interval)
  }, [phase])

  const ideaText = sc.idea.slice(0, ideaLen)
  const emailBodyText = sc.body.slice(0, emailLen)
  const isGenerating = phase === 'generating'
  const isTypingIdea = phase === 'typing-idea' || phase === 'erasing-idea'
  const isTypingEmail = phase === 'typing-email' || phase === 'erasing-email'
  const showEmailContent = phase === 'typing-email' || phase === 'reading' || (phase === 'erasing-email' && emailLen > 0)

  return (
    <div className="relative hidden lg:flex items-start gap-4">

      {/* Idea card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-md p-5 flex-1">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-gray-800">{t.hero.previewYourIdea}</span>
          <span className="text-[11px] text-gray-400">{ideaLen}/300</span>
        </div>
        <div className="rounded-xl bg-gray-50 border border-gray-100 p-3.5 text-[13px] text-gray-500 leading-relaxed mb-4 min-h-[96px]">
          {ideaText || <span className="text-gray-300">Опишіть ситуацію...</span>}
          {isTypingIdea && <span className="animate-pulse text-orange-500 font-light">|</span>}
        </div>
        {[
          [t.hero.previewTone, sc.tone],
          ['Мова', sc.lang],
          ['Довжина', sc.length],
          [t.hero.previewPurpose, sc.purpose],
        ].map(([label, val]) => (
          <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
            <span className="text-xs text-gray-400">{label}</span>
            <span className="text-xs text-gray-700 font-medium flex items-center gap-1">
              {val} <ChevronDown className="h-3 w-3" />
            </span>
          </div>
        ))}
        <button className={`mt-4 w-full rounded-xl text-white text-sm font-medium py-2.5 flex items-center justify-center gap-2 transition-all ${isGenerating ? 'bg-orange-400 cursor-wait' : 'bg-orange-600'}`}>
          {isGenerating ? `Генерується${dots}` : t.hero.previewGenerateBtn}
          {!isGenerating && <ArrowRight className="h-4 w-4" />}
        </button>
      </div>

      {/* Sparkle button between cards */}
      <div className="flex-none self-center -mx-2 z-10">
        <div className={`h-11 w-11 rounded-full bg-orange-500 shadow-lg flex items-center justify-center transition-all duration-300 ${isGenerating ? 'animate-pulse scale-110' : ''}`}>
          <Sparkles className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Result card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-md p-5 flex-1 relative">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-gray-800">{t.hero.previewYourEmail}</span>
          {showEmailContent ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-[11px] font-medium text-green-700">
              <CheckCircle2 className="h-3 w-3" /> Готово до відправки
            </span>
          ) : isGenerating ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-[11px] font-medium text-orange-600">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse inline-block" /> Генерується{dots}
            </span>
          ) : null}
        </div>

        {isGenerating ? (
          <div className="space-y-2.5 mt-1">
            <div className="h-2.5 w-1/2 rounded-full bg-gray-100 animate-pulse" />
            <div className="h-2.5 w-full rounded-full bg-gray-100 animate-pulse" style={{ animationDelay: '0.1s' }} />
            <div className="h-2.5 w-5/6 rounded-full bg-gray-100 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="h-2.5 w-full rounded-full bg-gray-100 animate-pulse" style={{ animationDelay: '0.15s' }} />
            <div className="h-2.5 w-3/4 rounded-full bg-gray-100 animate-pulse" style={{ animationDelay: '0.25s' }} />
            <div className="h-2.5 w-2/3 rounded-full bg-gray-100 animate-pulse" style={{ animationDelay: '0.05s' }} />
          </div>
        ) : showEmailContent ? (
          <>
            <div className="text-xs font-semibold text-gray-800 mb-3">
              {t.hero.previewSubject}: {sc.subject}
            </div>
            <div className="text-[13px] text-gray-500 leading-relaxed whitespace-pre-line">
              {emailBodyText}
              {isTypingEmail && <span className="animate-pulse text-orange-500 font-light">|</span>}
            </div>
          </>
        ) : (
          <div className="space-y-2.5 mt-1 opacity-15">
            <div className="h-2.5 w-1/2 rounded-full bg-gray-300" />
            <div className="h-2.5 w-full rounded-full bg-gray-300" />
            <div className="h-2.5 w-5/6 rounded-full bg-gray-300" />
            <div className="h-2.5 w-full rounded-full bg-gray-300" />
            <div className="h-2.5 w-3/4 rounded-full bg-gray-300" />
            <div className="h-2.5 w-2/3 rounded-full bg-gray-300" />
          </div>
        )}

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
  )
}
