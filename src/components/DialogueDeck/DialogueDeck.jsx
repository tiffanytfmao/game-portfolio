import DialogueBox from '../DialogueBox/DialogueBox'
import styles from './DialogueDeck.module.css'

/**
 * The reviews as a fanned hand of cards — all three readable at rest,
 * with the featured one squared up in the middle. Pointing at a card
 * pulls it out of the fan while the other two lean away and fade back.
 *
 * The cards themselves are inert. Hovering is handled by a matching set
 * of hit areas parked at the resting positions, because a card that
 * moves under the cursor drops its own hover and flickers.
 *
 * `featured` is the index that sits centre; cards before it fan left,
 * cards after it fan right.
 */
export default function DialogueDeck({ items, featured = 0 }) {
  const slotFor = i => (i === featured ? 'front' : i < featured ? 'left' : 'right')

  return (
    <div className={styles.wrap}>
      <div className={styles.deck}>
        {items.map((item, i) => (
          <div
            key={`card-${i}`}
            className={`${styles.card} ${styles[slotFor(i)]}`}
            tabIndex={0}
          >
            <DialogueBox {...item} index={i} />
          </div>
        ))}
        {items.map((item, i) => (
          <span
            key={`hit-${i}`}
            className={`${styles.hit} ${styles[slotFor(i)]}`}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className={styles.hint}>
        <span className={styles.hintDot} aria-hidden="true">◆</span> Hover a card to read it
      </p>
    </div>
  )
}
