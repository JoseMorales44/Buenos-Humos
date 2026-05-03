import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useApp } from '../context/AppContext'
import { MapPin, Menu, Moon, Sun, X } from './icons'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme, lang, toggleLang } = useApp()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  const texts = {
    es: {
      about: 'NOSOTROS',
      catalog: 'CATÁLOGO',
      autocultivo: 'AUTOCULTIVO',
      reels: 'REELS',
      locations: 'SEDES',
      contact: 'CONTACTO',
    },
    en: {
      about: 'ABOUT US',
      catalog: 'CATALOG',
      autocultivo: 'HOME GROW',
      reels: 'REELS',
      locations: 'LOCATIONS',
      contact: 'CONTACT',
    },
  }

  const t = texts[lang as keyof typeof texts]

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-black border-b-4 border-black dark:border-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="logo-texto text-3xl font-black uppercase text-black dark:text-white tracking-tighter">
              BUENOS HUMOS
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 mr-2">
              <button
                type="button"
                onClick={toggleLang}
                className="inline-flex items-center justify-center p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded leading-none"
                title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                aria-label={
                  lang === 'es' ? 'Idioma: Español. Cambiar a inglés' : 'Language: English. Switch to Spanish'
                }
              >
                <span className="inline-flex shrink-0" aria-hidden>
                  {lang === 'es' ? (
                    <Icon icon="circle-flags:co" width={24} height={24} className="shrink-0" />
                  ) : (
                    <Icon icon="circle-flags:us" width={24} height={24} className="shrink-0" />
                  )}
                </span>
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded text-black dark:text-white"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button
                type="button"
                onClick={() => scrollToSection('about')}
                className="font-bold hover:text-pink-600 transition-colors flex items-center gap-1 text-black dark:text-white"
              >
                {t.about}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('categories')}
                className="font-bold hover:text-pink-600 transition-colors flex items-center gap-1 text-black dark:text-white"
              >
                {t.catalog}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('autocultivo')}
                className="font-bold hover:text-pink-600 transition-colors flex items-center gap-1 text-black dark:text-white"
              >
                {t.autocultivo}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('reels')}
                className="font-bold hover:text-pink-600 transition-colors flex items-center gap-1 text-black dark:text-white"
              >
                {t.reels}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('locations')}
                className="font-bold hover:text-pink-600 transition-colors flex items-center gap-1 text-black dark:text-white"
              >
                <MapPin className="w-4 h-4" /> {t.locations}
              </button>
              <button
                type="button"
                onClick={() => window.open('https://wa.me/573165871602', '_blank')}
                className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 font-bold border-2 border-transparent hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
              >
                {t.contact}
              </button>
            </nav>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-black dark:text-white"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={lang === 'es' ? 'Menú de navegación' : 'Navigation menu'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex min-h-[100dvh] flex-col bg-white dark:bg-black md:hidden"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b-4 border-black px-4 dark:border-white">
              <span className="logo-texto text-xl font-black uppercase tracking-tighter text-black dark:text-white">
                BUENOS HUMOS
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleLang}
                  className="inline-flex items-center justify-center rounded p-2 leading-none hover:bg-gray-200 dark:hover:bg-zinc-800"
                  title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                  aria-label={
                    lang === 'es' ? 'Idioma: Español. Cambiar a inglés' : 'Language: English. Switch to Spanish'
                  }
                >
                  <span className="inline-flex shrink-0" aria-hidden>
                    {lang === 'es' ? (
                      <Icon icon="circle-flags:co" width={24} height={24} className="shrink-0" />
                    ) : (
                      <Icon icon="circle-flags:us" width={24} height={24} className="shrink-0" />
                    )}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="rounded p-2 text-black hover:bg-gray-200 dark:text-white dark:hover:bg-zinc-800"
                  aria-label={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
                >
                  {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded p-2 text-black hover:bg-gray-200 dark:text-white dark:hover:bg-zinc-800"
                  aria-label={lang === 'es' ? 'Cerrar menú' : 'Close menu'}
                >
                  <X className="h-8 w-8" />
                </button>
              </div>
            </div>

            <nav className="flex min-h-0 flex-1 flex-col justify-start gap-4 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4">
              <button
                type="button"
                onClick={() => scrollToSection('about')}
                className="text-left font-black text-3xl text-black hover:text-pink-600 dark:text-white dark:hover:text-pink-400"
              >
                {t.about}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('categories')}
                className="text-left font-black text-3xl text-black hover:text-pink-600 dark:text-white dark:hover:text-pink-400"
              >
                {t.catalog}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('autocultivo')}
                className="text-left font-black text-3xl text-black hover:text-pink-600 dark:text-white dark:hover:text-pink-400"
              >
                {t.autocultivo}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('reels')}
                className="text-left font-black text-3xl text-black hover:text-pink-600 dark:text-white dark:hover:text-pink-400"
              >
                {t.reels}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('locations')}
                className="text-left font-black text-3xl text-black hover:text-pink-600 dark:text-white dark:hover:text-pink-400"
              >
                {t.locations}
              </button>
            </nav>

            <div className="shrink-0 border-t-4 border-black p-4 pb-[max(1rem,env(safe-area-inset-bottom))] dark:border-white">
              <button
                type="button"
                onClick={() => {
                  window.open('https://wa.me/573165871602', '_blank')
                  setIsOpen(false)
                }}
                className="w-full border-4 border-black bg-black p-4 text-center font-black text-white transition-all hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
              >
                {t.contact}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
