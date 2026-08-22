import { useEffect, useRef } from 'react'
import styles from './PawTrail.module.css'

// Distance between stamps, in px of cursor travel. Throttling on distance
// rather than on time keeps the spacing even whether the cursor is being
// flicked across the page or crept along.
const STEP_DISTANCE = 90
const LIFETIME_MS   = 1500
const MAX_PAWS      = 24

// 1 large pad + 3 toes, drawn pointing "up" so a rotation of
// (travel angle + 90deg) turns the print to face the direction of travel.
const PAW_SVG =
  '<svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor" aria-hidden="true">' +
  '<ellipse cx="8" cy="14" rx="4.5" ry="3.5"/>' +
  '<circle cx="3" cy="8" r="2"/>' +
  '<circle cx="8" cy="6" r="2.2"/>' +
  '<circle cx="13" cy="8" r="2"/>' +
  '</svg>'

export default function PawTrail() {
  const layerRef = useRef(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return

    // Touch pointers have no hover state to trail, and the effect is
    // motion-heavy enough to sit out of a reduced-motion session.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let lastX = null
    let lastY = null
    // Alternate the lateral offset so consecutive prints land left, right,
    // left of the travel line — a walk rather than a single smeared path.
    let side = 1
    const live = []

    const spawn = (x, y, angleDeg) => {
      const el = document.createElement('span')
      el.className = styles.paw
      el.innerHTML = PAW_SVG

      const scale = 0.85 + Math.random() * 0.4
      const wobble = (Math.random() - 0.5) * 18

      el.style.left = `${x}px`
      el.style.top = `${y}px`
      el.style.setProperty('--life', `${LIFETIME_MS}ms`)
      el.style.transform =
        `translate(-50%, -50%) rotate(${angleDeg + 90 + wobble}deg) scale(${scale})`

      layer.appendChild(el)
      live.push(el)

      // Hard cap: drop the oldest rather than letting a fast cursor pile up
      // hundreds of animating nodes.
      while (live.length > MAX_PAWS) live.shift()?.remove()

      setTimeout(() => {
        el.remove()
        const i = live.indexOf(el)
        if (i !== -1) live.splice(i, 1)
      }, LIFETIME_MS)
    }

    const onMove = (e) => {
      const { clientX: x, clientY: y } = e

      if (lastX === null) {
        lastX = x
        lastY = y
        return
      }

      const dx = x - lastX
      const dy = y - lastY
      const dist = Math.hypot(dx, dy)
      if (dist < STEP_DISTANCE) return

      lastX = x
      lastY = y

      // Over links and buttons the sparkle emitter in App.jsx takes over, so
      // the two effects hand off instead of stacking on the same pixels.
      const target = e.target
      if (target?.closest?.('a, button, [role="button"], [role="tab"], input, select')) return

      const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI
      // Offset perpendicular to travel so prints straddle the path.
      const nx = -dy / dist
      const ny = dx / dist
      const offset = 7 * side
      side *= -1

      spawn(x + nx * offset, y + ny * offset, angleDeg)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      live.forEach(el => el.remove())
    }
  }, [])

  return <div className={styles.layer} ref={layerRef} aria-hidden="true" />
}
