import { useRef, useState, useEffect } from 'react'
import styles from './CatSketchpad.module.css'

const CANVAS_W = 300
const CANVAS_H = 260

function extractSketchDataUrl(canvas) {
  const dpr = window.devicePixelRatio || 1
  const w = canvas.width
  const h = canvas.height
  const ctx = canvas.getContext('2d')
  const data = ctx.getImageData(0, 0, w, h).data
  let minX = w, maxX = 0, minY = h, maxY = 0
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] > 10) {
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }
  if (maxX <= minX || maxY <= minY) return canvas.toDataURL()
  const pad = Math.round(14 * dpr)
  const sx = Math.max(0, minX - pad)
  const sy = Math.max(0, minY - pad)
  const sw = Math.min(w, maxX + pad) - sx
  const sh = Math.min(h, maxY + pad) - sy
  const tmp = document.createElement('canvas')
  tmp.width = sw
  tmp.height = sh
  tmp.getContext('2d').drawImage(canvas, sx, sy, sw, sh, 0, 0, sw, sh)
  return tmp.toDataURL()
}

export default function CatSketchpad({ onSpriteCreated }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const isDrawingRef = useRef(false)
  const lastPosRef = useRef(null)
  const fadeTimerRef = useRef(null)
  const [hasStrokes, setHasStrokes] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [btnBounce, setBtnBounce] = useState(false)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    return () => clearTimeout(fadeTimerRef.current)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const dpr = window.devicePixelRatio || 1
    canvas.width = CANVAS_W * dpr
    canvas.height = CANVAS_H * dpr
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = '#1f1810'
    ctx.lineWidth = 3.5
    ctx.globalAlpha = 0.88
  }, [])

  function getCanvasPos(e) {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left) * (CANVAS_W / rect.width),
      y: (e.clientY - rect.top) * (CANVAS_H / rect.height),
    }
  }

  function onPointerDown(e) {
    e.preventDefault()
    isDrawingRef.current = true
    const pos = getCanvasPos(e)
    lastPosRef.current = pos
    const ctx = canvasRef.current.getContext('2d')
    ctx.beginPath()
    ctx.fillStyle = '#1f1810'
    ctx.globalAlpha = 0.88
    ctx.arc(pos.x, pos.y, 1.75, 0, Math.PI * 2)
    ctx.fill()
    if (!hasStrokes) setHasStrokes(true)
  }

  function onPointerMove(e) {
    if (!isDrawingRef.current) return
    e.preventDefault()
    const pos = getCanvasPos(e)
    const last = lastPosRef.current
    const ctx = canvasRef.current.getContext('2d')
    const midX = (last.x + pos.x) / 2
    const midY = (last.y + pos.y) / 2
    ctx.beginPath()
    ctx.moveTo(last.x, last.y)
    ctx.quadraticCurveTo(last.x, last.y, midX, midY)
    ctx.stroke()
    lastPosRef.current = pos
  }

  function onPointerUp() {
    isDrawingRef.current = false
    lastPosRef.current = null
  }

  function clearCanvas() {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasStrokes(false)
    setIsFading(false)
    clearTimeout(fadeTimerRef.current)
  }

  function handleBringToLife() {
    if (!hasStrokes || isShaking) return
    setBtnBounce(true)
    setTimeout(() => setBtnBounce(false), 500)
    const dataUrl = extractSketchDataUrl(canvasRef.current)
    const rect = containerRef.current.getBoundingClientRect()
    const origin = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height * 0.55,
    }
    // Clear immediately so the board feels responsive
    clearCanvas()
    setIsShaking(true)
    setTimeout(() => {
      setIsShaking(false)
      onSpriteCreated(dataUrl, origin)
    }, 580)
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.pad} ${isShaking ? styles.shaking : ''}`}
    >
      {/* Washi tape */}
      <div className={styles.washi} aria-hidden="true" />

      {/* Sparkles during bring-to-life */}
      {isShaking && (
        <div className={styles.sparkles} aria-hidden="true">
          {['✦','✧','✦','✧','✦','✧'].map((s, i) => (
            <span key={i} className={styles.sparkle} style={{ '--i': i }}>{s}</span>
          ))}
        </div>
      )}

      {/* Header */}
      <div className={styles.header}>
        <p className={styles.title}>
          Draw something!{' '}
        </p>
        <p className={styles.subtitle}>Then bring it to life. ✦</p>
      </div>

      {/* Canvas area */}
      <div className={styles.canvasWrap}>
        <span className={styles.paw} aria-hidden="true" />
        <canvas
          ref={canvasRef}
          className={`${styles.canvas} ${isFading ? styles.canvasFading : ''}`}
          style={{ width: CANVAS_W, height: CANVAS_H }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        />
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button className={styles.clearBtn} onClick={clearCanvas}>
          Clear <span className={styles.clearIcon}>↺</span>
        </button>
        <button
          className={`${styles.lifeBtn} ${!hasStrokes ? styles.lifeBtnOff : ''} ${btnBounce ? styles.lifeBtnBounce : ''}`}
          onClick={handleBringToLife}
          disabled={!hasStrokes}
        >
          <span className={styles.diamond}>◆</span>
          Bring it to life
          <span className={styles.diamond}>◆</span>
        </button>
      </div>
    </div>
  )
}
