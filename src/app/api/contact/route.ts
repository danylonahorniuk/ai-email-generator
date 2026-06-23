import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { name, email, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
  }

  if (!process.env.RESEND_API_KEY) {
    // No email service configured — silently succeed
    return NextResponse.json({ success: true })
  }

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: 'QuillAI Contact <onboarding@resend.dev>',
    to: 'danyakenobi@gmail.com',
    subject: `Нове повідомлення від ${name}`,
    text: `Від: ${name} <${email}>\n\n${message}`,
    replyTo: email,
  })

  if (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
