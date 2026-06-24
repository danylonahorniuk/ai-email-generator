import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { LanguageProvider } from '@/lib/i18n/language-context'
import { ToastNotification } from '@/components/ui/toast-notification'
import { SmoothScroll } from '@/components/ui/smooth-scroll'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'QuillAI',
    template: '%s | QuillAI',
  },
  description: 'Generate professional, personalized emails in seconds using AI. Save time, communicate better.',
  keywords: 'AI email generator, email writing, professional emails, AI writing assistant',
  openGraph: {
    title: 'QuillAI — AI Email Generator',
    description: 'Generate professional, personalized emails in seconds using AI.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body className={`${inter.className} antialiased min-h-full flex flex-col`}>
        <LanguageProvider>{children}</LanguageProvider>
        <ToastNotification />
        <SmoothScroll />
      </body>
    </html>
  )
}
