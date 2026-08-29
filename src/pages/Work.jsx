import { useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useInView } from '../hooks/useInView'
import ProjectCard from '../components/ProjectCard/ProjectCard'
import styles from './Work.module.css'
import { asset } from '../utils/asset'
import { scrollToId } from '../utils/scroll'

// `featured` drives the default "Selected Work" tab.
// `categories` lets a project live in more than one tab — Wonder Workshop is
// both featured and a game; Palbits is both a game and physical-digital.
const PROJECTS = [
  {
    id: 'wonder',
    title: 'Wonder Workshop',
    description: 'Designing a cozy game for children about the slow joy of crafting things by hand.',
    tags: ['Game Design', 'UX/UI', 'Research', 'Children'],
    video: asset('wonder workshop assets/gameplay video 2.mp4'),
    // Wonder has no still of its own, so the card would be an empty box for
    // as long as the clip takes to decode — and permanently wherever
    // autoplay is refused. This frame is the video's own opening beat.
    poster: asset('wonder workshop assets/gameplay 2.jpeg'),
    rotate: -1.5,
    featured: true,
    categories: ['games'],
  },
  {
    id: 'cocoon',
    title: 'Cocoon — Series A Startup',
    description: 'Helping startup HR teams stop drowning in spreadsheets when someone goes on leave.',
    tags: ['UX/UI', 'B2B', 'Startup'],
    image: asset('cocoon assets/cocoon.gif'),
    rotate: -1.5,
    featured: true,
    categories: ['product'],
  },
  {
    id: 'graft',
    title: 'Graft!',
    description: 'Game UI/UX for a cozy jam game about grafting plants to green the places that need it.',
    tags: ['Game Design', 'UX/UI', 'Unity'],
    image: asset('graft assets/title-menu.png'),
    rotate: 1.0,
    categories: ['games'],
  },
  {
    id: 'creativemode',
    title: 'YC Redesign',
    description: 'Rethinking how a YC-backed platform surfaces its best community creations.',
    tags: ['UX/UI', 'Discovery', 'SEO Strategy', 'Startup'],
    image: asset('creativemode assets/thumb.png'),
    rotate: -1.0,
    featured: true,
    categories: ['product'],
  },
  {
    id: 'tintura',
    title: 'Tintura',
    description: 'A diary that remembers moments by their colors — spec to shipped in two days.',
    tags: ['UX/UI', 'Web App', 'AI-Assisted'],
    image: asset('tintura assets/thumb.png'),
    rotate: 1.0,
    categories: ['product'],
  },
  {
    id: 'berky',
    title: 'Berky the Worm',
    description: "Turning Berkeley's composting problem into a community playground.",
    tags: ['UX/UI', 'Physical-Digital', 'Sustainability'],
    image: asset('berky assets/mockup berky.png'),
    video: asset('berky assets/berky thumbnail.mov'),
    loopDuration: 4,
    rotate: 1.2,
    featured: true,
    categories: ['physical'],
  },
  {
    id: 'nudge',
    title: 'Nudge',
    description: 'Smart entryway furniture that reminds you before you forget — no screens involved.',
    tags: ['Physical-Digital', 'Research', 'Interaction Design', 'Ambient Computing'],
    image: asset('nudge assets/hook-box-wall.png'),
    rotate: 1.4,
    categories: ['physical'],
  },
  {
    id: 'palbits',
    title: 'Palbits',
    description: 'What if your game controller evolved alongside you?',
    tags: ['Game Design', 'Physical-Digital', 'Research'],
    image: asset('palbit assets/kids using controller v2.png'),
    rotate: -0.8,
    categories: ['physical'],
  },
]

// Small playable things, surfaced inside the Game Design tab so a games
// hiring manager doesn't have to reach the Playground to find them.
const PLAYABLES = [
  {
    id: 'piggy',
    label: 'Piggy the Kitty',
    sub: 'p5.js · arrow keys',
    emoji: '🐱',
    link: 'https://editor.p5js.org/tiffanytfmao/full/rFSOyoZZ6',
  },
  {
    id: 'yoon',
    label: 'Help Me Yoon!',
    sub: 'web game',
    emoji: '🕹️',
    image: asset('playground assets/yoons game.png'),
    link: 'https://tiffanytfmao.github.io/help-me-yoon/',
  },
  {
    id: 'cat-tv',
    label: 'Cat Bed TV',
    sub: 'p5.js sketch',
    emoji: '📺',
    image: asset('playground assets/cat tv.png'),
    link: 'https://editor.p5js.org/tiffanytfmao/sketches/ADqW7Fvj4',
  },
]

const TABS = [
  { id: 'selected', label: 'Selected Work' },
  { id: 'games',    label: 'Game Design' },
  { id: 'product',  label: 'Product Design' },
  { id: 'physical', label: 'Digital-Physical' },
]

const DEFAULT_TAB = 'selected'

export default function Work() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [ref, inView] = useInView()
  const didDeepLinkScroll = useRef(false)

  const paramTab = searchParams.get('tab')
  const tab = TABS.some(t => t.id === paramTab) ? paramTab : DEFAULT_TAB

  function selectTab(id) {
    const next = new URLSearchParams(searchParams)
    if (id === DEFAULT_TAB) next.delete('tab')
    else next.set('tab', id)
    setSearchParams(next, { replace: true })
  }

  // Someone arriving on /?tab=games lands at the top of the page — bring them
  // down to the grid they asked for. Only ever fires once, on first load.
  useEffect(() => {
    if (didDeepLinkScroll.current) return
    didDeepLinkScroll.current = true
    if (!paramTab || paramTab === DEFAULT_TAB) return
    const el = document.getElementById('work')
    if (!el) return
    // Let the loading screen finish before jumping.
    const t = setTimeout(() => {
      scrollToId(el.id)
    }, 400)
    return () => clearTimeout(t)
  }, [paramTab])

  const visible = useMemo(() => (
    tab === 'selected'
      ? PROJECTS.filter(p => p.featured)
      : PROJECTS.filter(p => p.categories.includes(tab))
  ), [tab])

  return (
    <section id="work" className={`${styles.section}`} ref={ref}>
      <div className={styles.inner}>
        {/* Filter tabs — these double as the section header now that the
            "Featured work" eyebrow is gone, which is what buys the vertical
            room for the card tops to clear the fold. The section still needs
            a name and a rung on the heading ladder, so the h2 is present but
            only read aloud. */}
        <h2 className="visually-hidden" id="work-heading">Work</h2>

        {/* These were role="tab" without a tabpanel or arrow-key handling,
            which promises a keyboard contract the component does not honour.
            They are filter toggles, so they say so. */}
        <div className={styles.filters} role="group" aria-labelledby="work-filter-label">
          <span className="visually-hidden" id="work-filter-label">Filter projects</span>
          {TABS.map(t => (
            <button
              key={t.id}
              aria-pressed={tab === t.id}
              className={`${styles.filterTab} ${tab === t.id ? styles.filterActive : ''}`}
              onClick={() => selectTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className={`${styles.grid} ${inView ? styles.visible : ''}`}>
          {visible.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* Swapping the filter silently replaces the grid. This says what
            happened for anyone who cannot see it change. */}
        <p className="visually-hidden" role="status" aria-live="polite">
          {`${visible.length} project${visible.length === 1 ? '' : 's'} shown`}
        </p>

        {tab === 'games' && (
          <div className={styles.playables}>
            <p className={styles.playablesLabel}>
              <span aria-hidden="true">▶</span> Playable
            </p>
            <div className={styles.playablesGrid}>
              {PLAYABLES.map(p => (
                <a
                  key={p.id}
                  className={styles.playable}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.playableThumb}>
                    {p.image
                      ? <img src={p.image} alt="" className={styles.playableImg} />
                      : <span className={styles.playableEmoji} aria-hidden="true">{p.emoji}</span>}
                  </span>
                  <span className={styles.playableText}>
                    <span className={styles.playableLabel}>{p.label}</span>
                    <span className={styles.playableSub}>{p.sub}</span>
                  </span>
                  <span className={styles.playableArrow} aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
