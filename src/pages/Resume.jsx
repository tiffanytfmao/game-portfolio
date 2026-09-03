import { useState, useCallback } from 'react'
import { useInView } from '../hooks/useInView'
import { useModal } from '../hooks/useModal'
import SectionBanner from '../components/SectionBanner/SectionBanner'
import { playButtonPress } from '../sounds/AudioManager'
import { asset } from '../utils/asset'
import styles from './Resume.module.css'
import { scrollToId } from '../utils/scroll'

// ← Replace with your actual Google Drive shareable link
const RESUME_URL = 'https://drive.google.com/file/d/1diZ5ETbvC_bKFrQBdzPardxKEMDX6qPq/view?usp=sharing'

export default function Resume() {
  const [ref, inView] = useInView()
  const [lightboxOpen, setLightboxOpen] = useState(false)

  function openLightbox() {
    playButtonPress()
    setLightboxOpen(true)
  }
  const closeLightbox = useCallback(() => setLightboxOpen(false), [])
  const dialogRef = useModal(lightboxOpen, closeLightbox)

  return (
    <section id="resume" className={`${styles.section}`} ref={ref}>
      <div className={`${styles.inner} ${inView ? styles.visible : ''}`}>
        <SectionBanner sub="The official document version of everything above">
          Resume
        </SectionBanner>

        <div className={styles.card}>
          {/* Clickable PDF preview. The frame is decoration sitting behind a
              real button — an <iframe> nested inside a <button> is invalid
              and eats the clicks and keystrokes meant for the control. */}
          <div className={styles.preview}>
            <iframe
              src={asset('docs/resume.pdf') + '#toolbar=0&navpanes=0&scrollbar=0'}
              className={styles.previewFrame}
              title="Resume preview"
              tabIndex={-1}
              aria-hidden="true"
            />
            <button
              className={styles.previewOverlay}
              onClick={openLightbox}
              aria-label="View resume full size"
              aria-haspopup="dialog"
            >
              <span className={styles.previewLabel}>Click to view ◆</span>
            </button>
          </div>

          <div className={styles.info}>
            <h2 className={styles.name}>Tiffany Mao</h2>
            <p className={styles.role}>UX Designer · Design Engineer</p>
            <p className={styles.updated}>Last updated September 2026</p>

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.viewBtn}
              onClick={() => playButtonPress()}
            >
              <span className={styles.diamond} aria-hidden="true">◆</span>
              View Resume
              <span className={styles.diamond} aria-hidden="true">◆</span>
            </a>

            <p className={styles.note}>
              Or{' '}
              <a href="#contact" className={styles.contactLink} onClick={e => {
                e.preventDefault()
                scrollToId('contact')
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
        <div
          ref={dialogRef}
          className={styles.lightboxBackdrop}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Resume"
        >
          <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close resume">
              ✕
            </button>
            <iframe
              src={asset('docs/resume.pdf') + '#toolbar=0'}
              className={styles.lightboxFrame}
              title="Resume"
            />
            <p className={styles.lightboxNote}>
              Press <kbd>Esc</kbd> to close, or{' '}
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                open the PDF in a new tab
              </a>.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
