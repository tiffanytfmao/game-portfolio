import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import SectionBanner from '../components/SectionBanner/SectionBanner'
import { playButtonPress } from '../sounds/AudioManager'
import styles from './Resume.module.css'

// ← Replace with your actual Google Drive shareable link
const RESUME_URL = 'https://drive.google.com/file/d/1DJJDYrscJ350p7JUuWpnL5qdI_uGEXon/view?usp=drive_link'

export default function Resume() {
  const [ref, inView] = useInView()
  const [lightboxOpen, setLightboxOpen] = useState(false)

  function openLightbox() {
    playButtonPress()
    setLightboxOpen(true)
  }
  function closeLightbox() {
    setLightboxOpen(false)
  }

  return (
    <section id="resume" className={`${styles.section} texture-crosshatch`} ref={ref}>
      <div className={`${styles.inner} ${inView ? styles.visible : ''}`}>
        <SectionBanner sub="The official document version of everything above">
          Resume
        </SectionBanner>

        <div className={styles.card}>
          {/* Clickable PDF preview */}
          <button
            className={styles.preview}
            onClick={openLightbox}
            aria-label="View resume"
          >
            <iframe
              src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
              className={styles.previewFrame}
              title="Resume preview"
              tabIndex={-1}
            />
            <div className={styles.previewOverlay}>
              <span className={styles.previewLabel}>Click to view ◆</span>
            </div>
          </button>

          <div className={styles.info}>
            <h2 className={styles.name}>Tiffany Mao</h2>
            <p className={styles.role}>UX Designer · Design Engineer</p>
            <p className={styles.updated}>Last updated May 2026</p>

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.viewBtn}
              onClick={() => playButtonPress()}
            >
              <span className={styles.diamond}>◆</span>
              View Resume
              <span className={styles.diamond}>◆</span>
            </a>

            <p className={styles.note}>
              Or{' '}
              <a href="#contact" className={styles.contactLink} onClick={e => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}>
                reach out directly
              </a>
              {' '}— I love a good chat.
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className={styles.lightboxBackdrop} onClick={closeLightbox}>
          <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close">
              ✕
            </button>
            <iframe
              src="/resume.pdf#toolbar=0"
              className={styles.lightboxFrame}
              title="Resume"
            />
          </div>
        </div>
      )}
    </section>
  )
}
