import { useEffect, useState } from 'react'

/**
 * Tracks a media query and keeps tracking it, so a rotation or a resized
 * window re-renders rather than leaving the component on the value it
 * happened to mount with.
 *
 * This is for the cases CSS cannot reach on its own — deciding whether to
 * mount an element at all, rather than how to style one that is already
 * there. A `display: none` video still downloads.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}
