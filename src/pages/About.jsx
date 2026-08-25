import { useInView } from '../hooks/useInView'
import SectionBanner from '../components/SectionBanner/SectionBanner'
import QuestEntry from '../components/QuestEntry/QuestEntry'
import DialogueDeck from '../components/DialogueDeck/DialogueDeck'
import { asset } from '../utils/asset'
import styles from './About.module.css'

const TIMELINE = [
  {
    year: '2024 – present',
    title: 'Masters of Design',
    org: 'UC Berkeley',
    desc: 'Focusing on interaction design, physical-digital experiences, and design for social impact.',
    tags: ['Interaction Design', 'Research', 'HCI'],
  },
  {
    year: '2023 – 2024',
    title: 'Design Engineer',
    org: 'Cocoon',
    desc: 'Designed and engineered a B2B leave tracker used by people teams at 50+ companies.',
    tags: ['Product Design', 'Design Systems', 'React', 'Brand Refresh'],
  },
  {
    year: '2022 – 2023',
    title: 'Software Engineer',
    org: 'Meta',
    desc: "Worked on accessibility improvements across Meta's internal systems.",
    tags: ['UX/UI', 'Accessibility', 'B2C'],
  },
  {
    year: '2021',
    title: 'iOS Software Engineering Intern',
    org: 'Meta',
    desc: "Front End Engineering for Facebook's Facebook ↔ Instagram content creation team.",
    tags: ['Frontm End', 'Accessibility', 'Mobile'],
  },
  {
    year: '2018 – 2022',
    title: 'B.A. Computer Science',
    org: 'UC Berkeley',
    tags: ['Computer Science'],
  },
]

/* Grouped like a skill tree: the three lenses I work across, with the
   ones I lead with marked as signature abilities. */
const SKILL_TREE = [
  {
    branch: 'Craft',
    skills: [
      { name: 'Interaction Design', signature: true },
      { name: 'Figma (components, prototyping)', signature: true },
      { name: 'Design Systems', signature: true },
      { name: 'Typography & Hierarchy' },
      { name: 'Motion & Micro-interactions' },
      { name: 'Accessibility' },
      { name: 'Branding' },
    ],
  },
  {
    branch: 'Build',
    skills: [
      { name: 'React', signature: true },
      { name: 'TypeScript', signature: true },
      { name: 'AI-Assisted Prototyping', signature: true },
      { name: 'CSS & Animation' },
      { name: 'iOS / Mobile Dev' },
      { name: 'React Native' },
      { name: 'Node.js' },
      { name: 'CAD' },
    ],
  },
  {
    branch: 'Judgment',
    skills: [
      { name: 'Product Thinking', signature: true },
      { name: 'Systems over Screens', signature: true },
      { name: 'User Research (qual + quant)' },
      { name: 'Emotional & Game Design' },
      { name: 'Design Critique' },
      { name: 'Shipping End-to-End' },
    ],
  },
]

const TESTIMONIALS = [
  {
    quote: "One thing I've always appreciated about her is her ability to consistently advocate for the user experience of the product. The way she approached asking her questions invited better discussions that always improved the product — a skill that will benefit her greatly in graduate school.",
    author: 'Product Designer',
    role: 'Cocoon',
  },
  {
    quote: "Tiffany was able to translate her knack for design into the technical domain, contributing to high-visibility and high-impact projects. She excelled at expressing complicated ideas through technical documents she presented to the engineering team during all-hands meetings.",
    author: 'Engineering Manager',
    role: 'Cocoon',
  },
  {
    quote: "Her willingness to dive into the technical details by leveraging her natural interest in design is a fantastic quality to have. Overall, Tiffany is a great design-focused engineer, and will do great in any design roles she decides to take on in the future!",
    author: 'Lead Engineer',
    role: 'Cocoon',
  },
]

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" className={`${styles.section}`} ref={ref}>
      <div className={`${styles.inner} ${inView ? styles.visible : ''}`}>
        <SectionBanner sub="The lore, the skills, the people who put up with me">
          About
        </SectionBanner>

        <div className={styles.layout}>
          {/* ── Left: timeline ── */}
          <div className={styles.timelineCol}>
            <h2 className={styles.colHeading}>
              <span className={styles.diamond} aria-hidden="true">◆</span> Quest Log
            </h2>
            <div className={styles.timeline}>
              {TIMELINE.map((entry, i) => (
                <QuestEntry key={entry.title} entry={entry} index={i} />
              ))}
            </div>

            {/* Fills the space the timeline leaves at the bottom of this
                column, where the testimonials opposite run longer. */}
            <div className={styles.polaroids}>
              <figure className={styles.polaroid} style={{ '--rot': '-3deg' }}>
                <img src={asset('portraits/tiff.jpg')} alt="Tiffany Mao" />
                <figcaption>hello!</figcaption>
              </figure>
              <figure className={styles.polaroid} style={{ '--rot': '2.5deg' }}>
                <img src={asset('portraits/portrait.png')} alt="Illustrated portrait of Tiffany" />
                <figcaption>me, but drawn</figcaption>
              </figure>
            </div>
          </div>

          {/* ── Right: skills + testimonials ── */}
          <div className={styles.sideCol}>
            <div className={styles.skillsBlock}>
              <h2 className={styles.colHeading}>
                <span className={styles.diamond} aria-hidden="true">◆</span> Abilities
              </h2>
              {SKILL_TREE.map(branch => (
                <div key={branch.branch} className={styles.branch}>
                  <span className={styles.branchName}>{branch.branch}</span>
                  <div className={styles.skills}>
                    {branch.skills.map(s => (
                      <span
                        key={s.name}
                        className={s.signature ? `${styles.skill} ${styles.signature}` : styles.skill}
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.testimonialsBlock}>
              <h2 className={styles.colHeading}>
                <span className={styles.diamond} aria-hidden="true">◆</span> Party Reviews
              </h2>
              <DialogueDeck items={TESTIMONIALS} featured={1} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
