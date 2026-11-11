import { useEffect } from 'react'

// Keep in sync with <title> in index.html.
export const SITE_TITLE = 'Tiffany Mao — Product Designer'

/**
 * Names the tab after the page that's open. App's RouteChange reads
 * document.title to announce each navigation, so without this every case
 * study was announced as the home page. Restores the site title on unmount
 * so going back home names the home page again.
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Tiffany Mao` : SITE_TITLE
    return () => { document.title = SITE_TITLE }
  }, [title])
}
