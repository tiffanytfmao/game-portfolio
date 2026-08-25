import { useEffect, useState, useCallback, useRef } from 'react'
import styles from './LoadingScreen.module.css'
import CatSprite from '../CatSprite/CatSprite'

const DURATION_MS = 2800
/* The walking cat is an animation for its own sake, not a real progress
   indicator. Anyone who has asked for reduced motion gets a token pause
   instead of the full performance. */
const REDUCED_DURATION_MS = 300

export default function LoadingScreen({ onComplete }) {
  const [done, setDone] = useState(false)
  const finished = useRef(false)
  const skipRef = useRef(null)

  const finish = useCallback(() => {
    if (finished.current) return
    finished.current = true
    setDone(true)
    setTimeout(onComplete, 800)
  }, [onComplete])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = setTimeout(finish, reduced ? REDUCED_DURATION_MS : DURATION_MS)
    return () => clearTimeout(t)
  }, [finish])

  // WCAG 2.2.1: a timed hold on the content needs a way out. Escape or the
  // skip button dismisses it; the button also takes first focus so a
  // keyboard user reaches it without hunting.
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' || e.key === 'Enter') finish() }
    window.addEventListener('keydown', onKey)
    skipRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [finish])

  return (
    <div
      className={`${styles.overlay} ${done ? styles.fadeOut : ''}`}
      role="status"
      aria-live="polite"
    >
      <button ref={skipRef} className={styles.skip} onClick={finish}>
        Skip intro
      </button>

      {/* Walking cat track */}
      <div className={styles.catTrack} aria-hidden="true">
        <div className={styles.walker}>
          <CatSprite variant="walking" size="loading" />
        </div>
      </div>

      {/* Center content: diamonds + loading text + bar */}
      <div className={styles.content}>
        <div className={styles.diamondRow} aria-hidden="true">
          <span className={styles.diamond} style={{ '--i': 0 }} aria-hidden="true">◆</span>
          <span className={styles.diamond} style={{ '--i': 1 }} aria-hidden="true">◆</span>
          <span className={styles.diamond} style={{ '--i': 2 }} aria-hidden="true">◆</span>
        </div>

        <p className={styles.loadingText} aria-hidden="true">
          {'Loading'.split('').map((ch, i) => (
            <span key={i} className={styles.loadingChar} style={{ '--i': i }}>
              {ch}
            </span>
          ))}
          <span className={styles.ellipsis}>
            <span style={{ '--d': '0s' }}>.</span>
            <span style={{ '--d': '0.2s' }}>.</span>
            <span style={{ '--d': '0.4s' }}>.</span>
          </span>
        </p>
        {/* Split into per-letter spans above, which screen readers spell out
            one character at a time. This is the version they read. */}
        <span className="visually-hidden">Loading</span>

        <div className={styles.barWrap} aria-hidden="true">
          <div className={styles.bar} />
        </div>
      </div>
    </div>
  )
}
