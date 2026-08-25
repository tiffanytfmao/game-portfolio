import { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react'
import { Link } from 'react-router-dom'
import CatSprite from '../CatSprite/CatSprite'
import NextCaseStudy from '../NextCaseStudy/NextCaseStudy'
import { scrollToId } from '../../utils/scroll'
import styles from '../../pages/projects/caseStudy.module.css'

/* Lets <Section> register itself with the layout's scroll observer without
   every case study having to thread refs through by hand. */
const RegistryContext = createContext(null)

/**
 * Editorial case study shell: sticky cat nav on the left, bare hero
 * (breadcrumb → title → meta row → full-width media), then sections.
 */
export default function CaseStudyLayout({
  id,
  title,
  breadcrumbLabel,
  meta = [],
  heroMedia,
  sections = [],
  tags = [],
  skipTo,
  skipLabel = 'Skip to solution',
  variant,
  children,
}) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id)
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [catY, setCatY] = useState(0)
  const sectionRefs = useRef({})
  const navItemRefs = useRef({})
  const navRef = useRef(null)

  const register = useCallback((sectionId, el) => {
    sectionRefs.current[sectionId] = el
  }, [])

  useEffect(() => {
    const observers = []
    const options = { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    sections.forEach(({ id: sectionId }) => {
      const el = sectionRefs.current[sectionId]
      if (!el) return
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveSection(sectionId)
      }, options)
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [sections])

  useEffect(() => {
    const itemEl = navItemRefs.current[activeSection]
    const navEl = navRef.current
    if (!itemEl || !navEl) return
    const navRect = navEl.getBoundingClientRect()
    const itemRect = itemEl.getBoundingClientRect()
    setCatY(itemRect.top - navRect.top + itemRect.height / 2 - 16)
  }, [activeSection])

  const scrollToSection = useCallback((sectionId) => {
    const el = sectionRefs.current[sectionId]
    if (!el) return
    // Lenis owns the scroll position while it is mounted, which makes a raw
    // window.scrollTo a no-op — the sidebar and the skip button were not
    // moving the page at all. utils/scroll.js is the single scroller.
    scrollToId(sectionId, { offset: -88 })
    // Focus follows the scroll. Without this a keyboard user activates a
    // sidebar link and their focus is still in the sidebar, so the next Tab
    // takes them to the following nav item rather than into the section.
    el.focus({ preventScroll: true })
  }, [])

  return (
    <div className={`${styles.page} ${variant === 'warm' ? styles.warm : ''}`}>
      <Link to="/" className={styles.backBtn}>
        <span className={styles.backArrow} aria-hidden="true">←</span> Back
      </Link>

      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <nav ref={navRef} className={styles.sideNav} aria-label="Case study navigation">
            <div
              className={styles.catIndicator}
              style={{ transform: `translateY(${catY}px)` }}
              aria-hidden="true"
            >
              <CatSprite variant="idle" size="sm" />
            </div>
            {sections.map(({ id: sectionId, label }) => (
              <button
                key={sectionId}
                ref={(el) => { navItemRefs.current[sectionId] = el }}
                className={`${styles.navItem} ${activeSection === sectionId ? styles.navActive : ''}`}
                onClick={() => scrollToSection(sectionId)}
                aria-current={activeSection === sectionId ? 'true' : undefined}
              >
                {label}
              </button>
            ))}
          </nav>
        </aside>

        <article className={styles.content}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link to="/work" className={styles.breadcrumbHome}>All work</Link>
            <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
            <span className={styles.breadcrumbCurrent}>{breadcrumbLabel ?? title}</span>
          </nav>

          <h1 className={styles.title}>{title}</h1>

          {meta.length > 0 && (
            <div className={styles.metaFields}>
              {meta.map(({ label, value }) => (
                <div key={label} className={styles.metaField}>
                  <p className={styles.metaLabel}>{label}</p>
                  <p className={styles.metaValue}>{value}</p>
                </div>
              ))}
            </div>
          )}

          {heroMedia && (() => {
            // Cap at the asset's native width so it never upscales and goes soft.
            const style = heroMedia.maxWidth ? { maxWidth: `${heroMedia.maxWidth}px` } : undefined
            const isVideo = heroMedia.video || /\.(mp4|mov|webm)$/i.test(heroMedia.src)
            return isVideo ? (
              <video
                className={styles.heroMedia}
                src={heroMedia.src}
                poster={heroMedia.poster}
                style={style}
                autoPlay={!prefersReducedMotion}
                loop
                muted
                playsInline
                // A looping clip that cannot be stopped is motion the viewer
                // has no control over (WCAG 2.2.2). Controls are always
                // available; under reduced motion it also starts paused.
                controls={heroMedia.controls ?? true}
                aria-label={heroMedia.alt}
              />
            ) : (
              <img className={styles.heroMedia} src={heroMedia.src} alt={heroMedia.alt} style={style} />
            )
          })()}

          {(tags.length > 0 || skipTo) && (
            <div className={styles.heroFooter}>
              {tags.length > 0 && (
                <div className={styles.heroTags}>
                  {tags.map((t) => (
                    <span key={t} className={styles.heroTag}>{t}</span>
                  ))}
                </div>
              )}
              {skipTo && (
                <button className={styles.skipBtn} onClick={() => scrollToSection(skipTo)}>
                  {skipLabel} <span aria-hidden="true">◆</span>
                </button>
              )}
            </div>
          )}

          <RegistryContext.Provider value={register}>
            {children}
          </RegistryContext.Provider>

          <NextCaseStudy currentId={id} />
        </article>
      </div>
    </div>
  )
}

/**
 * One section: mono label + serif claim in the left column, prose and
 * media in the right.
 */
export function Section({ id, label, claim, question, children }) {
  const register = useContext(RegistryContext)
  const labelId = `${id}-label`
  return (
    <section
      id={id}
      ref={(el) => register?.(id, el)}
      className={styles.section}
      // Receives focus when the sidebar jumps here. -1 keeps it out of the
      // normal tab order.
      tabIndex={-1}
      aria-labelledby={label ? labelId : undefined}
    >
      <div className={styles.sectionLeft}>
        {/* The eyebrow is the section's title as far as a reader is
            concerned — every case study is navigated by these labels — so
            it is a heading rather than a styled paragraph. Sections that
            also carry a claim keep the claim as the visible h2 and the
            label stays as the accessible name. */}
        {label && (
          claim || question
            ? <p className={styles.label} id={labelId}>{label}</p>
            : <h2 className={styles.label} id={labelId}>{label}</h2>
        )}
        {claim && <h2 className={styles.claim}>{claim}</h2>}
        {question && <h2 className={styles.question}>{question}</h2>}
      </div>
      <div className={styles.sectionRight}>{children}</div>
    </section>
  )
}

/** A bare mono line that splits the page into acts. */
export function Milestone({ children }) {
  return <p className={styles.milestone}>{children}</p>
}
