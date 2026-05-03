import { useEffect, type CSSProperties } from 'react'
import { useApp } from '../context/AppContext'
import { INSTAGRAM_REELS } from '../data/instagramReels'

/** Full loop duration (two copies in DOM → one visible “lap” of all reels). ~42–60s typical. */
const MARQUEE_DURATION_SEC = 48

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } }
  }
}

let embedScriptPromise: Promise<void> | null = null

function ensureInstagramEmbedScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.instgrm?.Embeds) {
    window.instgrm.Embeds.process()
    return Promise.resolve()
  }
  if (embedScriptPromise) return embedScriptPromise
  embedScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[src*="instagram.com/embed.js"]')
    if (existing) {
      const finish = () => {
        window.instgrm?.Embeds?.process()
        resolve()
      }
      if (window.instgrm?.Embeds) finish()
      else existing.addEventListener('load', finish, { once: true })
      return
    }
    const s = document.createElement('script')
    s.src = 'https://www.instagram.com/embed.js'
    s.async = true
    s.onload = () => {
      window.instgrm?.Embeds?.process()
      resolve()
    }
    s.onerror = () => reject(new Error('Instagram embed.js failed to load'))
    document.body.appendChild(s)
  })
  return embedScriptPromise
}

const texts = {
  es: {
    title: 'Reels',
    subtitle: 'Lo último en Instagram',
  },
  en: {
    title: 'Reels',
    subtitle: 'Latest on Instagram',
  },
} as const

export function InstagramReelsMarquee() {
  const { lang } = useApp()
  const t = texts[lang === 'es' ? 'es' : 'en']

  /** Duplicated sequence for seamless CSS loop (translate -50%). */
  const loop = [...INSTAGRAM_REELS, ...INSTAGRAM_REELS]

  useEffect(() => {
    let cancelled = false
    let tid: ReturnType<typeof setTimeout>
    ensureInstagramEmbedScript()
      .then(() => {
        if (cancelled) return
        tid = setTimeout(() => window.instgrm?.Embeds?.process(), 150)
      })
      .catch(() => {})
    return () => {
      cancelled = true
      if (tid) clearTimeout(tid)
    }
  }, [])

  return (
    <section
      id="reels"
      className="relative border-y-4 border-black bg-gray-100 py-12 dark:border-white dark:bg-zinc-900"
      aria-label={t.title}
    >
      <div className="mx-auto mb-8 max-w-7xl px-4 text-center sm:px-6">
        <p className="font-mono text-xs font-black uppercase tracking-[0.25em] text-pink-600 dark:text-pink-400">
          Instagram
        </p>
        <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-black dark:text-white md:text-4xl">
          {t.title}
        </h2>
        <p className="mt-2 text-sm font-bold text-gray-600 dark:text-gray-400">{t.subtitle}</p>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="instagram-marquee-track gap-6 px-4 sm:gap-8 sm:px-6"
          style={{ ['--instagram-marquee-duration' as string]: `${MARQUEE_DURATION_SEC}s` } as CSSProperties}
        >
          {loop.map((permalink, i) => (
            <div
              key={`${permalink}-${i}`}
              className="w-[min(100vw-2rem,326px)] shrink-0 sm:w-[326px]"
            >
              <div className="overflow-hidden rounded-xl border-4 border-black bg-white shadow-[6px_6px_0_0_#000] dark:border-white dark:bg-zinc-950 dark:shadow-[6px_6px_0_0_#fff]">
                <blockquote
                  className="instagram-media !m-0 min-w-[260px] max-w-[540px] !w-full"
                  data-instgrm-permalink={permalink}
                  data-instgrm-version="14"
                  suppressHydrationWarning
                ></blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-2xl px-4 text-center text-xs text-gray-500 dark:text-gray-500">
        {lang === 'es'
          ? 'Si no ves los videos, desactiva bloqueadores o abre Instagram en otra pestaña.'
          : 'If embeds do not load, try disabling blockers or open Instagram in another tab.'}
      </p>
    </section>
  )
}
