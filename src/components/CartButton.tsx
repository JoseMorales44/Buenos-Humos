import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { useCartStore } from '../stores/cartStore'
import { MessageCircle, ShoppingCart, Trash, X } from './icons'

const WHATSAPP_NUMBER = '573165871602'

function buildBulkWaLink(items: { name: string; nameEn: string }[], lang: string) {
  const greeting = lang === 'es'
    ? 'Hola Buenos Humos, quiero consultar por estos productos:'
    : 'Hi Buenos Humos, I would like to ask about these products:'
  const lines = items.map((p, i) => `${i + 1}. ${lang === 'es' ? p.name : p.nameEn}`)
  const msg = [greeting, '', ...lines].join('\n')
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

export function CartButton() {
  const { lang } = useApp()
  const items = useCartStore((s) => s.items)
  const isOpen = useCartStore((s) => s.isOpen)
  const open = useCartStore((s) => s.open)
  const close = useCartStore((s) => s.close)
  const remove = useCartStore((s) => s.remove)
  const clear = useCartStore((s) => s.clear)

  const count = items.length

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [isOpen, close])

  const t = lang === 'es'
    ? {
        cart: 'Mi pedido',
        empty: 'Aún no has agregado productos.',
        emptyHint: 'Toca “Agregar” en los productos del catálogo.',
        clear: 'Vaciar',
        send: 'Enviar por WhatsApp',
        remove: 'Quitar',
        close: 'Cerrar',
        items: (n: number) => `${n} ${n === 1 ? 'producto' : 'productos'}`,
      }
    : {
        cart: 'My order',
        empty: 'You have not added products yet.',
        emptyHint: 'Tap “Add” on catalog products.',
        clear: 'Clear',
        send: 'Send via WhatsApp',
        remove: 'Remove',
        close: 'Close',
        items: (n: number) => `${n} ${n === 1 ? 'product' : 'products'}`,
      }

  return (
    <>
      <AnimatePresence>
        {count > 0 && (
          <motion.button
            key="cart-fab"
            type="button"
            onClick={open}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`${t.cart} (${count})`}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border-4 border-black bg-pink-500 px-5 py-3 font-black uppercase text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
          >
            <ShoppingCart width="20" height="20" />
            <span className="text-sm">{t.cart}</span>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-black px-1.5 text-xs font-black text-white dark:bg-white dark:text-black">
              {count}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-4"
            onClick={close}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border-4 border-pink-500 bg-white text-black shadow-[0px_0px_0px_4px_rgba(0,0,0,1)] dark:bg-black dark:text-white dark:shadow-[0px_0px_0px_4px_rgba(255,255,255,1)] sm:rounded-2xl"
            >
              <header className="flex items-center justify-between border-b-4 border-black bg-pink-500 px-5 py-4 text-white dark:border-white">
                <div className="flex items-center gap-3">
                  <ShoppingCart width="22" height="22" />
                  <div>
                    <h3 className="text-lg font-black uppercase leading-tight">{t.cart}</h3>
                    <p className="font-mono text-[11px] uppercase tracking-widest opacity-90">
                      {t.items(count)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label={t.close}
                  className="rounded-full border-2 border-black bg-white p-1.5 text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none dark:border-white dark:bg-black dark:text-white dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]"
                >
                  <X />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto p-4 sm:p-5">
                {count === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                    <ShoppingCart width="48" height="48" className="text-gray-400" />
                    <p className="font-black uppercase">{t.empty}</p>
                    <p className="font-mono text-sm text-gray-500 dark:text-gray-400">{t.emptyHint}</p>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {items.map((p) => (
                      <li
                        key={p.slug}
                        className="flex items-center gap-3 border-2 border-black bg-gray-50 p-2 dark:border-white dark:bg-zinc-900"
                      >
                        <div className="h-14 w-14 shrink-0 overflow-hidden border-2 border-black bg-white dark:border-white dark:bg-zinc-800">
                          {p.image ? (
                            <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-2xl">{p.icon}</div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400">
                            {lang === 'es' ? p.categoryTitle : p.categoryTitleEn}
                          </p>
                          <p className="truncate font-black uppercase">
                            {lang === 'es' ? p.name : p.nameEn}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(p.slug)}
                          aria-label={`${t.remove}: ${p.name}`}
                          className="shrink-0 border-2 border-black bg-white p-2 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none dark:border-white dark:bg-zinc-900 dark:text-white dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                        >
                          <Trash width="16" height="16" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {count > 0 && (
                <footer className="flex flex-col gap-3 border-t-4 border-black bg-gray-50 p-4 dark:border-white dark:bg-zinc-900 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={clear}
                    className="flex items-center justify-center gap-2 border-2 border-black bg-white px-4 py-3 font-black uppercase text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none dark:border-white dark:bg-black dark:text-white dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]"
                  >
                    <Trash width="16" height="16" />
                    {t.clear}
                  </button>
                  <a
                    href={buildBulkWaLink(items, lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 border-4 border-black bg-[#25D366] px-4 py-3 font-black uppercase text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                  >
                    <MessageCircle />
                    {t.send}
                  </a>
                </footer>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
