import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { useCategories, useProducts } from '../hooks/useCategories'
import { useCategoryCatalogStore, type CatalogSort } from '../stores/categoryCatalogStore'
import { useCartStore } from '../stores/cartStore'
import type { FlatProduct } from '../lib/wpCatalog'
import { ArrowLeft, Check, MessageCircle, Plus, Search, ShoppingCart, X } from './icons'

function normalizeText(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '')
}

function productMatchesSearch(p: FlatProduct, query: string) {
  const q = normalizeText(query.trim())
  if (!q) return true
  const blob = normalizeText(`${p.name} ${p.nameEn} ${p.detail} ${p.detailEn} ${p.categoryTitle}`)
  return blob.includes(q)
}

function sortProducts(list: FlatProduct[], sortBy: CatalogSort, lang: string): FlatProduct[] {
  if (sortBy === 'default') return list
  const key = lang === 'es' ? 'name' : 'nameEn'
  return [...list].sort((a, b) => {
    const cmp = normalizeText(a[key]).localeCompare(normalizeText(b[key]), lang === 'es' ? 'es' : 'en')
    return sortBy === 'name-asc' ? cmp : -cmp
  })
}

const WHATSAPP_NUMBER = '573165871602'

export function CategoryGrid() {
  const { lang } = useApp()
  const { data: categories = [] } = useCategories()
  const { data: products = [] } = useProducts()

  const [selectedProduct, setSelectedProduct] = useState<FlatProduct | null>(null)

  const searchInput = useCategoryCatalogStore((s) => s.searchInput)
  const debouncedSearch = useCategoryCatalogStore((s) => s.debouncedSearch)
  const sortBy = useCategoryCatalogStore((s) => s.sortBy)
  const filterId = useCategoryCatalogStore((s) => s.filterId)
  const setSearchInput = useCategoryCatalogStore((s) => s.setSearchInput)
  const setDebouncedSearch = useCategoryCatalogStore((s) => s.setDebouncedSearch)
  const setSortBy = useCategoryCatalogStore((s) => s.setSortBy)
  const setFilterId = useCategoryCatalogStore((s) => s.setFilterId)

  const cartHas = useCartStore((s) => s.has)
  const cartToggle = useCartStore((s) => s.toggle)
  const cartAdd = useCartStore((s) => s.add)
  const cartOpen = useCartStore((s) => s.open)
  const cartItems = useCartStore((s) => s.items)

  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedSearch(searchInput), 320)
    return () => window.clearTimeout(id)
  }, [searchInput, setDebouncedSearch])

  useEffect(() => {
    if (!selectedProduct) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelectedProduct(null)
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [selectedProduct])

  const texts = {
    es: {
      title: 'AQUÍ ES',
      searchLabel: 'Búsqueda',
      searchPlaceholder: 'Buscar productos…',
      sortLabel: 'Ordenar',
      sortDefault: 'Orden del catálogo',
      sortAsc: 'Nombre A–Z',
      sortDesc: 'Nombre Z–A',
      categoriesLabel: 'Explora por categoría',
      categoriesHint: 'Elige una categoría o busca un producto para ver el catálogo.',
      back: 'Volver a categorías',
      showingAll: 'Todos los productos',
      results: (n: number) => `${n} ${n === 1 ? 'producto' : 'productos'}`,
      productsInCat: (n: number) => `${n} ${n === 1 ? 'producto' : 'productos'}`,
      empty: 'No hay productos que coincidan con tu búsqueda o filtros.',
      clear: 'Limpiar filtros',
      whatsapp: 'Consultar',
      details: 'Ver detalles',
      close: 'Cerrar',
      detailTitle: 'Detalle del producto',
      noDetail: 'Sin descripción disponible. Consulta por WhatsApp para más información.',
      add: 'Agregar',
      added: 'En el pedido',
      openCart: 'Ver pedido',
      cartLabel: 'Pedido',
    },
    en: {
      title: 'THIS IS IT',
      searchLabel: 'Search',
      searchPlaceholder: 'Search products…',
      sortLabel: 'Sort',
      sortDefault: 'Catalog order',
      sortAsc: 'Name A–Z',
      sortDesc: 'Name Z–A',
      categoriesLabel: 'Browse by category',
      categoriesHint: 'Pick a category or search a product to see the catalog.',
      back: 'Back to categories',
      showingAll: 'All products',
      results: (n: number) => `${n} ${n === 1 ? 'product' : 'products'}`,
      productsInCat: (n: number) => `${n} ${n === 1 ? 'product' : 'products'}`,
      empty: 'No products match your search or filters.',
      clear: 'Clear filters',
      whatsapp: 'Ask',
      details: 'View details',
      close: 'Close',
      detailTitle: 'Product detail',
      noDetail: 'No description available. Reach out on WhatsApp for more info.',
      add: 'Add',
      added: 'In order',
      openCart: 'View order',
      cartLabel: 'Order',
    },
  }

  const t = texts[lang as keyof typeof texts]

  const productsByCategory = useMemo(() => {
    const map = new Map<string, number>()
    for (const p of products) map.set(p.categoryId, (map.get(p.categoryId) ?? 0) + 1)
    return map
  }, [products])

  const coverByCategory = useMemo(() => {
    const map = new Map<string, string>()
    for (const p of products) {
      if (!map.has(p.categoryId) && p.image) map.set(p.categoryId, p.image)
    }
    return map
  }, [products])

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => (filterId === 'all' ? true : p.categoryId === filterId))
    list = list.filter((p) => productMatchesSearch(p, debouncedSearch))
    return sortProducts(list, sortBy, lang)
  }, [products, debouncedSearch, filterId, sortBy, lang])

  const hasSearch = debouncedSearch.trim() !== ''
  const hasCategoryFilter = filterId !== 'all'
  const showProducts = hasCategoryFilter || hasSearch
  const hasActiveFilters = searchInput.trim() !== '' || filterId !== 'all' || sortBy !== 'default'

  const clearFilters = () => {
    setSearchInput('')
    setDebouncedSearch('')
    setFilterId('all')
    setSortBy('default')
  }

  const goBackToCategories = () => {
    setFilterId('all')
    setSearchInput('')
    setDebouncedSearch('')
  }

  const buildWaLink = (p: FlatProduct) => {
    const msg = lang === 'es'
      ? `Hola Buenos Humos, quiero info sobre: ${p.name}`
      : `Hi Buenos Humos, I'd like info on: ${p.nameEn}`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
  }

  const activeCategoryTitle = hasCategoryFilter
    ? (() => {
        const c = categories.find((c) => c.id === filterId)
        if (!c) return t.showingAll
        return lang === 'es' ? c.title : c.titleEn
      })()
    : t.showingAll

  return (
    <section className="bg-[#f5f5f5] px-4 py-14 transition-colors duration-300 dark:bg-black sm:py-16 md:px-6 md:py-20" id="categories">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-10">
          <h2 className="mb-4 text-3xl font-black uppercase tracking-tighter text-black dark:text-white sm:text-4xl md:text-6xl">
            {t.title}
          </h2>
          <div className="mx-auto h-2 w-24 bg-black dark:bg-white"></div>
        </div>

        <div className="mb-8 space-y-5 border-4 border-black bg-white p-4 text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-zinc-900 dark:text-white dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] sm:space-y-6 sm:mb-10 md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
            <label className="flex flex-1 flex-col gap-2 text-left font-bold text-sm uppercase tracking-wide">
              <span className="font-mono text-pink-600 dark:text-pink-400">{t.searchLabel}</span>
              <span className="relative flex items-center">
                <Search className="pointer-events-none absolute left-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                <input
                  type="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  autoComplete="off"
                  className="w-full border-4 border-black dark:border-white bg-[#f5f5f5] dark:bg-black py-3 pl-11 pr-3 font-bold outline-none transition-shadow focus:shadow-[4px_4px_0px_0px_rgba(236,72,153,1)]"
                />
              </span>
            </label>

            {showProducts && (
              <label className="flex w-full flex-col gap-2 font-bold text-sm uppercase tracking-wide lg:max-w-xs">
                <span className="font-mono text-pink-600 dark:text-pink-400">{t.sortLabel}</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as CatalogSort)}
                  className="w-full cursor-pointer border-4 border-black dark:border-white bg-[#f5f5f5] dark:bg-black py-3 px-3 font-bold outline-none focus:shadow-[4px_4px_0px_0px_rgba(236,72,153,1)]"
                >
                  <option value="default">{t.sortDefault}</option>
                  <option value="name-asc">{t.sortAsc}</option>
                  <option value="name-desc">{t.sortDesc}</option>
                </select>
              </label>
            )}
          </div>

          {showProducts && (
            <div className="flex flex-col gap-3 border-t-2 border-black dark:border-white pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={goBackToCategories}
                  className="flex items-center gap-2 border-2 border-black bg-white px-3 py-2 text-xs font-black uppercase text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none dark:border-white dark:bg-zinc-900 dark:text-white dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]"
                >
                  <ArrowLeft width="14" height="14" />
                  {t.back}
                </button>
                <p className="font-mono text-sm font-bold">
                  <span className="text-pink-600 dark:text-pink-400">{activeCategoryTitle}</span>
                  <span className="mx-2">·</span>
                  {t.results(filteredProducts.length)}
                </p>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="self-start border-2 border-black dark:border-white bg-pink-500 px-4 py-2 text-sm font-black uppercase text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] sm:self-auto"
                >
                  {t.clear}
                </button>
              )}
            </div>
          )}

          {!showProducts && (
            <div className="flex flex-col gap-2 border-t-2 border-black dark:border-white pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400">
                {t.categoriesLabel}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{t.categoriesHint}</p>
            </div>
          )}
        </div>

        {!showProducts && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((cat, index) => {
              const count = productsByCategory.get(cat.id) ?? 0
              const cover = coverByCategory.get(cat.id) ?? cat.images?.[0] ?? ''
              const name = lang === 'es' ? cat.title : cat.titleEn
              return (
                <motion.button
                  type="button"
                  key={cat.id}
                  onClick={() => setFilterId(cat.id)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.04, 0.3) }}
                  whileHover={{ scale: 1.02, rotate: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative text-left"
                >
                  <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-xl bg-black dark:bg-white" />
                  <div className="relative flex h-full flex-col overflow-hidden rounded-xl border-4 border-black bg-white dark:border-white dark:bg-zinc-900">
                    <div className="relative h-44 w-full overflow-hidden border-b-4 border-black bg-gray-100 dark:border-white dark:bg-zinc-800 sm:h-48">
                      {cover ? (
                        <img
                          src={cover}
                          alt={name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-6xl">{cat.icon}</div>
                      )}
                      <div className="absolute bottom-0 left-0 bg-black px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white">
                        {t.productsInCat(count)}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-4 text-black dark:text-white">
                      <h3 className="break-words text-lg font-black uppercase leading-tight">{name}</h3>
                      <span className="mt-3 inline-flex items-center gap-1 self-start border-2 border-black bg-pink-500 px-3 py-1 text-xs font-black uppercase text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                        {t.details}
                      </span>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        )}

        {showProducts && (filteredProducts.length === 0 ? (
          <p className="border-4 border-dashed border-black dark:border-white bg-white/50 dark:bg-zinc-900/50 py-16 text-center text-lg font-bold text-black dark:text-white">
            {t.empty}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((p, index) => {
              const inCart = cartHas(p.slug)
              return (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.03, 0.4) }}
                  whileHover={{ scale: 1.02, rotate: -1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-xl bg-black dark:bg-white" />
                  <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border-4 border-black bg-white dark:border-white dark:bg-zinc-900">
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(p)}
                      aria-label={`${t.details}: ${lang === 'es' ? p.name : p.nameEn}`}
                      className="relative h-44 w-full cursor-pointer overflow-hidden border-b-4 border-black bg-gray-100 text-left dark:border-white dark:bg-zinc-800 sm:h-48"
                    >
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={lang === 'es' ? p.name : p.nameEn}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-4xl">{p.icon}</div>
                      )}
                      <div className="absolute bottom-0 left-0 bg-black p-1 font-mono text-xs text-white">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </button>

                    <div className="flex flex-1 flex-col p-4 text-black dark:text-white">
                      <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400">
                        {lang === 'es' ? p.categoryTitle : p.categoryTitleEn}
                      </p>
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(p)}
                        className="mb-3 break-words text-left text-base font-black uppercase leading-tight transition-colors hover:text-pink-600 dark:hover:text-pink-400"
                      >
                        {lang === 'es' ? p.name : p.nameEn}
                      </button>
                      <div className="mt-auto flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => cartToggle(p)}
                          className={`flex items-center justify-center gap-2 border-2 px-3 py-2 text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] ${
                            inCart
                              ? 'border-black bg-pink-500 text-white dark:border-white'
                              : 'border-black bg-white text-black dark:border-white dark:bg-zinc-900 dark:text-white'
                          }`}
                        >
                          {inCart ? <Check width="14" height="14" /> : <Plus width="14" height="14" />}
                          {inCart ? t.added : t.add}
                        </button>
                        <a
                          href={buildWaLink(p)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 border-2 border-black bg-[#25D366] px-3 py-2 text-xs font-black uppercase text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none dark:border-white dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]"
                        >
                          <MessageCircle width="14" height="14" />
                          {t.whatsapp}
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ))}

        {showProducts && cartItems.length > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={cartOpen}
              className="flex items-center gap-3 border-4 border-black bg-pink-500 px-5 py-3 font-black uppercase text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
            >
              <ShoppingCart width="18" height="18" />
              {t.openCart}
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-black px-1.5 text-xs font-black text-white dark:bg-white dark:text-black">
                {cartItems.length}
              </span>
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              className="relative flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border-4 border-pink-500 bg-white text-black shadow-[0px_0px_0px_4px_rgba(0,0,0,1)] dark:bg-black dark:text-white dark:shadow-[0px_0px_0px_4px_rgba(255,255,255,1)] sm:max-h-[90vh] md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                aria-label={t.close}
                className="absolute right-2 top-2 z-10 rounded-full border-2 border-black bg-white p-1.5 text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none dark:border-white dark:bg-black dark:text-white dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] sm:right-3 sm:top-3 sm:p-2"
              >
                <X />
              </button>

              <div className="flex h-52 w-full shrink-0 items-center justify-center overflow-hidden bg-gray-100 dark:bg-zinc-900 sm:h-64 md:h-auto md:w-1/2 md:border-r-4 md:border-black md:dark:border-white">
                {selectedProduct.image ? (
                  <img
                    src={selectedProduct.image}
                    alt={lang === 'es' ? selectedProduct.name : selectedProduct.nameEn}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-6xl sm:text-7xl">{selectedProduct.icon}</span>
                )}
              </div>

              <div className="flex w-full flex-1 flex-col overflow-y-auto p-5 sm:p-6 md:w-1/2 md:p-8">
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400 sm:text-xs">
                  {lang === 'es' ? selectedProduct.categoryTitle : selectedProduct.categoryTitleEn}
                </p>
                <h3 className="mt-2 break-words text-2xl font-black uppercase leading-tight sm:text-3xl md:text-4xl">
                  {lang === 'es' ? selectedProduct.name : selectedProduct.nameEn}
                </h3>

                <div className="mt-4 rounded-r-lg border-l-4 border-pink-500 bg-gray-100 py-3 pl-3 pr-2 dark:bg-zinc-800/80 sm:mt-5 sm:py-4 sm:pl-4 sm:pr-3">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400 sm:text-xs">
                    {t.detailTitle}
                  </p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-gray-800 dark:text-gray-200">
                    {(lang === 'es' ? selectedProduct.detail : selectedProduct.detailEn) || t.noDetail}
                  </p>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      cartAdd(selectedProduct)
                      setSelectedProduct(null)
                      cartOpen()
                    }}
                    className={`flex items-center justify-center gap-2 rounded-xl border-4 px-4 py-3 text-sm font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] sm:py-4 sm:text-lg ${
                      cartHas(selectedProduct.slug)
                        ? 'border-black bg-pink-500 text-white dark:border-white'
                        : 'border-black bg-white text-black dark:border-white dark:bg-black dark:text-white'
                    }`}
                  >
                    {cartHas(selectedProduct.slug) ? <Check /> : <Plus />}
                    {cartHas(selectedProduct.slug) ? t.added : t.add}
                  </button>
                  <a
                    href={buildWaLink(selectedProduct)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border-4 border-black bg-[#25D366] px-4 py-3 text-sm font-black uppercase text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] sm:py-4 sm:text-lg"
                  >
                    <MessageCircle />
                    {t.whatsapp}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
