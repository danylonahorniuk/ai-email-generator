import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 mb-6">
          <Mail className="h-8 w-8 text-violet-600" />
        </div>
        <h1 className="text-6xl font-bold text-violet-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Page not found</h2>
        <p className="text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button size="lg">Go back home</Button>
        </Link>
      </div>
    </div>
  )
}
