import { useEffect, useRef, useState, useCallback } from 'react'
import { useInView } from '../hooks/useInView'
import { useScrollProgress } from '../hooks/useScrollProgress'

import CatSprite from '../components/CatSprite/CatSprite'
import { asset } from '../utils/asset'
import styles from './Hero.module.css'
import { scrollToId } from '../utils/scroll'

const HEADLINE_1 = 'I design digital products,'
const HEADLINE_2 = 'games, and experiences'
const HEADLINE_3 = 'built for '
const CHAR_DELAY = 32

const STAGE_MESSAGES = [
  "Piggy seems interested in you.",
  "Piggy seems to want you to pet her more.",
  "Piggy is very happy!",
  "Piggy loves you.",
]

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

function useTypewriter(text, triggerKey, delayMs = 500, onComplete, holdMs = 900) {
  const [count, setCount]           = useState(0)
  const [showCursor, setShowCursor] = useState(false)
  const timerRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!triggerKey) return
    clearTimeout(timerRef.current)
    cancelAnimationFrame(rafRef.current)
    setCount(0)
    setShowCursor(false)

    timerRef.current = setTimeout(() => {
      setShowCursor(true)
      let elapsed = 0
      let last = null

      const frame = (now) => {
        // Only accumulate time while the tab is actually visible, so
        // returning to a backgrounded tab resumes smoothly instead of
        // jumping straight to the end. Skip accumulation on the very first
        // frame — `last` would otherwise be the time the timer fired, not
        // the time the browser actually got around to painting, and any
        // gap between those two (scheduling delay, main-thread work) would
        // get counted as already-elapsed typing time.
        if (last !== null && !document.hidden) elapsed += now - last
        last = now

        const i = Math.min(text.length, Math.floor(elapsed / CHAR_DELAY) + 1)
        setCount(i)

        if (i < text.length) {
          rafRef.current = requestAnimationFrame(frame)
        } else {
          timerRef.current = setTimeout(() => {
            setShowCursor(false)
            onComplete?.()
          }, holdMs)
        }
      }
      rafRef.current = requestAnimationFrame(frame)
    }, delayMs)

    return () => {
      clearTimeout(timerRef.current)
      cancelAnimationFrame(rafRef.current)
    }
  }, [triggerKey]) // eslint-disable-line react-hooks/exhaustive-deps

  return [count, showCursor]
}

// Renders the full text up front (so line-wrapping is computed once and
// never reflows mid-animation) and reveals characters via opacity instead
// of growing the string, which avoids the layout jitter that comes from
// the browser re-wrapping lines as partial words change width.
function TypedText({ text, count, showCursor }) {
  const nodes = []
  for (let idx = 0; idx <= text.length; idx++) {
    if (showCursor && idx === count) {
      nodes.push(<span key={`cursor-${idx}`} className={styles.cursor} aria-hidden="true" />)
    }
    if (idx < text.length) {
      nodes.push(
        <span key={idx} style={{ opacity: idx < count ? 1 : 0 }} aria-hidden="true">
          {text[idx]}
        </span>
      )
    }
  }
  return nodes
}

export default function Hero({ active = true }) {
  const [ref, inView] = useInView()
  // One viewport of scroll takes the hero from sharp to fully receded.
  useScrollProgress(ref, typeof window !== 'undefined' ? window.innerHeight * 0.8 : 600)

  // ── Headline typewriter (three lines, sequential) ──
  // Gated on `active` (not just `inView`) because Hero is mounted and
  // already in the viewport while the LoadingScreen overlay is up — it's
  // only hidden via opacity, so the typewriter would otherwise run its
  // whole course underneath the overlay and finish before it's visible.
  const [line2Trigger, setLine2Trigger] = useState(0)
  const [line3Trigger, setLine3Trigger] = useState(0)
  const [line1Count, showLine1Cursor] = useTypewriter(HEADLINE_1, (inView && active) ? 1 : 0, 450, () => setLine2Trigger(t => t + 1), 220)
  const [line2Count, showLine2Cursor] = useTypewriter(HEADLINE_2, line2Trigger, 0, () => setLine3Trigger(t => t + 1), 220)
  const [line3Count, showLine3Cursor] = useTypewriter(HEADLINE_3, line3Trigger, 0, undefined, 300)

  const line3Done = line3Count === HEADLINE_3.length
  // Supporting copy rides in with the last line rather than waiting for it to
  // finish, so the page settles about a second sooner without losing the
  // sense that the headline leads.
  const tailStarted = line3Trigger > 0

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

  const [stageCount, showStageCursor] = useTypewriter(stageMsg, burstCount, 200, handleMsgComplete)

  const scrollToWork = useCallback((e) => {
    e.preventDefault()
    scrollToId('work')
  }, [])

  return (
    <section id="hero" className={styles.hero} ref={ref}>
      <div className={`${styles.inner} ${(inView && active) ? styles.visible : ''}`}>

        <p className={styles.greeting}>
          HI, I'M TIFFANY <span className={styles.greetingMark}>✳</span>
        </p>

        <h1 className={styles.headline} aria-label={`${HEADLINE_1} ${HEADLINE_2} ${HEADLINE_3}play.`}>
          <span className={styles.headlineLine}>
            <TypedText text={HEADLINE_1} count={line1Count} showCursor={showLine1Cursor} />
          </span>
          <span className={styles.headlineLine}>
            <TypedText text={HEADLINE_2} count={line2Count} showCursor={showLine2Cursor} />
          </span>
          <span className={styles.headlineLine}>
            {/* HEADLINE_3 + "play." are both always rendered in full (revealed via
                per-character opacity) so the browser computes line-wrapping once
                up front instead of re-wrapping as the typed string grows. */}
            <TypedText text={HEADLINE_3} count={line3Count} showCursor={showLine3Cursor} />
            <span className={`${styles.playWord} ${line3Done ? styles.playVisible : ''}`}>play</span>
            <span className={`${styles.playStop} ${line3Done ? styles.playVisible : ''}`}>.</span>
          </span>
        </h1>

        <p className={`${styles.bioText} ${tailStarted ? styles.revealed : ''}`}>
          I <span className={styles.accent}>research</span>, <span className={styles.accent}>prototype</span>,{' '}
          and <span className={styles.accent}>ship</span> interactive experiences
          <br className={styles.bioBreak} /> from concept to code.
        </p>

        {/* ── Cat mini-game ── */}
        <div className={`${styles.catWrap} ${tailStarted ? styles.revealed : ''}`}>
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
              aria-label={stageMsg}
            >
              <TypedText text={stageMsg} count={stageCount} showCursor={showStageCursor} />
            </p>
          )}
        </div>

        {/* ── Credential row ── */}
        <div className={`${styles.credRow} ${tailStarted ? styles.revealed : ''}`}>
          <span className={styles.credGroup}>
            <BriefcaseIcon />
            <span className={styles.credLabel}>Prev. Engineer @</span>
            <img src={asset('other assets/Meta_Platforms_Inc._logo_(cropped).svg.png')} alt="Meta" className={styles.credLogo} />
            <span className={styles.credLabel}>Meta</span>
            <span className={styles.credCocoon} />
            <span className={styles.credLabel}>Cocoon</span>
            <img src={asset('other assets/SUSELogo.png')} alt="SUSE" className={styles.credLogo} />
            <span className={styles.credLabel}>SUSE</span>
          </span>
          <span className={styles.credDivider} aria-hidden="true" />
          <span className={styles.credGroup}>
            <GradCapIcon />
            <span className={styles.credLabel}>MDes @ UC Berkeley</span>
          </span>
        </div>

        {/* ── Scroll cue (replaces the old CTA pair) ── */}
        <a
          href="#work"
          className={`${styles.scrollCue} ${tailStarted ? styles.revealed : ''}`}
          onClick={scrollToWork}
        >
          <span className={styles.scrollLabel}>Scroll to see my work</span>
          <span className={styles.scrollArrow} aria-hidden="true">↓</span>
        </a>

      </div>
    </section>
  )
}
