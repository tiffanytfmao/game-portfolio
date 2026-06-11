import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './FollowSketch.module.css'

const FOLLOW_MS = 12000
const LERP = 0.09

const isTouchOnly = () =>
  typeof window !== 'undefined' &&
  !window.matchMedia('(hover: hover)').matches

export default function FollowSketch({ imageUrl, origin, onDone }) {
  const posRef = useRef({ x: origin.x, y: origin.y })
  const mouseRef = useRef({ x: origin.x, y: origin.y })
  const rafRef = useRef(null)
  const [pos, setPos] = useState({ x: origin.x, y: origin.y })
  const [vel, setVel] = useState({ x: 0, y: 0 })
  // phases: entering → following → bye → poofing
  const [phase, setPhase] = useState('entering')

  const mobile = isTouchOnly()

  useEffect(() => {
    if (mobile) {
      // Pop in place, say bye, poof
      const t1 = setTimeout(() => setPhase('bye'), 1000)
      const t2 = setTimeout(() => setPhase('poofing'), 2600)
      const t3 = setTimeout(onDone, 3200)
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }

    function onMouseMove(e) {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove)

    const t1 = setTimeout(() => setPhase('following'), 650)
    const t2 = setTimeout(() => setPhase('bye'), FOLLOW_MS)
    const t3 = setTimeout(() => setPhase('poofing'), FOLLOW_MS + 1800)
    const t4 = setTimeout(onDone, FOLLOW_MS + 2500)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4)
    }
  }, [mobile, onDone])

  useEffect(() => {
    if (phase !== 'following' && phase !== 'bye') {
      cancelAnimationFrame(rafRef.current)
      return
    }
    let prevX = posRef.current.x
    let prevY = posRef.current.y
    function tick() {
      const newX = posRef.current.x + (mouseRef.current.x - posRef.current.x) * LERP
      const newY = posRef.current.y + (mouseRef.current.y - posRef.current.y) * LERP
      const vx = newX - prevX
      const vy = newY - prevY
      prevX = newX
      prevY = newY
      posRef.current = { x: newX, y: newY }
      setPos({ x: newX, y: newY })
      setVel({ x: vx, y: vy })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [phase])

  const speed = Math.sqrt(vel.x ** 2 + vel.y ** 2)
  const sqX = Math.max(0.82, 1 - speed * 0.011)
  const sqY = Math.max(0.88, 1 + speed * 0.009)
  const tilt = Math.max(-14, Math.min(14, vel.x * 2.2))

  const showBubble = phase === 'bye' || phase === 'poofing'
  const currentPos = mobile ? origin : pos

  const particles = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2
    return {
      dx: Math.round(Math.cos(angle) * 44),
      dy: Math.round(Math.sin(angle) * 44),
    }
  })

  return createPortal(
    <div
      className={`${styles.wrapper} ${styles[`ph_${phase}`]}`}
      style={{ left: currentPos.x, top: currentPos.y }}
      aria-hidden="true"
    >
      {showBubble && (
        <div className={`${styles.bubble} ${phase === 'poofing' ? styles.bubbleFading : ''}`}>
          bye! thank you for creating me!
          <span className={styles.bubbleTail} />
        </div>
      )}

      <div
        className={styles.sketchWrap}
        style={{ transform: `scaleX(${sqX}) scaleY(${sqY}) rotate(${tilt}deg)` }}
      >
        <img src={imageUrl} className={styles.sketch} alt="" draggable={false} />
      </div>

      {phase === 'poofing' && (
        <div className={styles.particles}>
          {particles.map(({ dx, dy }, i) => (
            <span
              key={i}
              className={styles.particle}
              style={{ '--dx': `${dx}px`, '--dy': `${dy}px` }}
            />
          ))}
        </div>
      )}
    </div>,
    document.body
  )
}
