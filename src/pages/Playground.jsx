import { useRef, useState, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'
import { useModal } from '../hooks/useModal'
import SectionBanner from '../components/SectionBanner/SectionBanner'
import CatSketchpad from '../components/CatSketchpad/CatSketchpad'
import FollowSketch from '../components/FollowSketch/FollowSketch'
import { asset } from '../utils/asset'
import styles from './Playground.module.css'

// Items shifted left to make room for the fixed sketchpad on the right (~x:670+)
const ITEMS = [
  {
    id: 'cat-tv',
    src: asset('playground assets/cat tv.png'),
    label: 'Cat Bed TV',
    sub: 'p5.js sketch',
    link: 'https://editor.p5js.org/tiffanytfmao/sketches/ADqW7Fvj4',
    x: 18, y: 28, rot: -1.5, w: 185,
  },
  {
    id: 'yoons-game',
    src: asset('playground assets/yoons game.png'),
    label: 'Help Me Yoon!',
    sub: 'web game',
    link: 'https://tiffanytfmao.github.io/help-me-yoon/',
    x: 222, y: 14, rot: 1.3, w: 195,
  },
  {
    id: 'p5-game',
    iframe: 'https://editor.p5js.org/tiffanytfmao/full/rFSOyoZZ6',
    label: 'Piggy the Kitty',
    sub: 'playable · Click card and use arrow keys to play!',
    link: null,
    x: 18, y: 210, rot: -0.8, w: 340,
    iframeNativeW: 1000, iframeNativeH: 600,
  },
  {
    id: 'nudge',
    src: asset('nudge assets/diffuser-side.png'),
    label: 'Nudge',
    sub: 'case study',
    to: '/projects/nudge',
    link: null,
    x: 668, y: 470, rot: -1.4, w: 200,
  },
  {
    id: 'sketch',
    src: asset('playground assets/sketch.png'),
    label: 'Sketches',
    sub: null,
    link: null,
    x: 380, y: 160, rot: -2, w: 142,
  },
  {
    id: 'spiderverse',
    src: asset('playground assets/spiderverse.png'),
    label: 'Spiderverse Fan Art',
    sub: null,
    link: null,
    x: 14, y: 470, rot: 1.8, w: 220,
  },
  {
    id: 'keycap',
    src: asset('playground assets/keycap design.png'),
    label: 'Keycap Design',
    sub: null,
    link: null,
    x: 250, y: 490, rot: -1.2, w: 175,
  },
  {
    id: 'a4',
    src: asset('playground assets/A4 - 4.png'),
    label: 'Print Design',
    sub: null,
    link: null,
    x: 448, y: 458, rot: 2.3, w: 130,
  },
]

export default function Playground() {
  const navigate = useNavigate()
  const [sectionRef, inView] = useInView()
  const [positions, setPositions] = useState(() =>
    Object.fromEntries(ITEMS.map(item => [item.id, { x: item.x, y: item.y }]))
  )
  const [zOrders, setZOrders] = useState(() =>
    Object.fromEntries(ITEMS.map((item, i) => [item.id, i + 1]))
  )
  const [topZ, setTopZ] = useState(ITEMS.length + 1)
  const [draggingId, setDraggingId] = useState(null)
  const [lightbox, setLightbox] = useState(null) // { src, label }
  const [followSketch, setFollowSketch] = useState(null) // { imageUrl, origin }
  const drag = useRef(null)

  const handleSpriteCreated = useCallback((imageUrl, origin) => {
    setFollowSketch({ imageUrl, origin })
  }, [])

  const handleFollowDone = useCallback(() => {
    setFollowSketch(null)
  }, [])

  useEffect(() => {
    function onMove(e) {
      if (!drag.current) return
      e.preventDefault()
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      const dx = clientX - drag.current.startClientX
      const dy = clientY - drag.current.startClientY
      if (Math.abs(dx) + Math.abs(dy) > 5) drag.current.moved = true
      const { id, startPosX, startPosY } = drag.current
      setPositions(p => ({
        ...p,
        [id]: { x: startPosX + dx, y: startPosY + dy },
      }))
    }

    function onUp() {
      if (!drag.current) return
      const { moved, link, to, src, label } = drag.current
      if (!moved) {
        if (to) {
          navigate(to)
        } else if (link) {
          window.open(link, '_blank', 'noopener,noreferrer')
        } else if (src) {
          setLightbox({ src, label })
        }
      }
      setDraggingId(null)
      drag.current = null
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [navigate])

  const closeLightbox = useCallback(() => setLightbox(null), [])
  const dialogRef = useModal(!!lightbox, closeLightbox)

  function startDrag(e, item) {
    // Don't initiate drag from inside the iframe
    if (item.iframe && e.target.tagName === 'IFRAME') return
    e.preventDefault()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const newZ = topZ + 1
    setTopZ(newZ)
    setZOrders(z => ({ ...z, [item.id]: newZ }))
    setDraggingId(item.id)
    drag.current = {
      id: item.id,
      link: item.link ?? null,
      to: item.to ?? null,
      src: item.src ?? null,
      label: item.label,
      startClientX: clientX,
      startClientY: clientY,
      startPosX: positions[item.id].x,
      startPosY: positions[item.id].y,
      moved: false,
    }
  }

  return (
    <section id="playground" className={`${styles.section}`} ref={sectionRef}>
      <div className={`${styles.inner} ${inView ? styles.visible : ''}`}>
        <SectionBanner sub="Side projects, experiments, and things that exist purely for fun">
          Playground
        </SectionBanner>

        <p className={styles.hint}>
          <span className={styles.hintDiamond} aria-hidden="true">◆</span>
          drag things around · click images to expand · play some games and have fun!
          <span className={styles.hintDiamond} aria-hidden="true">◆</span>
        </p>

        {/* Drag guard — prevents iframes from swallowing mousemove during drag */}
        {draggingId && <div className={styles.dragGuard} />}

        <div className={styles.corkboard}>
          <CatSketchpad onSpriteCreated={handleSpriteCreated} />

          {ITEMS.map(item => (
            <div
              key={item.id}
              className={[
                styles.card,
                item.link || item.to ? styles.cardLink : '',
                !item.link && !item.to && item.src ? styles.cardExpandable : '',
                item.iframe ? styles.cardEmbed : '',
                draggingId === item.id ? styles.cardDragging : '',
              ].join(' ')}
              style={{
                left: positions[item.id].x,
                top: positions[item.id].y,
                zIndex: draggingId === item.id ? 10001 : zOrders[item.id],
                '--rot': `${item.rot}deg`,
                width: `${item.w}px`,
              }}
              onMouseDown={e => startDrag(e, item)}
              onTouchStart={e => startDrag(e, item)}
            >
              <div className={styles.pin} aria-hidden="true" />

              {item.iframe ? (() => {
                const scale = item.iframeNativeW
                  ? item.w / item.iframeNativeW
                  : 1
                const displayH = item.iframeNativeH
                  ? Math.round(item.iframeNativeH * scale)
                  : (item.iframeH ?? 240)
                return (
                  <div
                    className={styles.embedWrap}
                    style={{ height: displayH }}
                  >
                    <iframe
                      src={item.iframe}
                      className={styles.embedFrame}
                      style={item.iframeNativeW ? {
                        width: item.iframeNativeW,
                        height: item.iframeNativeH,
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                      } : { height: item.iframeH }}
                      title={item.label}
                      allow="autoplay"
                      sandbox="allow-scripts allow-same-origin allow-forms"
                    />
                  </div>
                )
              })() : (
                <div className={styles.imgWrap}>
                  <img
                    src={item.src}
                    alt={item.label}
                    className={styles.img}
                    draggable={false}
                  />
                </div>
              )}

              {/* Dragging a pinned card is a mouse flourish, but opening the
                  thing it points at is the actual feature — and until this
                  existed it was reachable only by mousedown/mouseup on a div.
                  The caption is a real link or button so the whole board
                  works from the keyboard; the drag stays as enhancement. */}
              <div className={styles.meta}>
                {item.to ? (
                  <Link to={item.to} className={styles.metaAction} onMouseDown={e => e.stopPropagation()}>
                    <span className={styles.metaText}>
                      <span className={styles.label}>{item.label}</span>
                      {item.sub && <span className={styles.sub}>{item.sub}</span>}
                    </span>
                    <span className={styles.linkArrow} aria-hidden="true">→</span>
                  </Link>
                ) : item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.metaAction}
                    onMouseDown={e => e.stopPropagation()}
                  >
                    <span className={styles.metaText}>
                      <span className={styles.label}>{item.label}</span>
                      {item.sub && <span className={styles.sub}>{item.sub}</span>}
                    </span>
                    <span className={styles.linkArrow} aria-hidden="true">↗</span>
                  </a>
                ) : item.src ? (
                  <button
                    className={styles.metaAction}
                    onMouseDown={e => e.stopPropagation()}
                    onClick={() => setLightbox({ src: item.src, label: item.label })}
                    aria-haspopup="dialog"
                    aria-label={`Expand ${item.label}`}
                  >
                    <span className={styles.metaText}>
                      <span className={styles.label}>{item.label}</span>
                      {item.sub && <span className={styles.sub}>{item.sub}</span>}
                    </span>
                    <span className={styles.expandIcon} aria-hidden="true">⊕</span>
                  </button>
                ) : (
                  <span className={styles.metaAction}>
                    <span className={styles.metaText}>
                      <span className={styles.label}>{item.label}</span>
                      {item.sub && <span className={styles.sub}>{item.sub}</span>}
                    </span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {followSketch && (
        <FollowSketch
          imageUrl={followSketch.imageUrl}
          origin={followSketch.origin}
          onDone={handleFollowDone}
        />
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          ref={dialogRef}
          className={styles.lightboxBackdrop}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${lightbox.label} — expanded`}
        >
          <button
            className={styles.lightboxClose}
            onClick={closeLightbox}
            aria-label="Close expanded image"
          >✕</button>
          {/* The expanded image is the entire content of this dialog, so it
              is described rather than hidden as decoration. */}
          <img
            src={lightbox.src}
            alt={lightbox.label}
            className={styles.lightboxImg}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
