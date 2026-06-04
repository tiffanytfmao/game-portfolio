import styles from './QuestEntry.module.css'

export default function QuestEntry({ entry, index = 0 }) {
  return (
    <div
      className={styles.entry}
      style={{ '--delay': `${index * 100}ms` }}
    >
      <div className={styles.markerCol}>
        <div className={styles.dot} />
        <div className={styles.line} />
      </div>
      <div className={styles.body}>
        <span className={styles.year}>{entry.year}</span>
        <h3 className={styles.title}>{entry.title}</h3>
        <p className={styles.org}>{entry.org}</p>
        {entry.desc && <p className={styles.desc}>{entry.desc}</p>}
        {entry.tags && (
          <div className={styles.tags}>
            {entry.tags.map(t => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
