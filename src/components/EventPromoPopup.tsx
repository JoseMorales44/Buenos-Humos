import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { MessageCircle, X } from './icons'

const SHOW_DELAY_MS = 10000
const WHATSAPP_NUMBER = '573165871602'

const texts = {
  es: {
    badge: 'Oferta de bienvenida',
    headline: 'Obtén un 10% de descuento en tu primera compra',
    sub: 'Escríbenos por WhatsApp y reclama tu descuento.',
    cta: 'Reclamar por WhatsApp',
    discount: '10%',
    off: 'DESCUENTO',
  },
  en: {
    badge: 'Welcome offer',
    headline: 'Get 10% off your first purchase',
    sub: 'Message us on WhatsApp to claim your discount.',
    cta: 'Claim on WhatsApp',
    discount: '10%',
    off: 'OFF',
  },
} as const

function waMessage(lang: string): string {
  if (lang === 'es') {
    return 'Hola, quiero reclamar mi 10% de descuento en mi primera compra en Buenos Humos.'
  }
  return 'Hi, I want to claim my 10% off on my first purchase at Buenos Humos.'
}

export function EventPromoPopup() {
  const { lang } = useApp()
  const reduceMotion = useReducedMotion()
  const t = texts[lang === 'es' ? 'es' : 'en']

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS)
    return () => clearTimeout(id)
  }, [])

  const dismiss = useCallback(() => {
    setOpen(false)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, dismiss])

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage(lang))}`

  const overlayMotion = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }

  const panelMotion = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.92, y: 24 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.92, y: 24 },
      }

  const modal = (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-promo-title"
          {...overlayMotion}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[52] flex min-h-[100dvh] w-full touch-manipulation flex-col items-center justify-center bg-black/75 dark:bg-black/85 backdrop-blur-sm p-4 overscroll-contain"
          onClick={() => dismiss()}
        >
          <motion.div
            {...panelMotion}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative mx-auto flex w-full max-w-md flex-col overflow-hidden rounded-xl border-4 border-black bg-white text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-zinc-950 dark:text-white dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => dismiss()}
              className="absolute right-2 top-2 z-20 flex min-h-[38px] min-w-[38px] touch-manipulation items-center justify-center rounded-full border-2 border-black bg-white p-1.5 text-black shadow-[2px_2px_0_0_#000] transition-colors hover:bg-pink-400 dark:border-white dark:bg-zinc-900 dark:text-white dark:shadow-[2px_2px_0_0_#fff] dark:hover:bg-pink-600"
              aria-label={lang === 'es' ? 'Cerrar' : 'Close'}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-col items-center gap-3 bg-gradient-to-br from-amber-400 via-orange-500 to-rose-600 px-5 py-7 text-center dark:from-amber-700 dark:via-orange-800 dark:to-rose-900">
              <span className="inline-block rounded border-2 border-black bg-white px-2.5 py-1 font-mono text-[10px] font-black uppercase tracking-wider text-black dark:bg-zinc-950 dark:text-white sm:text-xs">
                {t.badge}
              </span>
              <div className="flex items-baseline gap-1.5 text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.9)]">
                <span className="text-6xl font-black leading-none sm:text-7xl">{t.discount}</span>
                <span className="text-lg font-black leading-none sm:text-xl">{t.off}</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 px-5 py-5 text-center sm:px-6 sm:py-6">
              <h2
                id="event-promo-title"
                className="text-lg font-black leading-snug sm:text-xl"
              >
                {t.headline}
              </h2>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 sm:text-base">
                {t.sub}
              </p>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex min-h-[44px] w-full touch-manipulation items-center justify-center gap-2 rounded-lg border-2 border-black bg-[#25D366] py-2.5 text-sm font-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none sm:text-base"
              >
                <MessageCircle className="h-5 w-5 shrink-0" />
                {t.cta}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return createPortal(modal, document.body)
}
