import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './LoadingScreen.module.css'
import { PillRows, bootMessages, modes, rowKey, formatTime } from '../StatusPill/StatusPill'

const MSG_MS = 420
const HOLD_MS = 450
const FLY_MS = 600
/* Matches the `transform: scale()` the pill is parked at in CSS. */
const SCALE = 1.4

/**
 * The boot sequence: a status pill cycles through a few start-up messages,
 * settles on the real local time, then glides up into its slot in the nav.
 *
 * @param onReveal fired when the pill starts flying, so the page can begin
 *                 fading in underneath it
 * @param onDone   fired once the pill has landed and this can unmount
 */
export default function LoadingScreen({ onReveal, onDone }) {
  const [step, setStep] = useState(0)
  // Captured once, when the pill settles on the clock, rather than read on
  // every render: the two pills have to agree on the string to be the same
  // width when this one lands on the other.
  const [settledTime, setSettledTime] = useState(null)
  const [clear, setClear] = useState(false)
  const pillRef = useRef(null)
  const skipRef = useRef(null)
  const finished = useRef(false)
  const callbacks = useRef({ onReveal, onDone })
  callbacks.current = { onReveal, onDone }

  // Sends the pill to the nav's own pill and hands the page back. Runs once,
  // whether it was reached by the timeline or by the skip control.
  const fly = useCallback(() => {
    if (finished.current) return
    finished.current = true
    setStep(bootMessages.length)
    setSettledTime(t => t ?? formatTime())

    const pill = pillRef.current
    const target = [...document.querySelectorAll('[data-status-pill]')]
      .find(el => el.offsetParent !== null)

    if (pill && target) {
      const t = target.getBoundingClientRect()
      const s = pill.getBoundingClientRect()
      // Measured off height, and translated from the overlay's centre
      // rather than the pill's own box: the pill's width may still be
      // animating toward the settled line when the flight starts, and a
      // stale width would throw both the scale and the landing point off.
      // Height never animates, and the pill is centred in the overlay, so
      // both of these are stable. Identical rows on both pills means this
      // comes out at 1 — the pill only sheds its oversized start.
      const scale = (SCALE * t.height) / s.height
      const from = pill.parentElement.getBoundingClientRect()
      const cx = from.left + from.width / 2
      const cy = from.top + from.height / 2
      // Cross-fade at the tail: the real pill is fully faded in by the time
      // this one touches down, so the swap is never a hard cut.
      pill.style.transition =
        `transform ${FLY_MS}ms var(--ease-out), ` +
        `opacity 200ms var(--ease-smooth) ${FLY_MS - 180}ms`
      pill.style.opacity = '0'
      pill.style.transform =
        `translate(${t.left + t.width / 2 - cx}px, ` +
        `${t.top + t.height / 2 - cy}px) ` +
        `scale(${scale})`
    } else if (pill) {
      // No pill in the nav to fly to (narrow viewports hide it). Fading is
      // the honest ending — better than leaving it parked mid-screen.
      pill.style.transition = `opacity ${FLY_MS}ms var(--ease-smooth)`
      pill.style.opacity = '0'
    }

    setClear(true)
    callbacks.current.onReveal()
    setTimeout(() => callbacks.current.onDone(), FLY_MS + 80)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Nothing here is information — under reduced motion the boot sequence
      // sits out entirely rather than playing faster.
      const t = setTimeout(fly, 200)
      return () => clearTimeout(t)
    }
    const timers = bootMessages
      .map((_, i) => (i > 0 ? setTimeout(() => setStep(i), i * MSG_MS) : null))
      .filter(Boolean)
    // Settle on the real pill content (local time) before flying.
    const timeAt = bootMessages.length * MSG_MS
    timers.push(setTimeout(() => {
      setStep(bootMessages.length)
      setSettledTime(formatTime())
    }, timeAt))
    timers.push(setTimeout(fly, timeAt + HOLD_MS))
    return () => timers.forEach(clearTimeout)
  }, [fly])

  // WCAG 2.2.1: the loader holds the page, so it needs a way out. Escape or
  // the skip button ends it, and the button takes first focus.
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' || e.key === 'Enter') fly() }
    window.addEventListener('keydown', onKey)
    skipRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [fly])

  // Both pills stack the same rows, so this one is already the nav pill's
  // exact size — the flight is a move, never a resize.
  const active = step < bootMessages.length ? bootMessages[step] : modes[0]

  return (
    <div
      className={`${styles.overlay} ${clear ? styles.clear : ''}`}
      role="status"
      aria-label="Loading"
    >
      <button ref={skipRef} className={styles.skip} onClick={fly}>
        Skip intro
      </button>

      <div ref={pillRef} className={styles.pill}>
        <span className={styles.dot} aria-hidden="true" />
        <PillRows activeKey={rowKey(active)} time={settledTime ?? formatTime()} styles={styles} />
      </div>
    </div>
  )
}
