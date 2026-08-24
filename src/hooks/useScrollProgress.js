import { useEffect, useRef } from 'react'

/**
 * Writes a 0..1 scroll progress value onto an element as a CSS custom
 * property, so scroll-linked effects can live entirely in CSS.
 *
 * The value is written straight to the DOM node rather than held in React
 * state — this updates every frame while scrolling, and re-rendering the
 * tree that often would be wasteful.
 *
 * @param {React.RefObject<HTMLElement>} ref  element to write the property on
 * @param {number|() => number} distance      px of scroll that maps to 0 -> 1.
 *   Pass a function when the value depends on viewport size: it is re-read on
 *   every update, so a resize cannot leave a stale distance behind.
 * @param {string} prop                       custom property name
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

      // A zero or absent distance would make this 0/0 -> NaN, which CSS
      // then propagates into transform: scale(NaN) and collapses the
      // element to nothing. Fall back to a full viewport, and treat any
      // non-finite result as "not scrolled yet".
      const d = typeof distance === 'function' ? distance() : distance
      const span = Number.isFinite(d) && d > 0 ? d : (window.innerHeight || 1)

      const raw = window.scrollY / span
      const clamped = Number.isFinite(raw) ? Math.min(1, Math.max(0, raw)) : 0

      // Round before writing: sub-1% changes aren't visible and skipping
      // them avoids a style recalc on nearly every frame.
      const p = Math.round(clamped * 100) / 100
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
