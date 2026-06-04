import { useEffect, useRef, useState } from 'react'
import { playMew } from '../../sounds/AudioManager'
import styles from './CatSprite.module.css'

const WALK_FRAMES = [
  '/cat_walk1.png', // 0
  '/cat_walk2.png', // 1
  '/cat_walk3.png', // 2
  '/cat_walk2.png', // 3 (not used in sequence directly)
]

const WALK_SEQUENCE = [0, 2, 1, 0]


const FRAME_DURATIONS = [
  90, 
  120, 
  80,  
  110, 
]

const IDLE_SRC = '/idle cat.png'

export default function CatSprite({
  variant = 'idle',
  size = 'md',
  className = '',
}) {
  const [step, setStep] = useState(0)
  const timerRef = useRef(null)

  const isWalking = variant === 'walking'

  useEffect(() => {
    if (!isWalking) {
      setStep(0)
      return
    }

    let timeoutId

    const loop = (i) => {
      const nextIndex = (i + 1) % WALK_SEQUENCE.length
      setStep(nextIndex)

      timeoutId = setTimeout(
        () => loop(nextIndex),
        FRAME_DURATIONS[nextIndex]
      )
    }

    // start loop
    timeoutId = setTimeout(() => loop(0), FRAME_DURATIONS[0])

    return () => clearTimeout(timeoutId)
  }, [isWalking])

  const src = isWalking
    ? WALK_FRAMES[WALK_SEQUENCE[step]]
    : IDLE_SRC

  return (
    <img
      key={src}
      src={src}
      alt=""
      aria-hidden="true"
      onClick={playMew}
      className={`${styles.cat} ${styles[`size_${size}`]} ${
        isWalking ? styles.walking : styles.floating
      } ${className}`}
    />
  )
}