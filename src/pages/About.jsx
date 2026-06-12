import { useInView } from '../hooks/useInView'
import SectionBanner from '../components/SectionBanner/SectionBanner'
import QuestEntry from '../components/QuestEntry/QuestEntry'
import DialogueBox from '../components/DialogueBox/DialogueBox'
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
    desc: "Front End Engineering for Facebook's Meta <-> Facebook content creation team.",
    tags: ['Frontm End', 'Accessibility', 'Mobile'],
  },
  {
    year: '2018 – 2022',
    title: 'B.A. Computer Science',
    org: 'UC Berkeley',
    tags: ['Computer Science'],
  },
]

const SKILLS = [
  'Figma', 'Prototyping', 'User Research', 'Design Systems',
  'React', 'CSS / Animation', 'TypeScript', 'Node.js',
  'CAD', 'Game Design', 'Accessibility', 'Branding',
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
    <section id="about" className={`${styles.section} texture-crosshatch`} ref={ref}>
      <div className={`${styles.inner} ${inView ? styles.visible : ''}`}>
        <SectionBanner sub="The lore, the skills, the people who put up with me">
          About
        </SectionBanner>

        <div className={styles.layout}>
          {/* ── Left: timeline ── */}
          <div className={styles.timelineCol}>
            <h2 className={styles.colHeading}>
              <span className={styles.diamond}>◆</span> Quest Log
            </h2>
            <div className={styles.timeline}>
              {TIMELINE.map((entry, i) => (
                <QuestEntry key={entry.title} entry={entry} index={i} />
              ))}
            </div>
          </div>

          {/* ── Right: skills + testimonials ── */}
          <div className={styles.sideCol}>
            <div className={styles.skillsBlock}>
              <h2 className={styles.colHeading}>
                <span className={styles.diamond}>◆</span> Abilities
              </h2>
              <div className={styles.skills}>
                {SKILLS.map(s => (
                  <span key={s} className={styles.skill}>{s}</span>
                ))}
              </div>
            </div>

            <div className={styles.testimonialsBlock}>
              <h2 className={styles.colHeading}>
                <span className={styles.diamond}>◆</span> Party Reviews
              </h2>
              <div className={styles.testimonials}>
                {TESTIMONIALS.map((t, i) => (
                  <DialogueBox key={i} {...t} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
