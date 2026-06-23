'use client'

import { useEffect } from 'react'

function easeInOutQuart(t: number) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
}

function scrollTo(el: HTMLElement, duration = 1000) {
  const navbarHeight = 80
  const start = window.scrollY
  const target = el.getBoundingClientRect().top + window.scrollY - navbarHeight
  const distance = target - start
  let startTime: number | null = null

  function step(now: number) {
    if (!startTime) startTime = now
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, start + distance * easeInOutQuart(progress))
    if (elapsed < duration) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

export function SmoothScroll() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href') ?? ''

      // Лого — скрол на самий верх якщо вже на головній
      if (href === '/' && window.location.pathname === '/') {
        e.preventDefault()
        const start = window.scrollY
        let startTime: number | null = null
        function toTop(now: number) {
          if (!startTime) startTime = now
          const elapsed = now - startTime
          const progress = Math.min(elapsed / 1000, 1)
          window.scrollTo(0, start * (1 - easeInOutQuart(progress)))
          if (elapsed < 1000) requestAnimationFrame(toTop)
        }
        requestAnimationFrame(toTop)
        return
      }

      const hashIdx = href.indexOf('#')
      if (hashIdx === -1) return
      const id = href.slice(hashIdx + 1)
      if (!id) return
      const path = href.slice(0, hashIdx)
      if (path && path !== window.location.pathname) return
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      scrollTo(el, 1000)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
