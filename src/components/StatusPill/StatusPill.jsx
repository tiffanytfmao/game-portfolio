import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './StatusPill.module.css'

const CYCLE_MS = 8750

/* The lines the loader cycles through on its way in. They live here, beside
   the status lines, because both pills measure themselves against the same
   set — see `allRows`. */
export const bootMessages = [
  { label: 'Booting', value: 'warming up light mode' },
  { label: 'Booting', value: 'brewing a latte' },
  { label: 'Booting', value: 'aligning pixels' },
]

export const modes = [
  { label: 'Local time', dynamic: true },
  { label: 'Based in', value: 'Bay Area, CA' },
  { label: 'Currently', value: 'thinking about sushi' },
  { label: 'Currently', value: 'debugging in Figma' },
  { label: 'Currently', value: 'on my third latte' },
  { label: 'Currently', value: 'chasing a rogue pixel' },
]

/* Every line either pill can ever show. Both stack the whole list in one
   grid cell and reveal a single row, so the two pills are always exactly
   the same width — which is what lets the loader's pill fly in and land on
   the nav's without changing size. */
export const allRows = [...modes, ...bootMessages]

export const rowKey = (row) => (row.dynamic ? 'time' : `${row.label}-${row.value}`)

export function formatTime() {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date())
}

/**
 * The stacked rows shared by the nav pill and the loader's pill. Every row
 * sits in one grid cell at its own natural width; `activeKey` picks the one
 * that is visible, and the stack is given that row's width so the pill
 * shrink-wraps the line it is showing instead of standing at the width of
 * the longest one. The width is animated, so cycling reads as the pill
 * breathing rather than snapping.
 */
export function PillRows({ activeKey, time, styles: s }) {
  const stackRef = useRef(null)
  const [width, setWidth] = useState(null)

  // The clock's row changes width as the time does, so re-measure on the
  // value rather than just on which row is active.
  const measureOn = activeKey === 'time' ? time : activeKey

  useLayoutEffect(() => {
    const row = stackRef.current?.querySelector('[data-row-active]')
    if (!row) return

    // Nothing is measured until the real font is in: Satoshi is a little
    // wider than the fallback, and a width taken off the fallback's metrics
    // clips the line for as long as it takes to notice. Until then the
    // stack carries no width at all and sits at its widest row — too roomy
    // for one frame, which is the harmless way to be wrong.
    let live = true
    let fontsIn = !document.fonts || document.fonts.status === 'loaded'

    // A zero reading means the pill has no layout at all — a hidden tab, a
    // collapsed window, the breakpoint that drops it on narrow screens. It
    // is not a width, and letting it stick would collapse the pill.
    // offsetWidth, not getBoundingClientRect: the loader's pill flies in
    // under a scale(1.4), and a rect measured through that transform is
    // 1.4x too wide. offsetWidth is the untransformed layout width. The
    // spare pixel absorbs its rounding so a glyph can never catch the clip.
    const measure = () => {
      if (!live || !fontsIn) return
      const w = row.offsetWidth
      if (w > 0) setWidth(w + 1)
    }

    measure()
    // The row is `width: max-content`, so the width being set here can
    // never feed back into the size being observed.
    const observer = new ResizeObserver(measure)
    observer.observe(row)
    document.fonts?.ready.then(() => {
      fontsIn = true
      measure()
    })

    return () => {
      live = false
      observer.disconnect()
    }
  }, [measureOn])

  return (
    <span
      ref={stackRef}
      className={`${s.stack} ${width !== null ? s.stackMeasured : ''}`}
      style={width !== null ? { width } : undefined}
    >
      {allRows.map(row => {
        const key = rowKey(row)
        const active = key === activeKey
        return (
          <span
            key={key}
            data-row-active={active ? '' : undefined}
            aria-hidden={!active}
            className={`${s.row} ${active ? s.rowActive : ''}`}
          >
            <span className={s.label}>{row.label}</span>
            <span className={s.value}>{row.dynamic ? time : row.value}</span>
          </span>
        )
      })}
    </span>
  )
}

export default function StatusPill({ className = '' }) {
  const [index, setIndex] = useState(0)
  const [time, setTime] = useState(formatTime)

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime()), 1000)
    return () => clearInterval(id)
  }, [])

  // Auto-cycle; re-runs after every change (click or auto), so a click
  // resets the timer rather than leaving a half-elapsed one running.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setIndex(i => (i + 1) % modes.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [index])

  const active = modes[index]
  const activeValue = active.dynamic ? time : active.value

  return (
    <button
      type="button"
      data-status-pill
      onClick={() => setIndex(i => (i + 1) % modes.length)}
      aria-label={`${active.label}: ${activeValue}. Click to cycle status.`}
      className={`${styles.pill} ${className}`}
    >
      <span className={styles.dot} aria-hidden="true" />
      <PillRows activeKey={rowKey(active)} time={time} styles={styles} />
    </button>
  )
}
