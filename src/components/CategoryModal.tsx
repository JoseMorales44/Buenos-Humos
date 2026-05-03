import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import type { Category } from '../data/categories'
import { ChevronLeft, ChevronRight, MessageCircle, X } from './icons'

export function CategoryModal({
  category,
  onClose,
}: {
  category: Category
  onClose: () => void
}) {
  const [currentImage, setCurrentImage] = useState(0)
  const { lang } = useApp()

  useEffect(() => {
    setCurrentImage(0)
  }, [category.id])

  const product = category.products[currentImage]
  const es = lang === 'es'

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % category.images.length)
  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + category.images.length) % category.images.length)

  const whatsappLink = `https://wa.me/573165871602?text=${encodeURIComponent(category.whatsapp)}`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 dark:bg-white/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="bg-white dark:bg-black w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border-4 border-pink-500 shadow-[0px_0px_0px_4px_rgba(0,0,0,1)] dark:shadow-[0px_0px_0px_4px_rgba(255,255,255,1)] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-1/2 bg-gray-100 dark:bg-zinc-900 relative aspect-video md:aspect-auto md:min-h-full border-b-4 md:border-b-0 md:border-r-4 border-black dark:border-white flex items-center justify-center overflow-hidden">
          <img
            src={category.images[currentImage]}
            alt={product ? (es ? product.name : product.nameEn) : category.title}
            className="w-full h-full object-contain absolute inset-0"
          />
          {category.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-black border-2 border-black dark:border-white p-2 rounded-full hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors text-black dark:text-white z-10"
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-black border-2 border-black dark:border-white p-2 rounded-full hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors text-black dark:text-white z-10"
              >
                <ChevronRight />
              </button>
            </>
          )}
          <div className="absolute bottom-2 right-2 bg-black dark:bg-white text-white dark:text-black text-xs font-mono px-2 py-1 rounded z-10">
            {currentImage + 1}/{category.images.length}
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 flex flex-col text-black dark:text-white">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-pink-500 font-mono font-bold text-sm tracking-widest uppercase">
                {lang === 'es' ? category.subtitle : category.subtitleEn}
              </span>
              <h2 className="text-4xl font-black uppercase leading-none mt-1">
                {lang === 'es' ? category.title : category.titleEn}
              </h2>
            </div>
            <button type="button" onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
              <X />
            </button>
          </div>

          <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-6">
            {es ? category.description : category.descriptionEn}
          </p>

          {product && (
            <div className="mb-8 border-l-4 border-pink-500 bg-gray-100 dark:bg-zinc-800/80 pl-4 pr-3 py-4 rounded-r-lg">
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400">
                {es ? 'Detalle del producto' : 'Product detail'} · {currentImage + 1}/{category.images.length}
              </p>
              <h3 className="text-xl font-black uppercase mt-2 tracking-tight text-black dark:text-white">
                {es ? product.name : product.nameEn}
              </h3>
              <p className="text-sm font-medium leading-relaxed mt-2 text-gray-800 dark:text-gray-200">
                {es ? product.detail : product.detailEn}
              </p>
            </div>
          )}

          <div className="mt-auto">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] text-white font-black text-lg py-4 rounded-xl border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle />
              {lang === 'es' ? 'CONSULTAR EN WHATSAPP' : 'ASK ON WHATSAPP'}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
