import { useEffect, useState } from 'react'
import styles from './LoadingScreen.module.css'
import CatSprite from '../CatSprite/CatSprite'

const DURATION_MS = 2800

export default function LoadingScreen({ onComplete }) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setDone(true)
      const t2 = setTimeout(onComplete, 800)
      return () => clearTimeout(t2)
    }, DURATION_MS)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <div
      className={`${styles.overlay} texture-parchment ${done ? styles.fadeOut : ''}`}
      role="status"
      aria-label="Loading"
    >
      {/* Walking cat track */}
      <div className={styles.catTrack} aria-hidden="true">
        <div className={styles.walker}>
          <CatSprite variant="walking" size="loading" />
        </div>
      </div>

      {/* Center content: diamonds + loading text + bar */}
      <div className={styles.content}>
        <div className={styles.diamondRow} aria-hidden="true">
          <span className={styles.diamond} style={{ '--i': 0 }}>◆</span>
          <span className={styles.diamond} style={{ '--i': 1 }}>◆</span>
          <span className={styles.diamond} style={{ '--i': 2 }}>◆</span>
        </div>

        <p className={styles.loadingText}>
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

        <div className={styles.barWrap} role="progressbar" aria-label="Loading progress">
          <div className={styles.bar} />
        </div>
      </div>
    </div>
  )
}
