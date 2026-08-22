import { useState, useEffect, useRef, useCallback } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import ReactGA from 'react-ga4'
import { scrollToTop } from './utils/scroll'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // Immediate, not animated: a route change should start at the top, not
    // scroll there. Goes through the helper so Lenis's internal position
    // stays in sync with the document's.
    scrollToTop({ immediate: true })
    ReactGA.send({ hitType: 'pageview', page: pathname })
  }, [pathname])
  return null
}
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import Nav from './components/Nav/Nav'
import PawTrail from './components/PawTrail/PawTrail'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import Hero from './pages/Hero'
import Work from './pages/Work'
import About from './pages/About'
import Playground from './pages/Playground'
import Resume from './pages/Resume'
import Contact from './pages/Contact'
import ProjectCaseStudy from './pages/projects/ProjectCaseStudy'
import { playLoadComplete, getMuted, toggleMute } from './sounds/AudioManager'
import styles from './App.module.css'

let hasLoaded = false

export default function App() {
  const [loading, setLoading] = useState(!hasLoaded)
  const [muted, setMutedState] = useState(getMuted())
  const cursorRef = useRef(null)

  useSmoothScroll()

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return
    const move = (e) => {
      el.style.left = `${e.clientX}px`
      el.style.top  = `${e.clientY}px`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  useEffect(() => {
    let lastSparkle = 0
    const COLORS = ['#E58BA4', '#D4517A', '#F6D4DD', '#C4798A', '#FDF2F5']

    const spawnSparkle = (x, y) => {
      const now = Date.now()
      if (now - lastSparkle < 80) return
      lastSparkle = now

      for (let i = 0; i < 4; i++) {
        const el = document.createElement('div')
        el.className = 'cursor-sparkle'
        const angle = Math.random() * Math.PI * 2
        const dist = 10 + Math.random() * 18
        el.style.left = `${x}px`
        el.style.top = `${y}px`
        el.style.setProperty('--dx', `${Math.cos(angle) * dist}px`)
        el.style.setProperty('--dy', `${Math.sin(angle) * dist}px`)
        el.style.background = COLORS[Math.floor(Math.random() * COLORS.length)]
        const size = 4 + Math.random() * 4
        el.style.width = `${size}px`
        el.style.height = `${size}px`
        el.style.animationDuration = `${0.4 + Math.random() * 0.25}s`
        document.body.appendChild(el)
        setTimeout(() => el.remove(), 700)
      }
    }

    const handleMouseMove = (e) => {
      // Synthetic events can carry a non-element target (window, document),
      // which has no closest().
      const interactive = e.target?.closest?.('a, button, [role="button"], [role="tab"], input, select')
      cursorRef.current?.classList.toggle('hovering', !!interactive)
      if (interactive) {
        spawnSparkle(e.clientX, e.clientY)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleLoadComplete = useCallback(() => {
    hasLoaded = true
    setLoading(false)
    playLoadComplete()
  }, [])

  return (
    <>
      <div id="cursor" ref={cursorRef} aria-hidden="true" />
      <PawTrail />

      {loading && <LoadingScreen onComplete={handleLoadComplete} />}

      <div className={`${styles.site} ${loading ? styles.hidden : styles.visible}`}>
        <Nav />

        <button
          className={styles.muteBtn}
          onClick={() => setMutedState(toggleMute())}
          aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
        >
          {muted ? '🔇' : '🔊'}
        </button>

        <ScrollToTop />
        <Routes>
          <Route path="/" element={
            <main>
              <Hero active={!loading} />
              <Work />
              <About />
              <Playground />
              <Resume />
              <Contact />
            </main>
          } />
          <Route path="/projects/:id" element={<ProjectCaseStudy />} />
        </Routes>
      </div>
    </>
  )
}
