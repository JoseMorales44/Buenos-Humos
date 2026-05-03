import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { Rocket } from './icons'

export function Hero() {
  const { lang } = useApp()

  const texts = {
    es: {
      title1: 'TU CONEXIÓN',
      title2: 'CON OTROS',
      title3: 'VIAJEROS',
      subtitle: 'Elevamos la cultura del humo en Cali con una experiencia Luxury y un vibe espacial.',
      cta: 'DESPEGAR',
    },
    en: {
      title1: 'YOUR CONNECTION',
      title2: 'WITH OTHER',
      title3: 'TRAVELERS',
      subtitle: 'Elevating smoke culture in Cali with a Luxury experience and space vibe.',
      cta: 'BLAST OFF',
    },
  }

  const t = texts[lang as keyof typeof texts]

  return (
    <section className="relative flex min-h-[85dvh] items-center overflow-hidden bg-[#f5f5f5] px-4 pb-12 pt-24 transition-colors duration-300 dark:bg-black sm:min-h-[90vh] sm:px-6 sm:pb-16 sm:pt-28 md:px-8 md:pt-32 md:pb-0">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full min-h-[85dvh] w-full object-cover opacity-25 dark:opacity-40 sm:min-h-[90vh]"
          onEnded={(e) => {
            const v = e.currentTarget
            v.currentTime = 0
            void v.play()
          }}
        >
          <source src="/hero/buenos-humos-rocket.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#f5f5f5]/50 dark:bg-black/50"></div>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 pb-24 pt-4 sm:gap-10 sm:pb-28 md:grid-cols-2 md:gap-12 md:pb-32 lg:gap-14">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative min-w-0 text-left"
        >
          <motion.div
            className="absolute -top-12 left-0 z-20 hidden h-16 w-16 text-black dark:text-white sm:h-20 sm:w-20 md:-top-16 md:left-0 md:block md:h-24 md:w-24 lg:-left-6 lg:-top-20"
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Rocket className="h-full w-full" />
          </motion.div>
          <div className="mb-3 inline-block -rotate-2 transform border-2 border-black bg-pink-500 px-2 py-1 font-mono text-[10px] font-bold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] sm:mb-4 sm:text-xs md:text-sm">
            BUENOS HUMOS
          </div>
          <h1 className="mb-5 max-w-[22ch] break-words text-[clamp(1.85rem,7vw,4.5rem)] font-black leading-[0.92] tracking-tighter text-black dark:text-white sm:mb-6 sm:max-w-none md:text-7xl">
            {t.title1} <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent [-webkit-text-stroke:1px_rgba(88,28,135,0.35)] [text-shadow:none] md:[-webkit-text-stroke:2px_rgba(88,28,135,0.45)]">
              {t.title2}
            </span>{' '}
            <br />
            {t.title3}
          </h1>
          <p className="mb-6 max-w-xl border-l-4 border-black pl-3 text-base font-bold leading-snug text-gray-700 dark:border-white dark:text-gray-300 sm:mb-8 sm:pl-4 sm:text-lg md:text-xl lg:text-2xl">
            {t.subtitle}
          </p>
          <a
            href="https://wa.me/573165871602?text=%C2%A1Hola%20BH!%20%F0%9F%9A%80%20Estoy%20listo%20para%20despegar.%20Quiero%20ver%20el%20cat%C3%A1logo."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full max-w-md items-center justify-center gap-2 border-4 border-black bg-black px-5 py-3 text-base font-black text-white shadow-[6px_6px_0px_0px_rgba(255,0,255,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,0,255,1)] dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white sm:w-auto sm:max-w-none sm:gap-3 sm:px-7 sm:py-3.5 sm:text-lg md:px-8 md:py-4 md:text-xl"
          >
            <Rocket className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
            {t.cta}
          </a>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-4 flex justify-center md:mb-0"
        >
          <div className="absolute inset-0 scale-105 rounded-full bg-white opacity-50 blur-sm dark:bg-black"></div>

          <div className="group relative flex aspect-square w-[min(100%,17.5rem)] max-w-[85vw] items-center justify-center overflow-hidden rounded-full border-4 border-black bg-gray-200 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-zinc-800 dark:shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] sm:w-[min(100%,20rem)] md:w-[min(100%,28rem)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] lg:w-[min(100%,31.25rem)]">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src="/hero/buenos-humos-hero.mp4" type="video/mp4" />
            </video>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                backgroundSize: '100% 2px, 3px 100%',
              }}
            ></div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-[#f5f5f5] via-[#f5f5f5]/80 to-gray-200 dark:from-black dark:via-black/80 dark:to-zinc-900 pointer-events-none"></div>
    </section>
  )
}
