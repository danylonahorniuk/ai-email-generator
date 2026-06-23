'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, X } from 'lucide-react'

export function ToastNotification() {
  const [toast, setToast] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function show() {
      const raw = localStorage.getItem('quillai_toast')
      if (!raw) return
      localStorage.removeItem('quillai_toast')
      setToast(raw)
      setVisible(true)
      setTimeout(() => setVisible(false), 3500)
    }
    show()
    window.addEventListener('quillai_toast', show)
    return () => window.removeEventListener('quillai_toast', show)
  }, [])

  if (!toast || !visible) return null

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-white shadow-xl px-4 py-3 min-w-[220px]">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 flex-none">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
        </div>
        <p className="text-sm font-medium text-gray-800">{toast}</p>
        <button onClick={() => setVisible(false)} className="ml-auto text-gray-400 hover:text-gray-600">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
