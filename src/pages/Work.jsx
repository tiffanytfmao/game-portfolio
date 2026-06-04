import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import SectionBanner from '../components/SectionBanner/SectionBanner'
import ProjectCard from '../components/ProjectCard/ProjectCard'
import styles from './Work.module.css'

const PROJECTS = [
    {
    id: 'wonder',
    title: 'Wonder Workshop',
    description: 'Designing a cozy game for encouraging the value of craft in young kids.',
    tags: ['Game Design', 'UX/UI', 'Research', 'Children'],
    emoji: '🌱',
    rotate: -1.5,
    category: 'uxui',
  },
  {
    
    id: 'cocoon',
    title: 'Cocoon — Series A Startup',
    description: 'Leading the design of an in-product compliant Pregnancy Leave Tracker as lead designer and engineer.',
    tags: ['UX/UI', 'B2B', 'Startup'],
    emoji: '🌱',
    rotate: -1.5,
    category: 'uxui',
  },
  {
    id: 'berky',
    title: 'Berky the Worm',
    description: 'How we turned Berkeley\'s composting crisis into a community playground.',
    tags: ['UX/UI', 'Physical-Digital', 'Sustainability'],
    emoji: '🐛',
    rotate: 1.2,
    category: 'uxui',
  },
  {
    id: 'palbits',
    title: 'Palbits',
    description: 'Transforming game controllers into evolving physical companions.',
    tags: ['Game Design', 'Physical-Digital', 'Research'],
    emoji: '🎮',
    rotate: -0.8,
    category: 'gamedesign',
  },
]

const FILTERS = [
  { id: 'all',        label: 'All' },
  { id: 'uxui',      label: 'UX/UI' },
  { id: 'gamedesign',label: 'Game Design' },
]

export default function Work() {
  const [filter, setFilter] = useState('all')
  const [ref, inView] = useInView()

  const visible = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter || p.tags.some(t => t.toLowerCase().replace(/[/\s]/g,'') === filter))

  return (
    <section id="work" className={`${styles.section} texture-parchment`} ref={ref}>
      <div className={styles.inner}>
        <SectionBanner sub="A selection of things I've built, shipped, and learned from">
          Selected Work
        </SectionBanner>

        {/* Filter tabs */}
        <div className={styles.filters} role="tablist" aria-label="Filter projects">
          {FILTERS.map(f => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              className={`${styles.filterTab} ${filter === f.id ? styles.filterActive : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className={`${styles.grid} ${inView ? styles.visible : ''}`}>
          {visible.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
