import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { playCardHover } from '../../sounds/AudioManager'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import styles from './ProjectCard.module.css'

export default function ProjectCard({ project, index = 0, style = {} }) {
  const cardRef = useRef(null)
  const videoRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  function setVideoRef(el) {
    if (el) {
      el.muted = true
      // The autoPlay attribute alone is not enough — this ref handler calls
      // play() by hand, which would restart the loop no matter what the OS
      // setting says. It holds on the poster frame instead.
      if (reducedMotion) {
        el.pause()
        videoRef.current = el
        return
      }
      // Loop just the opening slice when a project asks for it (e.g. Berky's
      // 4-second intro), instead of playing the whole clip.
      if (project.loopDuration) {
        el.loop = false
        el.ontimeupdate = () => {
          if (el.currentTime >= project.loopDuration) {
            el.currentTime = 0
            el.play().catch(() => {})
          }
        }
      }
      el.play().catch(() => {})
    }
    videoRef.current = el
  }

  function handleMouseEnter() {
    playCardHover()
    cardRef.current?.classList.add(styles.hovered)
  }
  function handleMouseLeave() {
    cardRef.current?.classList.remove(styles.hovered)
  }

  return (
    <Link
      to={`/projects/${project.id}`}
      style={{ textDecoration: 'none' }}
    >
    <article
      ref={cardRef}
      className={styles.card}
      style={{
        '--delay': `${index * 80}ms`,
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail */}
      <div className={styles.thumb}>
        {project.video ? (
          <video
            ref={setVideoRef}
            className={styles.thumbVideo}
            src={project.video}
            // A looping thumbnail is decoration; the card's title and tags
            // carry the meaning, so under reduced motion it holds on the
            // first frame instead.
            autoPlay={!reducedMotion}
            loop
            muted
            playsInline
            aria-hidden="true"
          />
        ) : project.image && project.imageBounce ? (
          <div className={styles.thumbBounce}>
            <img src={project.image} alt="" />
          </div>
        ) : project.image ? (
          <img className={styles.thumbVideo} src={project.image} alt="" />
        ) : (
          <div className={styles.thumbPlaceholder}>
            <span className={styles.thumbIcon}>{'✦'}</span>
          </div>
        )}
        <div className={styles.thumbOverlay}>
          <span className={styles.viewLabel}>View project</span>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.desc}>{project.description}</p>
        <div className={styles.tags}>
          {project.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Polaroid stamp decoration */}
      <div className={styles.stamp} aria-hidden="true">✦</div>
    </article>
    </Link>
  )
}
