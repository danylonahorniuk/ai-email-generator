export interface EmailGenerationParams {
  tone: 'professional' | 'friendly' | 'formal' | 'casual'
  length: 'short' | 'medium' | 'long'
  purpose: string
  recipientName?: string
  senderName?: string
  keyPoints?: string
  language?: string
}

export interface GeneratedEmail {
  subject: string
  body: string
}

const MOCK_EMAILS: Record<string, GeneratedEmail> = {
  default: {
    subject: 'Following Up on Our Recent Discussion',
    body: `Dear [Recipient],

I hope this message finds you well. I wanted to follow up on our recent discussion and share a few key points that I believe will be valuable for our collaboration.

First, I'd like to express my appreciation for the time you've dedicated to this matter. Your insights have been incredibly helpful in shaping our approach.

Moving forward, I propose we schedule a brief call to align on next steps and ensure we're both on the same page. I'm available at your convenience and can adapt to your schedule.

Please don't hesitate to reach out if you have any questions or if there's anything additional I can provide.

Looking forward to hearing from you.

Best regards,
[Your Name]`,
  },
}

async function generateWithClaude(params: EmailGenerationParams): Promise<GeneratedEmail> {
  const Anthropic = (await import('@anthropic-ai/sdk')).default
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const lengthGuide = { short: '3-5 sentences', medium: '2-3 paragraphs', long: '4-5 paragraphs' }

  const prompt = `Generate a ${params.tone} email for the following purpose: ${params.purpose}.
${params.recipientName ? `Recipient: ${params.recipientName}` : ''}
${params.senderName ? `Sender: ${params.senderName}` : ''}
${params.keyPoints ? `Key points to include: ${params.keyPoints}` : ''}
Length: ${lengthGuide[params.length ?? 'medium']}
${params.language ? `Language: ${params.language}` : 'Language: English'}

Respond with a JSON object containing:
- "subject": the email subject line
- "body": the full email body

Only respond with the JSON object, no extra text.`

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response type')

  const cleaned = content.text.replace(/```json\n?|\n?```/g, '').trim()
  return JSON.parse(cleaned) as GeneratedEmail
}

const MOCK_TEMPLATES: Record<string, {
  greetings: Record<string, string>
  closings: Record<string, string>
  short: (purpose: string, keyPoints?: string) => string
  medium: (purpose: string, keyPoints?: string) => string
  long: (purpose: string, keyPoints?: string) => string
  subject: (purpose: string) => string
}> = {
  Ukrainian: {
    greetings: { professional: 'Шановний/а', friendly: 'Привіт', formal: 'Вельмишановний/а', casual: 'Гей' },
    closings: { professional: 'З повагою', friendly: 'До зустрічі', formal: 'З найщирішою повагою', casual: 'Дякую' },
    subject: (p) => `Щодо: ${p}`,
    short: (p, k) => `Звертаюся до вас з приводу: ${p}.\n\n${k ? k + '\n\n' : ''}Очікую на вашу відповідь.`,
    medium: (p, k) => `Сподіваюся, у вас все добре. Пишу щодо: ${p}.\n\n${k ? `Ключові моменти:\n${k}\n\n` : ''}Буду радий/а обговорити деталі та рухатися вперед разом. Звертайтеся будь-коли.`,
    long: (p, k) => `Сподіваюся, цей лист застане вас у доброму здоров'ї. Хочу звернутися з приводу: ${p}.\n\n${k ? `Ключові моменти:\n${k}\n\n` : ''}Вважаю, що це питання заслуговує на особливу увагу. Буду радий/а організувати дзвінок або зустріч у зручний для вас час.\n\nЯкщо у вас виникнуть запитання або знадобиться додаткова інформація — будь ласка, не соромтеся звертатися.\n\nЧекаю на вашу відповідь.`,
  },
  English: {
    greetings: { professional: 'Dear', friendly: 'Hi', formal: 'Dear', casual: 'Hey' },
    closings: { professional: 'Best regards', friendly: 'Cheers', formal: 'Yours sincerely', casual: 'Thanks' },
    subject: (p) => `Re: ${p}`,
    short: (p, k) => `I'm reaching out regarding: ${p}.\n\n${k ? k + '\n\n' : ''}Looking forward to hearing from you.`,
    medium: (p, k) => `I hope you're doing well. I'm reaching out regarding: ${p}.\n\n${k ? `Here are the key points:\n${k}\n\n` : ''}I'd love to connect further and discuss how we can move forward. Please feel free to reach out at any time.`,
    long: (p, k) => `I hope this message finds you well. I wanted to reach out regarding: ${p}.\n\n${k ? `Key points:\n${k}\n\n` : ''}I believe this matter deserves our full attention. I'd love to schedule a call at your earliest convenience.\n\nPlease don't hesitate to reach out if you have any questions.\n\nLooking forward to hearing from you soon.`,
  },
  Russian: {
    greetings: { professional: 'Уважаемый/ая', friendly: 'Привет', formal: 'Глубокоуважаемый/ая', casual: 'Эй' },
    closings: { professional: 'С уважением', friendly: 'До встречи', formal: 'С искренним уважением', casual: 'Спасибо' },
    subject: (p) => `По поводу: ${p}`,
    short: (p, k) => `Обращаюсь к вам по вопросу: ${p}.\n\n${k ? k + '\n\n' : ''}Жду вашего ответа.`,
    medium: (p, k) => `Надеюсь, у вас всё хорошо. Пишу по поводу: ${p}.\n\n${k ? `Ключевые моменты:\n${k}\n\n` : ''}Буду рад/а обсудить детали и двигаться вперёд вместе. Обращайтесь в любое время.`,
    long: (p, k) => `Надеюсь, это письмо застанет вас в добром здравии. Хочу обратиться по вопросу: ${p}.\n\n${k ? `Ключевые моменты:\n${k}\n\n` : ''}Считаю, что этот вопрос заслуживает особого внимания. Буду рад/а организовать звонок в удобное для вас время.\n\nЕсли у вас возникнут вопросы — пожалуйста, не стесняйтесь обращаться.\n\nЖду вашего ответа.`,
  },
}

function generateMock(params: EmailGenerationParams): GeneratedEmail {
  const lang = params.language && MOCK_TEMPLATES[params.language] ? params.language : 'Ukrainian'
  const t = MOCK_TEMPLATES[lang]

  const recipient = params.recipientName || (lang === 'Ukrainian' ? '[Отримувач]' : lang === 'Russian' ? '[Получатель]' : '[Recipient]')
  const sender = params.senderName || (lang === 'Ukrainian' ? '[Ваше ім\'я]' : lang === 'Russian' ? '[Ваше имя]' : '[Your Name]')
  const greeting = t.greetings[params.tone] || t.greetings.professional
  const closing = t.closings[params.tone] || t.closings.professional

  const length = params.length ?? 'medium'
  const body = t[length](params.purpose, params.keyPoints)

  return {
    subject: t.subject(params.purpose),
    body: `${greeting} ${recipient},\n\n${body}\n\n${closing},\n${sender}`,
  }
}

export async function generateEmail(params: EmailGenerationParams): Promise<GeneratedEmail> {
  const mode = process.env.AI_MODE ?? 'mock'

  if (mode === 'claude') {
    return generateWithClaude(params)
  }

  // Simulate a short delay in mock mode to feel realistic
  await new Promise(r => setTimeout(r, 800))
  return generateMock(params)
}
