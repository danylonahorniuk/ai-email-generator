import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateEmail, type EmailGenerationParams } from '@/lib/ai/generate-email'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { purpose, tone, recipientName, senderName, keyPoints, language } = body

    if (!purpose?.trim()) {
      return NextResponse.json({ error: 'Email purpose is required' }, { status: 400 })
    }

    const validTones = ['professional', 'friendly', 'formal', 'casual']
    if (!validTones.includes(tone)) {
      return NextResponse.json({ error: 'Invalid tone value' }, { status: 400 })
    }

    const params: EmailGenerationParams = {
      purpose: purpose.trim(),
      tone,
      recipientName: recipientName?.trim(),
      senderName: senderName?.trim(),
      keyPoints: keyPoints?.trim(),
      language: language || 'English',
    }

    const email = await generateEmail(params)
    return NextResponse.json(email)
  } catch (error) {
    console.error('Email generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate email. Please try again.' },
      { status: 500 }
    )
  }
}
