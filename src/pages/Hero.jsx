import { useEffect, useRef, useState, useCallback } from 'react'
import { useInView } from '../hooks/useInView'

import CatSprite from '../components/CatSprite/CatSprite'
import { asset } from '../utils/asset'
import styles from './Hero.module.css'

const HEADLINE_1 = 'I prototype feelings'
const HEADLINE_2 = 'through interaction, motion, and '
const CHAR_DELAY = 50

const STAGE_MESSAGES = [
  "Piggy seems interested in you.",
  "Piggy seems to want you to pet her more.",
  "Piggy is very happy!",
  "Piggy loves you.",
]

// Outline briefcase icon
const iconStyle = { color: 'var(--color-text-light)', flexShrink: 0, display: 'block' }

const BriefcaseIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
)

const GradCapIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
)

// Paw print SVG — 1 large pad + 3 toe circles in triangle above
const PawPrint = () => (
  <svg width="11" height="13" viewBox="0 0 16 18" fill="currentColor" aria-hidden="true">
    <ellipse cx="8" cy="14" rx="4.5" ry="3.5" />
    <circle cx="3"  cy="8"  r="2" />
    <circle cx="8"  cy="6"  r="2.2" />
    <circle cx="13" cy="8"  r="2" />
  </svg>
)

const PAW_TRAIL = [
  { x: 9,  y: 75, r: 88 },
  { x: 12, y: 79, r: 92 },
  { x: 15, y: 75, r: 88 },
  { x: 18, y: 79, r: 92 },
  { x: 21, y: 75, r: 88 },
  { x: 24, y: 79, r: 92 },
  { x: 27, y: 75, r: 88 },
  { x: 30, y: 79, r: 92 },
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

  // ── Headline typewriter (two lines, sequential) ──
  const [line2Trigger, setLine2Trigger] = useState(0)
  const [line1Typed, showLine1Cursor] = useTypewriter(HEADLINE_1, inView ? 1 : 0, 500, () => setLine2Trigger(t => t + 1))
  const [line2Typed, showLine2Cursor] = useTypewriter(HEADLINE_2, line2Trigger, 0)

  const line2Done = line2Typed.length === HEADLINE_2.length

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

          <p className={styles.coinLabel}>Product Designer</p>

          {/* Cat area */}
          <div className={styles.catWrap}>
            <div className={styles.catPromptArea}>
              <CatSprite
                variant="idle"
                size="md"
                onFirstPet={handleFirstPet}
                onBurst={handleBurst}
              />
              <div className={`${styles.petPrompt} ${hasPetted ? styles.petPromptHidden : ''}`}>
                <img src={asset('other assets/arrow.svg')} alt="" className={styles.petArrow} />
                <span className={styles.petLabel}>Pet me?</span>
              </div>
            </div>

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

        {/* ── Right: bio ── */}
        <div className={styles.bio}>
          <p className={styles.greeting}><span className={styles.greetingDiamond}>◆</span>HEY THERE, I'M TIFFANY <span className={styles.greetingDiamond}>◆</span></p>

          <h2 className={styles.bioHeadline} aria-label={`${HEADLINE_1} ${HEADLINE_2}play.`}>
            <span className={styles.headlineLine}>
              {line1Typed}{showLine1Cursor && <span className={styles.cursor} aria-hidden="true" />}
            </span>
            <span className={styles.headlineLine}>
              {line2Typed}
              {/* "play." is always in DOM to avoid layout shift; fades in when typing finishes */}
              <span className={`${styles.squiggleWord} ${line2Done ? styles.squiggleVisible : ''}`}>play.</span>
              {showLine2Cursor && <span className={styles.cursor} aria-hidden="true" />}
            </span>
          </h2>

          <p className={styles.bioText}>
            Designer and builder who <span className={styles.accent}>researches</span>, <span className={styles.accent}>prototypes</span>,{' '}
            and <span className={styles.accent}>ships</span> interactive experiences from concept to code.
            Exploring how small interactions shape what people remember.
          </p>

          {/* Credential row */}
          <div className={styles.credRow}>
            <span className={styles.credGroup}>
              <BriefcaseIcon />
              <span className={styles.credLabel}>Previously engineering at</span>
              <img src={asset('other assets/Meta_Platforms_Inc._logo_(cropped).svg.png')} alt="Meta" className={styles.credLogo} />
              <span className={styles.credLabel}>Meta</span>
              <span className={styles.credCocoon} />
              <span className={styles.credCocoonLabel}>Cocoon</span>
              <img src={asset('other assets/SUSELogo.png')} alt="SUSE" className={styles.credLogo} />
              <span className={styles.credLabel}>SUSE</span>
            </span>
            <span className={styles.credDivider}>|</span>
            <span className={styles.credGroup}>
              <GradCapIcon />
              <span className={styles.credLabel}>MDes @ UC Berkeley</span>
            </span>
          </div>

          <div className={styles.bioActions}>
            <a href="#work" className={styles.primaryBtn} onClick={e => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) }}>
              See my work
              <span className={styles.btnArrow}>→</span>
            </a>
            <a href="#contact" className={styles.ghostBtn} onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
              Let's chat
              <span className={styles.btnSpark}>✦</span>
            </a>
          </div>
        </div>

      </div>

      {/* ── Paw print trail ── */}
      <div className={styles.pawTrail} aria-hidden="true">
        {PAW_TRAIL.map((p, i) => (
          <span
            key={i}
            className={styles.paw}
            style={{ left: `${p.x}%`, top: `${p.y}%`, transform: `rotate(${p.r}deg)` }}
          >
            <PawPrint />
          </span>
        ))}
      </div>

      {/* ── Separator: full-width line + upward chevron ── */}
      <div className={styles.separatorWrap} aria-hidden="true">
        <svg className={styles.separatorSvg} viewBox="0 0 1000 28" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <polyline
            points={`0,14 487,14 500,3 513,14 1000,14`}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </section>
  )
}
