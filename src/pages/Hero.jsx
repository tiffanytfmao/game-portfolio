import { useEffect, useRef, useState, useCallback } from 'react'
import { useInView } from '../hooks/useInView'
import CatSprite from '../components/CatSprite/CatSprite'
import { asset } from '../utils/asset'
import styles from './Hero.module.css'

const HEADLINE = 'I prototype feelings before I design products.'
const CHAR_DELAY = 50

const STAGE_MESSAGES = [
  "Piggy seems interested in you.",
  "Piggy seems to want you to pet her more.",
  "Piggy is very happy!",
  "Piggy loves you.",
]

function useTypewriter(text, triggerKey, delayMs = 500, onComplete) {
  const [typed, setTyped]           = useState('')
  const [showCursor, setShowCursor] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!triggerKey) return
    clearTimeout(timerRef.current)
    setTyped('')
    setShowCursor(false)

    timerRef.current = setTimeout(() => {
      setShowCursor(true)
      let i = 0
      const tick = () => {
        i++
        setTyped(text.slice(0, i))
        if (i < text.length) {
          timerRef.current = setTimeout(tick, CHAR_DELAY)
        } else {
          timerRef.current = setTimeout(() => {
            setShowCursor(false)
            onComplete?.()
          }, 900)
        }
      }
      tick()
    }, delayMs)

    return () => clearTimeout(timerRef.current)
  }, [triggerKey]) // eslint-disable-line react-hooks/exhaustive-deps

  return [typed, showCursor]
}

export default function Hero() {
  const [ref, inView] = useInView()

  // ── Headline typewriter ──
  const [headlineTyped, showHeadlineCursor] = useTypewriter(HEADLINE, inView ? 1 : 0, 500)

  // ── Pet mini-game ──
  const [hasPetted, setHasPetted]   = useState(false)
  const [burstCount, setBurstCount] = useState(0)
  const [msgFading, setMsgFading]   = useState(false)
  const fadeTimerRef = useRef(null)

  const stageMsg = burstCount > 0 ? STAGE_MESSAGES[(burstCount - 1) % STAGE_MESSAGES.length] : ''

  const handleFirstPet = useCallback(() => setHasPetted(true), [])

  const handleBurst = useCallback(() => {
    clearTimeout(fadeTimerRef.current)
    setMsgFading(false)
    setBurstCount(prev => prev + 1)
  }, [])

  const handleMsgComplete = useCallback(() => {
    fadeTimerRef.current = setTimeout(() => setMsgFading(true), 2000)
  }, [])

  const [stageTyped, showStageCursor] = useTypewriter(stageMsg, burstCount, 200, handleMsgComplete)

  return (
    <section id="hero" className={`${styles.hero} texture-dots`} ref={ref}>
      <div className={`${styles.inner} ${inView ? styles.visible : ''}`}>

        {/* ── Left: portrait panel ── */}
        <aside className={styles.portraitPanel}>
          <div className={styles.flipWrapper}>
            <div className={styles.flipCard}>
              <div className={styles.flipFront}>
                <div className={styles.portraitFrame}>
                  <img src={asset('portraits/portrait.png')} alt="Tiffany Mao" className={styles.portraitImg} />
                </div>
              </div>
              <div className={styles.flipBack}>
                <div className={styles.portraitFrame}>
                  <img src={asset('portraits/tiff.jpg')} alt="Tiffany Mao" className={styles.portraitImg} />
                </div>
              </div>
            </div>
          </div>
          <h1 className={styles.name}>Tiffany Mao</h1>
          <p className={styles.nameRole}>UX Designer</p>

          {/* Cat area */}
          <div className={styles.catWrap}>
            <div className={styles.catPromptArea}>
              <CatSprite
                variant="idle"
                size="md"
                onFirstPet={handleFirstPet}
                onBurst={handleBurst}
              />
              {/* "Pet me?" prompt — fades after first pet */}
              <div className={`${styles.petPrompt} ${hasPetted ? styles.petPromptHidden : ''}`}>
                <img src={asset('other assets/arrow.svg')} alt="" className={styles.petArrow} />
                <span className={styles.petLabel}>Pet me?</span>
              </div>
            </div>

            {/* Stage message — typewritten, then fades out */}
            {burstCount > 0 && (
              <p
                className={`${styles.stageMsg} ${msgFading ? styles.stageMsgFading : ''}`}
                aria-live="polite"
              >
                {stageTyped}
                {showStageCursor && <span className={styles.cursor} aria-hidden="true" />}
              </p>
            )}
          </div>
        </aside>

        {/* ── Center: bio ── */}
        <div className={styles.bio}>
          <h2 className={styles.bioHeadline} aria-label={HEADLINE}>
            {headlineTyped}
            {showHeadlineCursor && <span className={styles.cursor} aria-hidden="true" />}
          </h2>
          <p className={styles.bioText}>
            Engineer-brained UX designer who designs and ships while exploring how play, motion, and interaction shape the way products feel.
          </p>
          <div className={styles.bioActions}>
            <a href="#contact" className={styles.primaryBtn} onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
              <span className={styles.btnDiamond}>◆</span>
              Let's chat
              <span className={styles.btnDiamond}>◆</span>
            </a>
            <a href="#work" className={styles.ghostBtn} onClick={e => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) }}>
              See my work
            </a>
          </div>
        </div>

        {/* ── Right: stat card ── */}
        <aside className={styles.statCard}>
          <div className={styles.statSection}>
            <span className={styles.statLabel}>Previously at</span>
            <ul className={styles.statList}>
              <li><span className={styles.statBadge}>Meta</span></li>
              <li><span className={styles.statBadge}>Cocoon</span></li>
              <li><span className={styles.statBadge}>SUSE</span></li>
            </ul>
          </div>
          <div className={styles.divider} />
          <div className={styles.statSection}>
            <span className={styles.statLabel}>Currently at</span>
            <p className={styles.statValue}>Masters of Design</p>
            <p className={styles.statMeta}>UC Berkeley · Expected Winter 2026</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.statSection}>
            <span className={styles.statLabel}>Status</span>
            <p className={styles.statusRow}>
              <span className={styles.statusDot} />
              Seeking Summer 2026 Internships
            </p>
          </div>
        </aside>

      </div>
    </section>
  )
}
