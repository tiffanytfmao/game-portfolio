import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { asset } from '../../utils/asset'
import { playCardHover } from '../../sounds/AudioManager'
import styles from './NextCaseStudy.module.css'

// Order drives the "next case study" sequence (wraps around at the end).
// Kept in sync with the Featured Work grid.
const PROJECTS = [
  {
    id: 'tintura',
    title: 'Tintura',
    description: 'A diary that remembers moments by their colors — spec to shipped in two days.',
    tags: ['UX/UI', 'Web App', 'AI-Assisted'],
    accent: '#A8564B',
    accentLight: '#F1DED0',
    image: asset('tintura assets/thumb.png'),
  },
  {
    id: 'creativemode',
    title: 'YC Redesign',
    description: 'Rethinking how a YC-backed platform surfaces its best community creations.',
    tags: ['UX/UI', 'Discovery', 'SEO Strategy', 'Startup'],
    accent: '#2F5D45',
    accentLight: '#D5E8DC',
    image: asset('creativemode assets/thumb.png'),
  },
  {
    id: 'wonder',
    title: 'Wonder Workshop',
    description: 'Designing a cozy game for children about the slow joy of crafting things by hand.',
    tags: ['Game Design', 'UX/UI', 'Research'],
    accent: '#7AAFC2',
    accentLight: '#C4DFE3',
    video: asset('wonder workshop assets/gameplay video 2.mp4'),
  },
  {
    id: 'graft',
    title: 'Graft!',
    description: 'Game UI/UX for a cozy jam game about grafting plants to green the places that need it.',
    tags: ['Game Design', 'UX/UI', 'Unity'],
    accent: '#5E8C4E',
    accentLight: '#DCEAD2',
    image: asset('graft assets/title-menu.png'),
  },
  {
    id: 'cocoon',
    title: 'Cocoon',
    description: 'Helping startup HR teams stop drowning in spreadsheets when someone goes on leave.',
    tags: ['UX/UI', 'B2B', 'Startup'],
    accent: '#E58BA4',
    accentLight: '#F6D4DD',
    image: asset('cocoon assets/cocoon.gif'),
  },
  {
    id: 'berky',
    title: 'Berky the Worm',
    description: "Turning Berkeley's composting problem into a community playground.",
    tags: ['UX/UI', 'Physical-Digital', 'Sustainability'],
    accent: '#8B9B5A',
    accentLight: '#D4DEAD',
    video: asset('berky assets/berky thumbnail.mov'),
    image: asset('berky assets/mockup berky.png'),
  },
  {
    id: 'palbits',
    title: 'Palbits',
    description: 'What if your game controller evolved alongside you?',
    tags: ['Game Design', 'Physical-Digital', 'Research'],
    accent: '#9B8AB5',
    accentLight: '#E8E2F0',
    image: asset('palbit assets/kids using controller v2.png'),
  },
  {
    id: 'nudge',
    title: 'Nudge',
    description: 'Smart entryway furniture that reminds you before you forget — no screens involved.',
    tags: ['Physical-Digital', 'Research', 'Interaction Design'],
    accent: '#B9761F',
    accentLight: '#FAFAFA',
    image: asset('nudge assets/hook-box-wall.png'),
  },
]

function setVideoRef(el) {
  if (el) {
    el.muted = true
    el.play().catch(() => {})
  }
}

export default function NextCaseStudy({ currentId }) {
  const cardRef = useRef(null)
  const index = PROJECTS.findIndex((p) => p.id === currentId)
  if (index === -1) return null
  const next = PROJECTS[(index + 1) % PROJECTS.length]

  return (
    <section
      className={styles.wrap}
      style={{ '--accent': next.accent, '--accent-light': next.accentLight }}
    >
      <p className={styles.eyebrow}>See next</p>

      <Link
        to={`/projects/${next.id}`}
        className={styles.card}
        ref={cardRef}
        onMouseEnter={playCardHover}
      >
        <div className={styles.thumb}>
          {next.video ? (
            <video
              ref={setVideoRef}
              className={styles.media}
              src={next.video}
              poster={next.image}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : next.image ? (
            <img className={styles.media} src={next.image} alt="" />
          ) : (
            <div className={styles.mediaPlaceholder} />
          )}
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{next.title}</h3>
          <p className={styles.desc}>{next.description}</p>
          <div className={styles.tags}>
            {next.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
          <span className={styles.cta}>
            View case study <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </section>
  )
}
