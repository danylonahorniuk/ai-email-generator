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

  const lengthBody: Record<string, string> = {
    short: `I'm reaching out regarding: ${params.purpose}.\n\n${params.keyPoints ? params.keyPoints + '\n\n' : ''}Looking forward to hearing from you.`,
    medium: `I hope you're doing well. I'm reaching out regarding: ${params.purpose}.\n\n${params.keyPoints ? `Here are the key points:\n${params.keyPoints}\n\n` : ''}I'd love to connect further and discuss how we can move forward. Please feel free to reach out at any time.`,
    long: `I hope this message finds you well. I wanted to take a moment to reach out regarding: ${params.purpose}.\n\n${params.keyPoints ? `Here are the key points I wanted to address:\n${params.keyPoints}\n\n` : ''}I believe this is an important matter that deserves our full attention. I'd love to schedule a call or meeting at your earliest convenience to discuss this in more detail.\n\nPlease don't hesitate to reach out if you have any questions or need any additional information. I'm happy to provide whatever is needed.\n\nLooking forward to hearing from you soon.`,
  }

  return {
    subject: `Re: ${params.purpose}`,
    body: `${greeting} ${recipient},\n\n${lengthBody[params.length ?? 'medium']}\n\n${closing},\n${sender}`,
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
