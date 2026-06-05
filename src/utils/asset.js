/**
 * Prepend Vite's base URL to a public-folder asset path.
 * Works correctly whether base is '/' (dev without base) or '/game-portfolio/' (GH Pages).
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

export function asset(path) {
  // strip leading slash if present, then prepend base
  return `${BASE}/${path.replace(/^\//, '')}`
}
