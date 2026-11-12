/**
 * Scroll helpers shared by every in-page jump.
 *
 * When Lenis is running it owns the scroll position, so a native
 * `scrollIntoView({ behavior: 'smooth' })` fires a second, competing
 * animation and the two fight for the same pixels. Everything routes
 * through here so there is exactly one scroller at a time; the native
 * path is the fallback for reduced-motion sessions, where Lenis is
 * deliberately not mounted.
 */

let lenis = null

export function setLenis(instance) {
  lenis = instance
}

const NAV_OFFSET = -64

export function scrollToId(id, { offset = NAV_OFFSET } = {}) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, { offset })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/* `overflow: hidden` on the body doesn't hold the page still while Lenis is
   running: Lenis turns wheel input into programmatic scrolls, which ignore
   overflow. Dialogs pause it here so the page can't move underneath them. */
export function setScrollLocked(locked) {
  if (!lenis) return
  if (locked) lenis.stop()
  else lenis.start()
}

export function scrollToTop({ immediate = false } = {}) {
  if (lenis) {
    lenis.scrollTo(0, { immediate })
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
  }
}
