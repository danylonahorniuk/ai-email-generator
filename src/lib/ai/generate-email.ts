export interface EmailGenerationParams {
  tone: 'professional' | 'friendly' | 'formal' | 'casual'
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

  const prompt = `Generate a ${params.tone} email for the following purpose: ${params.purpose}.
${params.recipientName ? `Recipient: ${params.recipientName}` : ''}
${params.senderName ? `Sender: ${params.senderName}` : ''}
${params.keyPoints ? `Key points to include: ${params.keyPoints}` : ''}
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

function generateMock(params: EmailGenerationParams): GeneratedEmail {
  const toneGreetings: Record<string, string> = {
    professional: 'Dear',
    friendly: 'Hi',
    formal: 'Dear',
    casual: 'Hey',
  }
  const toneClosings: Record<string, string> = {
    professional: 'Best regards',
    friendly: 'Cheers',
    formal: 'Yours sincerely',
    casual: 'Thanks',
  }

  const recipient = params.recipientName || '[Recipient]'
  const sender = params.senderName || '[Your Name]'
  const greeting = toneGreetings[params.tone] || 'Dear'
  const closing = toneClosings[params.tone] || 'Best regards'

  return {
    subject: `Re: ${params.purpose}`,
    body: `${greeting} ${recipient},

I hope you're doing well. I'm reaching out regarding: ${params.purpose}.

${params.keyPoints ? `Here are the key points I wanted to address:\n${params.keyPoints}\n` : ''}
I'd love to connect further and discuss how we can move forward together. Please feel free to reach out at any time.

${closing},
${sender}`,
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
