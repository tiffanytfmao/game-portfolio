import styles from './DialogueBox.module.css'

export default function DialogueBox({ quote, author, role, index = 0 }) {
  return (
    <figure
      className={styles.box}
      style={{ '--delay': `${index * 120}ms` }}
    >
      <blockquote className={styles.quote}>
        <span className={styles.openQuote}>"</span>
        {quote}
        <span className={styles.closeQuote}>"</span>
      </blockquote>
      <figcaption className={styles.attribution}>
        <span className={styles.diamond}>◆</span>
        <span className={styles.author}>{author}</span>
        {role && <span className={styles.role}> · {role}</span>}
      </figcaption>
      <div className={styles.tail} aria-hidden="true" />
    </figure>
  )
}
