import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import SectionBanner from '../components/SectionBanner/SectionBanner'
import ProjectCard from '../components/ProjectCard/ProjectCard'
import styles from './Work.module.css'

const PROJECTS = [
    {
    id: 'wonder',
    title: 'Wonder Workshop',
    description: 'Designing a cozy game for children about the slow joy of crafting things by hand.',
    tags: ['Game Design', 'UX/UI', 'Research', 'Children'],
    emoji: '🌱',
    rotate: -1.5,
    category: 'uxui',
  },
  {
    
    id: 'cocoon',
    title: 'Cocoon — Series A Startup',
    description: 'Helping startup HR teams stop drowning in spreadsheets when someone goes on leave.',
    tags: ['UX/UI', 'B2B', 'Startup'],
    emoji: '🌱',
    rotate: -1.5,
    category: 'uxui',
  },
  {
    id: 'berky',
    title: 'Berky the Worm',
    description: "Turning Berkeley's composting problem into a community playground.",
    tags: ['UX/UI', 'Physical-Digital', 'Sustainability'],
    emoji: '🐛',
    rotate: 1.2,
    category: 'uxui',
  },
  {
    id: 'palbits',
    title: 'Palbits',
    description: 'What if your game controller evolved alongside you?',
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
