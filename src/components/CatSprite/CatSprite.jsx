import { useEffect, useRef, useState, useCallback } from 'react'
import { playMew } from '../../sounds/AudioManager'
import { asset } from '../../utils/asset'
import styles from './CatSprite.module.css'

const WALK_FRAMES = [
  asset('cat/cat_walk1.png'),
  asset('cat/cat_walk2.png'),
  asset('cat/cat_walk3.png'),
  asset('cat/cat_walk2.png'),
]

const WALK_SEQUENCE = [0, 2, 1, 0]

const FRAME_DURATIONS = [
  90,
  120,
  80,
  110,
]

const IDLE_SRC = asset('cat/idle cat.png')

const MAX_AFFECTION = 5
const GAUGE_FADE_MS = 2500

export default function CatSprite({
  variant = 'idle',
  size = 'md',
  className = '',
}) {
  const [step, setStep]           = useState(0)
  const [petted, setPetted]       = useState(false)
  const [affection, setAffection] = useState(0)
  const [showGauge, setShowGauge] = useState(false)
  const [burst, setBurst]         = useState(false)
  const [popId, setPopId]         = useState(null)
  const fadeTimer  = useRef(null)
  const burstTimer = useRef(null)

  const isWalking = variant === 'walking'

  useEffect(() => {
    if (!isWalking) { setStep(0); return }
    let t
    const loop = (i) => {
      const next = (i + 1) % WALK_SEQUENCE.length
      setStep(next)
      t = setTimeout(() => loop(next), FRAME_DURATIONS[next])
    }
    t = setTimeout(() => loop(0), FRAME_DURATIONS[0])
    return () => clearTimeout(t)
  }, [isWalking])

  const handleClick = useCallback(() => {
    playMew()
    if (isWalking) return

    setPetted(true)
    setTimeout(() => setPetted(false), 400)

    // show +1 pop
    setPopId(Date.now())

    setShowGauge(true)
    clearTimeout(fadeTimer.current)

    setAffection(prev => {
      const next = prev + 1
      if (next >= MAX_AFFECTION) {
        // max affection burst
        clearTimeout(burstTimer.current)
        setBurst(true)
        burstTimer.current = setTimeout(() => setBurst(false), 900)
        fadeTimer.current = setTimeout(() => {
          setShowGauge(false)
          setAffection(0)
        }, GAUGE_FADE_MS)
        return 0
      }
      fadeTimer.current = setTimeout(() => setShowGauge(false), GAUGE_FADE_MS)
      return next
    })
  }, [isWalking])

  const src = isWalking ? WALK_FRAMES[WALK_SEQUENCE[step]] : IDLE_SRC

  return (
    <span className={styles.wrapper} aria-hidden="true">
      {/* Affection gauge */}
      <span className={`${styles.gauge} ${showGauge ? styles.gaugeVisible : ''}`}>
        {Array.from({ length: MAX_AFFECTION }).map((_, i) => (
          <span
            key={i}
            className={`${styles.pip} ${i < affection ? styles.pipFilled : ''}`}
          />
        ))}
      </span>

      {/* +1 pop */}
      {popId && (
        <span key={popId} className={`${styles.pop} ${burst ? styles.popBurst : ''}`}>
          {burst ? '♥♥♥' : '+1 ♥'}
        </span>
      )}

      <img
        src={src}
        alt=""
        aria-hidden="true"
        onClick={handleClick}
        className={`${styles.cat} ${styles[`size_${size}`]} ${
          isWalking ? styles.walking : styles.floating
        } ${petted ? styles.petted : ''} ${burst ? styles.burst : ''} ${className}`}
      />
    </span>
  )
}