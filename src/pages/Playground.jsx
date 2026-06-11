import { useRef, useState, useEffect, useCallback } from 'react'
import { useInView } from '../hooks/useInView'
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
    sub: 'playable · drag card to move',
    link: null,
    x: 18, y: 210, rot: -0.8, w: 340,
    iframeNativeW: 1000, iframeNativeH: 600,
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
    x: 250, y: 450, rot: -1.2, w: 175,
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
  const [sectionRef, inView] = useInView()
  const [positions, setPositions] = useState(() =>
    Object.fromEntries(ITEMS.map(item => [item.id, { x: item.x, y: item.y }]))
  )
  const [zOrders, setZOrders] = useState(() =>
    Object.fromEntries(ITEMS.map((item, i) => [item.id, i + 1]))
  )
  const [topZ, setTopZ] = useState(ITEMS.length + 1)
  const [draggingId, setDraggingId] = useState(null)
  const [lightboxSrc, setLightboxSrc] = useState(null)
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
      const { moved, link, src } = drag.current
      if (!moved) {
        if (link) {
          window.open(link, '_blank', 'noopener,noreferrer')
        } else if (src) {
          setLightboxSrc(src)
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
  }, [])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setLightboxSrc(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

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
      src: item.src ?? null,
      startClientX: clientX,
      startClientY: clientY,
      startPosX: positions[item.id].x,
      startPosY: positions[item.id].y,
      moved: false,
    }
  }

  return (
    <section id="playground" className={`${styles.section} texture-parchment`} ref={sectionRef}>
      <div className={`${styles.inner} ${inView ? styles.visible : ''}`}>
        <SectionBanner sub="Side projects, experiments, and things that exist purely for fun">
          Playground
        </SectionBanner>

        <p className={styles.hint}>
          <span className={styles.hintDiamond}>◆</span>
          Drag things around · click images to expand · glowing items open externally
          <span className={styles.hintDiamond}>◆</span>
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
                item.link ? styles.cardLink : '',
                !item.link && item.src ? styles.cardExpandable : '',
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

              <div className={styles.meta}>
                <div className={styles.metaText}>
                  <span className={styles.label}>{item.label}</span>
                  {item.sub && <span className={styles.sub}>{item.sub}</span>}
                </div>
                {item.link && <span className={styles.linkArrow} aria-hidden="true">↗</span>}
                {!item.link && item.src && <span className={styles.expandIcon} aria-hidden="true">⊕</span>}
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
      {lightboxSrc && (
        <div
          className={styles.lightboxBackdrop}
          onClick={() => setLightboxSrc(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image expanded"
        >
          <button
            className={styles.lightboxClose}
            onClick={() => setLightboxSrc(null)}
            aria-label="Close"
          >✕</button>
          <img
            src={lightboxSrc}
            alt=""
            className={styles.lightboxImg}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
