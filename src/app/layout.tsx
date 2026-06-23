import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { LanguageProvider } from '@/lib/i18n/language-context'
import { ToastNotification } from '@/components/ui/toast-notification'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QuillAI — AI-Powered Email Generator',
  description: 'Generate professional, personalized emails in seconds using AI. Save time, communicate better.',
  keywords: 'AI email generator, email writing, professional emails, AI writing assistant',
  openGraph: {
    title: 'QuillAI — AI-Powered Email Generator',
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
      </body>
    </html>
  )
}
