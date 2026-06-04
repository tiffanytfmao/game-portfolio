import { useInView } from '../hooks/useInView'
import SectionBanner from '../components/SectionBanner/SectionBanner'
import CatSprite from '../components/CatSprite/CatSprite'
import { playButtonPress } from '../sounds/AudioManager'
import styles from './Contact.module.css'

const EMAIL = 'tiffanytfmao@berkeley.edu'
const LINKEDIN = 'https://linkedin.com/in/tiffanytfmao'

export default function Contact() {
  const [ref, inView] = useInView()

  function handleEmail() {
    playButtonPress()
  }

  return (
    <section id="contact" className={`${styles.section} texture-dark`} ref={ref}>
      <div className={`${styles.inner} ${inView ? styles.visible : ''}`}>
        <SectionBanner sub="I love yapping." dark>
          Let's Chat
        </SectionBanner>

        <div className={styles.layout}>
          <div className={styles.catWrap} aria-hidden="true">
            <CatSprite variant="sitting" size="xl" />
            <div className={styles.speechBubble}>
              <span>currently thinking about sushi...</span>
              <div className={styles.bubbleTail} />
            </div>
          </div>

          <div className={styles.linksBlock}>
            <p className={styles.intro}>
              Whether you have a project in mind, want to grab coffee (virtually or otherwise),
              or just want to tell me about a cool game — I'm around.
            </p>

            <div className={styles.buttons}>
              <a
                href={`mailto:${EMAIL}`}
                className={styles.emailBtn}
                onClick={handleEmail}
              >
                <span className={styles.diamond}>◆</span>
                Say Hello
                <span className={styles.diamond}>◆</span>
              </a>

              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ghostBtn}
                onClick={() => playButtonPress()}
              >
                LinkedIn
              </a>
            </div>

            <p className={styles.email}>{EMAIL}</p>
          </div>
        </div>

        <footer className={styles.footer}>
          <span className={styles.footerDiamond}>✦</span>
          <span className={styles.footerText}>Designed & built by Tiffany Mao · {new Date().getFullYear()}</span>
          <span className={styles.footerDiamond}>✦</span>
        </footer>
      </div>
    </section>
  )
}
