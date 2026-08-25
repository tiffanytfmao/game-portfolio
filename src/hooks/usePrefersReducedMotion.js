import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Tracks the OS "reduce motion" setting, and keeps tracking it — the value
 * can change while the page is open, and a looping video that started before
 * the user flipped the switch should stop.
 *
 * CSS handles animations and transitions globally in index.css; this is for
 * the motion CSS cannot reach: autoplaying video, canvas loops, and
 * JS-driven scroll.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches
  )

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
