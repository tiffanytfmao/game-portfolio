import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { playNavClick } from '../../sounds/AudioManager'
import styles from './Nav.module.css'

const TABS = [
  { id: 'home',       label: 'Home' },
  { id: 'work',       label: 'Work' },
  { id: 'about',      label: 'About' },
  { id: 'playground', label: 'Playground' },
  { id: 'resume',     label: 'Resume' },
  { id: 'contact',    label: 'Contact' },
]

const WORK_PROJECTS = [
  { id: 'wonder',  label: 'Wonder Workshop' },
  { id: 'cocoon',  label: 'Cocoon' },
  { id: 'berky',   label: 'Berky the Worm' },
  { id: 'palbits', label: 'Palbits' },
]

export default function Nav() {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => {
      for (const t of [...TABS].reverse()) {
        if (t.id === 'home') continue
        const el = document.getElementById(t.id)
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(t.id)
          return
        }
      }
      setActive('home')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  function scrollTo(id) {
    playNavClick()
    setActive(id)
    setMenuOpen(false)
    if (isHome) {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // Navigate home first, then scroll to the target section
      navigate('/')
      if (id !== 'home') {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }, 120)
      }
    }
  }

  function handleLogoClick() {
    playNavClick()
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        {/* Logo */}
        <button className={styles.logo} onClick={handleLogoClick}>
          <img src={`${import.meta.env.BASE_URL}cat/logo_pink.png`} alt="Tiffany Mao" className={styles.logoImg} />
        </button>

        {/* Tabs (desktop) */}
        <ul className={styles.tabs} role="list">
          {TABS.map(t => (
            <li key={t.id} className={t.id === 'work' ? styles.workWrap : ''}>
              {t.id === 'work' ? (
                <div className={styles.dropdownWrap}>
                  <button
                    className={`${styles.tab} ${active === 'work' && isHome ? styles.tabActive : ''}`}
                    onClick={() => scrollTo('work')}
                    aria-current={active === 'work' && isHome ? 'page' : undefined}
                  >
                    Work
                  </button>
                  <div className={styles.dropdown} role="menu">
                    <div className={styles.dropdownInner}>
                      {WORK_PROJECTS.map(p => (
                        <Link
                          key={p.id}
                          to={`/projects/${p.id}`}
                          className={styles.dropdownItem}
                          role="menuitem"
                          onClick={playNavClick}
                        >
                          <span className={styles.dropDiamond} aria-hidden="true">◆</span>
                          {p.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  className={`${styles.tab} ${active === t.id && isHome ? styles.tabActive : ''}`}
                  onClick={() => scrollTo(t.id)}
                  aria-current={active === t.id && isHome ? 'page' : undefined}
                >
                  {t.label}
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Icon links + hamburger */}
        <div className={styles.right}>
          <a
            className={styles.iconBtn}
            href="mailto:tiffanytfmao@berkeley.edu"
            aria-label="Email"
            title="Email"
          >
            <EmailIcon />
          </a>
          <a
            className={styles.iconBtn}
            href="https://linkedin.com/in/tiffanymao"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={menuOpen ? styles.burgerOpen : ''} />
            <span className={menuOpen ? styles.burgerOpen : ''} />
            <span className={menuOpen ? styles.burgerOpen : ''} />
          </button>
        </div>
      </nav>

      {/* Mobile slide-in panel */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <ul role="list">
          {TABS.map(t => (
            <li key={t.id}>
              <button
                className={`${styles.mobileTab} ${active === t.id && isHome ? styles.mobileTabActive : ''}`}
                onClick={() => scrollTo(t.id)}
              >
                <span className={styles.mobileTabDiamond}>◆</span>
                {t.label}
              </button>
            </li>
          ))}
          <li className={styles.mobileProjectGroup}>
            <span className={styles.mobileGroupLabel}>Projects</span>
            {WORK_PROJECTS.map(p => (
              <Link
                key={p.id}
                to={`/projects/${p.id}`}
                className={styles.mobileProjectItem}
                onClick={() => { playNavClick(); setMenuOpen(false) }}
              >
                <span className={styles.mobileTabDiamond}>◆</span>
                {p.label}
              </Link>
            ))}
          </li>
        </ul>
        <div className={styles.mobileLinks}>
          <a href="mailto:tiffanytfmao@berkeley.edu" className={styles.iconBtn}>
            <EmailIcon /> tiffanytfmao@berkeley.edu
          </a>
        </div>
      </div>
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
    </>
  )
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}
