import styles from './SectionBanner.module.css'

export default function SectionBanner({ children, sub, dark = false }) {
  return (
    <div className={`${styles.wrap} ${dark ? styles.dark : ''}`}>
      <div className={styles.line} aria-hidden="true" />
      <div className={styles.center}>
        <span className={styles.diamond} aria-hidden="true">✦</span>
        <h2 className={styles.title}>{children}</h2>
        <span className={styles.diamond} aria-hidden="true">✦</span>
      </div>
      {sub && <p className={styles.sub}>{sub}</p>}
      <div className={styles.line} aria-hidden="true" />
    </div>
  )
}
