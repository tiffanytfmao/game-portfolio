import { useEffect, useRef } from 'react'

/**
 * Writes a 0..1 scroll progress value onto an element as a CSS custom
 * property, so scroll-linked effects can live entirely in CSS.
 *
 * The value is written straight to the DOM node rather than held in React
 * state — this updates every frame while scrolling, and re-rendering the
 * tree that often would be wasteful.
 *
 * @param {React.RefObject<HTMLElement>} ref   element to write the property on
 * @param {number} distance                    px of scroll that maps to 0 -> 1
 * @param {string} prop                        custom property name
 */
export function useScrollProgress(ref, distance, prop = '--progress') {
  const frameRef = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let last = -1

    const update = () => {
      frameRef.current = 0
      const raw = Math.min(1, Math.max(0, window.scrollY / distance))
      // Round before writing: sub-1% changes aren't visible and skipping
      // them avoids a style recalc on nearly every frame.
      const p = Math.round(raw * 100) / 100
      if (p === last) return
      last = p
      el.style.setProperty(prop, String(p))
    }

    const onScroll = () => {
      if (frameRef.current) return
      frameRef.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [ref, distance, prop])
}
