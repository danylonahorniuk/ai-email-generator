import { describe, it, expect, vi, beforeEach } from 'vitest'
import { generateEmail, type EmailGenerationParams } from './generate-email'

const baseParams: EmailGenerationParams = {
  purpose: 'Follow up after a meeting',
  tone: 'professional',
  length: 'medium',
  language: 'English',
}

beforeEach(() => {
  vi.stubEnv('AI_MODE', 'mock')
})

describe('generateEmail — mock mode', () => {
  it('returns subject and body', async () => {
    const result = await generateEmail(baseParams)
    expect(result).toHaveProperty('subject')
    expect(result).toHaveProperty('body')
    expect(typeof result.subject).toBe('string')
    expect(typeof result.body).toBe('string')
    expect(result.subject.length).toBeGreaterThan(0)
    expect(result.body.length).toBeGreaterThan(0)
  })

  it('includes recipient name in body when provided', async () => {
    const result = await generateEmail({ ...baseParams, recipientName: 'Olena' })
    expect(result.body).toContain('Olena')
  })

  it('includes sender name in body when provided', async () => {
    const result = await generateEmail({ ...baseParams, senderName: 'Danylo' })
    expect(result.body).toContain('Danylo')
  })
})

describe('generateEmail — languages', () => {
  it('generates Ukrainian email', async () => {
    const result = await generateEmail({ ...baseParams, language: 'Ukrainian', recipientName: 'Олена' })
    expect(result.body).toContain('Олена')
    expect(result.subject).toBeTruthy()
  })

  it('generates English email', async () => {
    const result = await generateEmail({ ...baseParams, language: 'English' })
    expect(result.subject).toMatch(/Re:|re:/i)
    expect(result.body).toBeTruthy()
  })

  it('generates Russian email', async () => {
    const result = await generateEmail({ ...baseParams, language: 'Russian', recipientName: 'Андрей' })
    expect(result.body).toContain('Андрей')
    expect(result.subject).toBeTruthy()
  })

  it('falls back to Ukrainian for unknown language', async () => {
    const result = await generateEmail({ ...baseParams, language: 'French' })
    expect(result.subject).toBeTruthy()
    expect(result.body).toBeTruthy()
  })
})

describe('generateEmail — tones', () => {
  const tones = ['professional', 'friendly', 'formal', 'casual'] as const

  for (const tone of tones) {
    it(`generates ${tone} tone`, async () => {
      const result = await generateEmail({ ...baseParams, tone })
      expect(result.body).toBeTruthy()
      expect(result.subject).toBeTruthy()
    })
  }
})

describe('generateEmail — lengths', () => {
  it('short email is shorter than long email', async () => {
    const short = await generateEmail({ ...baseParams, length: 'short' })
    const long = await generateEmail({ ...baseParams, length: 'long' })
    expect(short.body.length).toBeLessThan(long.body.length)
  })

  it('generates medium length', async () => {
    const result = await generateEmail({ ...baseParams, length: 'medium' })
    expect(result.body).toBeTruthy()
  })
})
