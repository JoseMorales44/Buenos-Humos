import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useApp } from '../context/AppContext'

export function Footer() {
  const { lang, theme } = useApp()

  const texts = {
    es: {
      slogan: 'De Cali para el universo.',
      rights: 'TODOS LOS DERECHOS RESERVADOS.',
    },
    en: {
      slogan: 'From Cali to the universe.',
      rights: 'ALL RIGHTS RESERVED.',
    },
  }

  const t = texts[lang as keyof typeof texts]

  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white pt-20 pb-10 px-4 border-t-8 border-pink-500 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-8 p-4 bg-black dark:bg-white rounded-full border-4 border-pink-500"
        >
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src={theme === 'light' ? '/logos/cohete-bh.webp' : '/logos/cohete-bh-negro.webp'}
              alt="BH Rocket"
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        <h2 className="text-3xl font-black italic mb-2">BUENOS HUMOS</h2>
        <p className="font-mono text-gray-600 dark:text-gray-400 mb-8">{t.slogan}</p>
        <p className="font-bold text-xl mb-8">+57 316 5871602</p>

        <p className="font-bold text-sm mb-4 uppercase tracking-widest">Síguenos en nuestras redes sociales</p>
        <div className="flex gap-6 mb-12">
          <a
            href="https://www.tiktok.com/@buenoshumos.colombia?_r=1&_t=ZS-94Hgc23rdVg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="p-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-pink-500 hover:text-white dark:hover:bg-pink-500 dark:hover:text-white transition-colors"
          >
            <Icon icon="simple-icons:tiktok" width={24} height={24} className="shrink-0" aria-hidden />
          </a>
          <a
            href="https://www.instagram.com/buenoshumoscolombia_"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-pink-500 hover:text-white dark:hover:bg-pink-500 dark:hover:text-white transition-colors"
          >
            <Icon icon="mdi:instagram" width={24} height={24} className="shrink-0" aria-hidden />
          </a>
          <a
            href="https://www.facebook.com/buenoshumoscolombia"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="p-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-colors"
          >
            <Icon icon="mdi:facebook" width={24} height={24} className="shrink-0" aria-hidden />
          </a>
        </div>

        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 pt-8 w-full">
          <p>© 2026 BUENOS HUMOS CLUB STATION. {t.rights}</p>
        </div>
      </div>
    </footer>
  )
}
