import { useEffect, useRef } from 'react'

const FOCUSABLE = [
  'a[href]', 'button:not([disabled])', 'input:not([disabled])',
  'select:not([disabled])', 'textarea:not([disabled])', 'iframe',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

/**
 * Dialog behaviour for the lightboxes: Escape to close, focus moved in on
 * open and returned to the trigger on close, Tab wrapped inside the dialog,
 * and the page behind it locked from scrolling.
 *
 * Without this a keyboard user opens a lightbox and their focus is still on
 * the page underneath — they tab through content they cannot see and have no
 * way to dismiss what is covering it.
 *
 * Returns a ref to put on the dialog's outermost element.
 */
export function useModal(open, onClose) {
  const dialogRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(() => {
    if (!open) return

    previouslyFocused.current = document.activeElement
    const node = dialogRef.current

    // Prefer the close button, so Escape has a visible equivalent under the
    // cursor from the very first keystroke.
    const first = node?.querySelector(FOCUSABLE)
    first?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !node) return

      const items = [...node.querySelectorAll(FOCUSABLE)].filter(
        el => el.offsetParent !== null || el === document.activeElement
      )
      if (items.length === 0) return
      const firstItem = items[0]
      const lastItem = items[items.length - 1]

      if (e.shiftKey && document.activeElement === firstItem) {
        e.preventDefault()
        lastItem.focus()
      } else if (!e.shiftKey && document.activeElement === lastItem) {
        e.preventDefault()
        firstItem.focus()
      }
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      previouslyFocused.current?.focus?.()
    }
  }, [open, onClose])

  return dialogRef
}
