import { CATEGORIES, type Category, type CategoryProduct } from '../data/categories'

export interface WpProductGalleryItem {
  url: string
  name_es?: string
  name_en?: string
  detail_es?: string
  detail_en?: string
}

export interface WpProductAcf {
  name_es?: string
  name_en?: string
  subtitle_es?: string
  subtitle_en?: string
  description_es?: string
  description_en?: string
  icon?: string
  color?: string
  whatsapp?: string
  gallery?: WpProductGalleryItem[]
}

export interface WpProductTerm {
  id: number
  slug: string
  name: string
}

export interface WpFeaturedMedia {
  source_url?: string
  media_details?: { sizes?: Record<string, { source_url?: string }> }
}

export interface WpProduct {
  id: number
  slug: string
  title: { rendered: string }
  acf?: WpProductAcf
  product_categories?: number[]
  featured_media?: number
  _embedded?: {
    'wp:term'?: WpProductTerm[][]
    'wp:featuredmedia'?: WpFeaturedMedia[]
  }
}

function pickFeaturedUrl(product: WpProduct): string | undefined {
  const media = product._embedded?.['wp:featuredmedia']?.[0]
  if (!media) return undefined
  return (
    media.media_details?.sizes?.medium_large?.source_url ??
    media.media_details?.sizes?.large?.source_url ??
    media.source_url
  )
}

export interface WpCategoryTerm {
  id: number
  slug: string
  name: string
  description?: string
}

function pickTerm(product: WpProduct): WpProductTerm | undefined {
  const groups = product._embedded?.['wp:term']
  if (!groups) return undefined
  for (const group of groups) {
    const term = group.find((t) => t.slug)
    if (term) return term
  }
  return undefined
}

const LOCAL_BY_ID = new Map(CATEGORIES.map((c) => [c.id, c]))

function decodeHtml(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, '’')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

export function normalizeWpToCategories(products: WpProduct[]): Category[] {
  const byCategory = new Map<string, Category>()

  for (const product of products) {
    const term = pickTerm(product)
    if (!term) continue
    const acf = product.acf ?? {}
    const local = LOCAL_BY_ID.get(term.slug)
    const productTitle = decodeHtml(acf.name_es ?? product.title.rendered ?? '')
    const firstImage = pickFeaturedUrl(product) ?? acf.gallery?.[0]?.url ?? local?.images?.[0] ?? ''

    const productEntry: CategoryProduct = {
      name: productTitle,
      nameEn: acf.name_en ?? productTitle,
      detail: acf.description_es ?? '',
      detailEn: acf.description_en ?? acf.description_es ?? '',
    }

    let cat = byCategory.get(term.slug)
    if (!cat) {
      cat = {
        id: term.slug,
        title: local?.title ?? term.name,
        titleEn: local?.titleEn ?? term.name,
        subtitle: local?.subtitle ?? '',
        subtitleEn: local?.subtitleEn ?? '',
        description: local?.description ?? '',
        descriptionEn: local?.descriptionEn ?? '',
        icon: local?.icon ?? '✨',
        color: local?.color ?? 'bg-pink-400',
        whatsapp: local?.whatsapp ?? '',
        images: [],
        products: [],
      }
      byCategory.set(term.slug, cat)
    }
    cat.products.push(productEntry)
    cat.images.push(firstImage)
  }

  for (const cat of byCategory.values()) {
    if (cat.images.length === 0) {
      const local = LOCAL_BY_ID.get(cat.id)
      if (local) cat.images = [...local.images]
    }
  }

  return Array.from(byCategory.values())
}

export interface FlatProduct {
  slug: string
  name: string
  nameEn: string
  detail: string
  detailEn: string
  image: string
  categoryId: string
  categoryTitle: string
  categoryTitleEn: string
  categoryColor: string
  icon: string
}

export function normalizeWpToProducts(products: WpProduct[]): FlatProduct[] {
  const out: FlatProduct[] = []
  for (const product of products) {
    const term = pickTerm(product)
    if (!term) continue
    const acf = product.acf ?? {}
    const local = LOCAL_BY_ID.get(term.slug)
    const title = decodeHtml(acf.name_es ?? product.title.rendered ?? '')
    const image = pickFeaturedUrl(product) ?? acf.gallery?.[0]?.url ?? local?.images?.[0] ?? ''
    out.push({
      slug: product.slug,
      name: title,
      nameEn: acf.name_en ?? title,
      detail: acf.description_es ?? '',
      detailEn: acf.description_en ?? acf.description_es ?? '',
      image,
      categoryId: term.slug,
      categoryTitle: local?.title ?? term.name,
      categoryTitleEn: local?.titleEn ?? term.name,
      categoryColor: local?.color ?? 'bg-pink-400',
      icon: local?.icon ?? '✨',
    })
  }
  return out
}
