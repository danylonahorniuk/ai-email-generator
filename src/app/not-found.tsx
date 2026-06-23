import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 overflow-hidden">

      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-orange-100 opacity-60 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-orange-50 opacity-80 blur-3xl" />
      </div>

      {/* Giant 404 watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
        <span className="text-[28vw] font-black text-gray-100 leading-none tracking-tighter">404</span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md">

        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Схоже, ця сторінка<br />
          <span className="text-orange-500">загубилась десь у листах</span>
        </h1>

        <p className="text-gray-500 mb-10 leading-relaxed">
          Сторінка яку ви шукаєте не існує або була переміщена. Повертайтесь на головну.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              <Home className="h-4 w-4" /> На головну
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
              <ArrowLeft className="h-4 w-4" /> До дашборду
            </Button>
          </Link>
        </div>

      </div>
    </div>
  )
}
