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
  onFirstPet,
  onBurst,
}) {
  const [step, setStep]           = useState(0)
  const [petted, setPetted]       = useState(false)
  const [affection, setAffection] = useState(0)
  const [showGauge, setShowGauge] = useState(false)
  const [burst, setBurst]         = useState(false)
  const [popId, setPopId]         = useState(null)
  const fadeTimer    = useRef(null)
  const burstTimer   = useRef(null)
  const petCountRef  = useRef(0)

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

    petCountRef.current += 1
    if (petCountRef.current === 1) onFirstPet?.()

    setPetted(true)
    setTimeout(() => setPetted(false), 400)

    setPopId(Date.now())
    setShowGauge(true)
    clearTimeout(fadeTimer.current)

    setAffection(prev => {
      const next = prev + 1
      if (next >= MAX_AFFECTION) {
        clearTimeout(burstTimer.current)
        setBurst(true)
        onBurst?.()
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
  }, [isWalking, onFirstPet, onBurst])

  const src = isWalking ? WALK_FRAMES[WALK_SEQUENCE[step]] : IDLE_SRC

  return (
    <span className={styles.wrapper}>
      {/* Affection gauge */}
      <span aria-hidden="true" className={`${styles.gauge} ${showGauge ? styles.gaugeVisible : ''}`}>
        {Array.from({ length: MAX_AFFECTION }).map((_, i) => (
          <span
            key={i}
            className={`${styles.pip} ${i < affection ? styles.pipFilled : ''}`}
          />
        ))}
      </span>

      {/* +1 pop */}
      {popId && (
        <span key={popId} aria-hidden="true" className={`${styles.pop} ${burst ? styles.popBurst : ''}`}>
          {burst ? '♥♥♥' : '+1 ♥'}
        </span>
      )}

      {/* A real button, not a bare <img> with a click handler. React
          delegates its listeners to the root, so the image itself carries
          no onclick — which is exactly the case iOS Safari refuses to
          synthesise a tap into. It also puts the game on the keyboard and
          gives the tap a 44px target regardless of the sprite's size. */}
      <button
        type="button"
        onClick={handleClick}
        aria-label={isWalking ? 'Cat' : 'Pet the cat'}
        className={`${styles.petBtn} ${styles[`size_${size}`]}`}
      >
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className={`${styles.cat} ${
            isWalking ? styles.walking : styles.floating
          } ${petted ? styles.petted : ''} ${burst ? styles.burst : ''} ${className}`}
        />
      </button>
    </span>
  )
}
