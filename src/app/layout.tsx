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
  description: 'Генеруйте професійні персоналізовані листи за секунди за допомогою AI. Економте час, спілкуйтесь краще.',
  keywords: 'AI генератор листів, написання листів, професійні листи, AI асистент',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'QuillAI — AI генератор листів',
    description: 'Генеруйте професійні персоналізовані листи за секунди за допомогою AI.',
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
