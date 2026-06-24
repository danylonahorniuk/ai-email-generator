import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const alt = 'QuillAI — AI генератор листів'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  const logoData = fs.readFileSync(path.join(process.cwd(), 'public', 'logo.png'))
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 50%, #f9fafb 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Background decoration */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'rgba(251, 146, 60, 0.08)', display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'rgba(251, 146, 60, 0.05)', display: 'flex',
        }} />

        {/* Logo circle */}
        <div style={{
          width: '96px', height: '96px', borderRadius: '50%',
          border: '3px solid #ea580c', background: '#ffffff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '28px', boxShadow: '0 4px 24px rgba(234,88,12,0.15)',
          overflow: 'hidden',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoBase64} width={128} height={128} style={{ transform: 'scale(1.5)', objectFit: 'contain' }} alt="" />
        </div>

        {/* Brand name */}
        <div style={{
          fontSize: '64px', fontWeight: '800', letterSpacing: '-1px',
          marginBottom: '20px', display: 'flex',
        }}>
          <span style={{ color: '#111827' }}>Quill</span>
          <span style={{ color: '#ea580c' }}>AI</span>
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: '28px', color: '#6b7280', fontWeight: '400',
          textAlign: 'center', maxWidth: '700px', lineHeight: '1.4',
          marginBottom: '40px',
        }}>
          Генеруйте професійні листи за секунди за допомогою AI
        </div>

        {/* Badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: '#fff7ed', border: '1px solid #fed7aa',
          borderRadius: '100px', padding: '10px 24px',
        }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#ea580c', display: 'flex',
          }} />
          <span style={{ color: '#ea580c', fontSize: '18px', fontWeight: '600' }}>
            Безкоштовно — без банківської картки
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
