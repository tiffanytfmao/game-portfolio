import { useInView } from '../hooks/useInView'
import CatSprite from '../components/CatSprite/CatSprite'
import { asset } from '../utils/asset'
import styles from './Hero.module.css'

export default function Hero() {
  const [ref, inView] = useInView()

  return (
    <section id="hero" className={`${styles.hero} texture-dots`} ref={ref}>
      <div className={`${styles.inner} ${inView ? styles.visible : ''}`}>

        {/* ── Left: portrait panel ── */}
        <aside className={styles.portraitPanel}>
          <div className={styles.flipWrapper}>
            <div className={styles.flipCard}>
              <div className={styles.flipFront}>
                <div className={styles.portraitFrame}>
                  <img src={asset('portrait.png')} alt="Tiffany Mao" className={styles.portraitImg} />
                </div>
              </div>
              <div className={styles.flipBack}>
                <div className={styles.portraitFrame}>
                  <img src={asset('tiff.jpg')} alt="Tiffany Mao" className={styles.portraitImg} />
                </div>
              </div>
            </div>
          </div>
          <h1 className={styles.name}>Tiffany Mao</h1>
          <p className={styles.nameRole}>UX Designer</p>
          <div className={styles.catWrap} aria-hidden="true">
            {/* TODO: replace with sprite sheet once provided */}
            <CatSprite variant="idle" size="md" />
          </div>
        </aside>

        {/* ── Center: bio ── */}
        <div className={styles.bio}>
          <h2 className={styles.bioHeadline}>
            I prototype feelings before I design products.
          </h2>
          <p className={styles.bioText}>
            Engineer-brained UX designer who designs and ships while exploring how play, motion, and interaction shape the way products feel.
          </p>
          <div className={styles.bioActions}>
            <a href="#contact" className={styles.primaryBtn} onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
              <span className={styles.btnDiamond}>◆</span>
              Let's chat
              <span className={styles.btnDiamond}>◆</span>
            </a>
            <a href="#work" className={styles.ghostBtn} onClick={e => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) }}>
              See my work
            </a>
          </div>
        </div>

        {/* ── Right: stat card ── */}
        <aside className={styles.statCard}>
          <div className={styles.statSection}>
            <span className={styles.statLabel}>Previously at</span>
            <ul className={styles.statList}>
              <li><span className={styles.statBadge}>Meta</span></li>
              <li><span className={styles.statBadge}>Cocoon</span></li>
              <li><span className={styles.statBadge}>SUSE</span></li>
            </ul>
          </div>
          <div className={styles.divider} />
          <div className={styles.statSection}>
            <span className={styles.statLabel}>Currently at</span>
            <p className={styles.statValue}>Masters of Design</p>
            <p className={styles.statMeta}>UC Berkeley · Expected Winter 2026</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.statSection}>
            <span className={styles.statLabel}>Status</span>
            <p className={styles.statusRow}>
              <span className={styles.statusDot} />
              Seeking Summer 2026 Internships
            </p>
          </div>
        </aside>

      </div>
    </section>
  )
}
