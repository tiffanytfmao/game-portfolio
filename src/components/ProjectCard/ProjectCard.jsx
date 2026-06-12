import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { playCardHover } from '../../sounds/AudioManager'
import styles from './ProjectCard.module.css'

export default function ProjectCard({ project, index = 0, style = {} }) {
  const cardRef = useRef(null)
  const videoRef = useRef(null)

  function setVideoRef(el) {
    if (el) {
      el.muted = true
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
        '--rotate': `${project.rotate ?? 0}deg`,
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
            autoPlay
            loop
            playsInline
          />
        ) : project.image && project.imageBounce ? (
          <div className={styles.thumbBounce}>
            <img src={project.image} alt="" />
          </div>
        ) : project.image ? (
          <img className={styles.thumbVideo} src={project.image} alt="" />
        ) : (
          <div className={styles.thumbPlaceholder}>
            <span className={styles.thumbIcon}>{project.emoji ?? '✦'}</span>
          </div>
        )}
        <div className={styles.thumbOverlay}>
          <span className={styles.viewLabel}>View project ◆</span>
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
