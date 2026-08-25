import styles from './DialogueBox.module.css'

export default function DialogueBox({ quote, author, role, index = 0 }) {
  return (
    <figure
      className={styles.box}
      style={{ '--delay': `${index * 120}ms` }}
    >
      <blockquote className={styles.quote}>
        {/* Typographic ornament around a quotation that <blockquote> already
            marks up. Announced as "quotation mark" twice per testimonial
            otherwise, and exempt from contrast as decoration. */}
        <span className={styles.openQuote} aria-hidden="true">"</span>
        {quote}
        <span className={styles.closeQuote} aria-hidden="true">"</span>
      </blockquote>
      <figcaption className={styles.attribution}>
        <span className={styles.diamond} aria-hidden="true">◆</span>
        <span className={styles.author}>{author}</span>
        {role && <span className={styles.role}> · {role}</span>}
      </figcaption>
      <div className={styles.tail} aria-hidden="true" />
    </figure>
  )
}
