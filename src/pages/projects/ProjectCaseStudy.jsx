import { useParams, Link } from 'react-router-dom'
import CatSprite from '../../components/CatSprite/CatSprite'
import WonderWorkshop from './WonderWorkshop'
import Cocoon from './Cocoon'
import Palbits from './Palbits'
import Berky from './Berky'
import styles from './ProjectCaseStudy.module.css'

const PROJECT_META = {
  wonder: {
    title: 'Wonder Workshop',
    subtitle: 'Game Design · UX/UI · Research · Children',
    emoji: '🌱',
    accent: '#7AAFC2',
    accentLight: '#C4DFE3',
    year: '2024',
    blurb: 'Designing a cozy game for encouraging the value of craft in young kids.',
  },
  cocoon: {
    title: 'Cocoon',
    subtitle: 'UX/UI · B2B · Startup',
    emoji: '🌿',
    accent: '#D4899A',
    accentLight: '#F2D0D8',
    year: '2023 – 2024',
    blurb: 'Leading the design of an in-product compliant Pregnancy Leave Tracker as lead designer and engineer.',
  },
  berky: {
    title: 'Berky the Worm',
    subtitle: 'UX/UI · Physical-Digital · Sustainability',
    emoji: '🐛',
    accent: '#8B9B5A',
    accentLight: '#D4DEAD',
    year: '2024',
    blurb: "How we turned Berkeley's composting crisis into a community playground.",
  },
  palbits: {
    title: 'Palbits',
    subtitle: 'Game Design · Physical-Digital · Research',
    emoji: '🎮',
    accent: '#9B8AB5',
    accentLight: '#E8E2F0',
    year: '2024',
    blurb: 'Transforming game controllers into evolving physical companions.',
  },
}

export default function ProjectCaseStudy() {
  const { id } = useParams()
  if (id === 'wonder') return <WonderWorkshop />
  if (id === 'cocoon') return <Cocoon />
  if (id === 'palbits') return <Palbits />
  if (id === 'berky') return <Berky />
  const meta = PROJECT_META[id] ?? {
    title: 'Project',
    subtitle: '',
    emoji: '✦',
    accent: '#D4899A',
    accentLight: '#F2D0D8',
    year: '',
    blurb: '',
  }

  return (
    <div className={styles.page}>
      {/* Hero banner */}
      <div
        className={styles.heroBanner}
        style={{ '--accent': meta.accent, '--accent-light': meta.accentLight }}
      >
        <Link to="/" className={styles.backBtn}>
          <span className={styles.backDiamond}>◆</span>
          Back to Home
        </Link>

        <div className={styles.heroContent}>
          <span className={styles.heroEmoji} aria-hidden="true">{meta.emoji}</span>
          <p className={styles.heroYear}>{meta.year}</p>
          <h1 className={styles.heroTitle}>{meta.title}</h1>
          <p className={styles.heroSubtitle}>{meta.subtitle}</p>
          {meta.blurb && <p className={styles.heroBlurb}>{meta.blurb}</p>}
        </div>
      </div>

      {/* Placeholder body */}
      <div className={styles.body}>
        <div className={styles.comingSoon}>
          <CatSprite variant="idle" size="lg" />
          <div className={styles.comingSoonText}>
            <h2 className={styles.comingSoonTitle}>Case Study Coming Soon</h2>
            <p className={styles.comingSoonDesc}>
              This case study is being crafted with care. Check back soon for the full deep-dive.
            </p>
            <Link to="/" className={styles.homeBtn}>
              <span>◆</span>
              Back to Portfolio
              <span>◆</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
