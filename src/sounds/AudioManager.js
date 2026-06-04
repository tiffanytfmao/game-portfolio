/* ────────────────────────────────────────────────────────────
   AudioManager — Web Audio API tone generator, no audio files
   All sounds are synthesized programmatically.
   Muted by default on mobile; respects user mute toggle.
   ──────────────────────────────────────────────────────────── */

let ctx = null
let muted = typeof window !== 'undefined'
  ? window.matchMedia('(pointer: coarse)').matches
  : true

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  return ctx
}

function resumeCtx() {
  const c = getCtx()
  if (c.state === 'suspended') c.resume()
  return c
}

function playTone({ freq = 440, type = 'sine', gain = 0.15, duration = 0.25, attack = 0.01, release = 0.2, delay = 0 } = {}) {
  if (muted) return
  try {
    const c = resumeCtx()
    const osc = c.createOscillator()
    const env = c.createGain()

    osc.connect(env)
    env.connect(c.destination)

    osc.type = type
    osc.frequency.setValueAtTime(freq, c.currentTime + delay)

    env.gain.setValueAtTime(0, c.currentTime + delay)
    env.gain.linearRampToValueAtTime(gain, c.currentTime + delay + attack)
    env.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + attack + release)

    osc.start(c.currentTime + delay)
    osc.stop(c.currentTime + delay + duration)
  } catch {
    // AudioContext blocked by browser policy — silently ignore
  }
}

/* ── Exported sound functions ── */

export function playLoadComplete() {
  // Gentle ascending chime C5 → E5 → G5
  playTone({ freq: 523.25, type: 'sine', gain: 0.12, duration: 0.4, release: 0.35, delay: 0 })
  playTone({ freq: 659.25, type: 'sine', gain: 0.10, duration: 0.4, release: 0.35, delay: 0.12 })
  playTone({ freq: 783.99, type: 'sine', gain: 0.09, duration: 0.5, release: 0.45, delay: 0.24 })
}

export function playNavClick() {
  // Soft click: short sine blip
  playTone({ freq: 698, type: 'sine', gain: 0.08, duration: 0.15, attack: 0.005, release: 0.12 })
}

export function playCardHover() {
  // Fairy-dust sparkle: high triangle
  playTone({ freq: 1046.5, type: 'triangle', gain: 0.05, duration: 0.2, attack: 0.01, release: 0.18 })
}

export function playButtonPress() {
  // Satisfying soft thunk
  playTone({ freq: 440, type: 'sine', gain: 0.1, duration: 0.1, attack: 0.005, release: 0.09 })
  playTone({ freq: 330, type: 'triangle', gain: 0.06, duration: 0.15, attack: 0.005, release: 0.14 })
}

export function playMew() {
  if (muted) return
  try {
    const c = resumeCtx()
    const osc = c.createOscillator()
    const g = c.createGain()
    osc.connect(g)
    g.connect(c.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(900, c.currentTime)
    osc.frequency.exponentialRampToValueAtTime(500, c.currentTime + 0.12)
    osc.frequency.exponentialRampToValueAtTime(750, c.currentTime + 0.22)
    g.gain.setValueAtTime(0.18, c.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.35)
    osc.start(c.currentTime)
    osc.stop(c.currentTime + 0.35)
  } catch {
    // silently ignore
  }
}

/* ── Mute control ── */
export function setMuted(value) { muted = value }
export function getMuted()      { return muted }
export function toggleMute()    { muted = !muted; return muted }
