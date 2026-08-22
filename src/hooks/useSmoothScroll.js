import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { setLenis } from '../utils/scroll'

/**
 * Site-wide smooth scrolling. Mounted once from App.
 *
 * Lenis takes over the scroll position, so native `scroll-behavior: smooth`
 * and `scrollIntoView` would fight it — in-page jumps go through
 * utils/scroll.js, which this hook registers the instance with.
 *
 * Sits out entirely under prefers-reduced-motion, where hijacking the
 * scroll is exactly the wrong thing to do.
 */
export function useSmoothScroll() {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })
    lenisRef.current = lenis
    setLenis(lenis)

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      setLenis(null)
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}
