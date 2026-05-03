import { CATEGORIES } from '../src/data/categories'
import { WP_BASE, wpFetch } from './wpAuth'

interface WpTerm {
  id: number
  slug: string
  name: string
}

interface WpPost {
  id: number
  slug: string
}

async function ensureCategoryTerm(slug: string, name: string): Promise<WpTerm> {
  const existing = await wpFetch<WpTerm[]>('GET', `/wp-json/wp/v2/product_categories?slug=${encodeURIComponent(slug)}`)
  if (existing.length > 0) {
    console.log(`  · category exists: ${slug} (id ${existing[0].id})`)
    return existing[0]
  }
  const created = await wpFetch<WpTerm>('POST', '/wp-json/wp/v2/product_categories', { name, slug })
  console.log(`  ✓ category created: ${slug} (id ${created.id})`)
  return created
}

interface WpProductCreate {
  title: string
  status: 'publish'
  product_categories: number[]
  acf: {
    name_es: string
    name_en: string
    subtitle_es: string
    subtitle_en: string
    description_es: string
    description_en: string
    icon: string
    color: string
    whatsapp: string
    gallery: Array<{
      url: string
      name_es: string
      name_en: string
      detail_es: string
      detail_en: string
    }>
  }
}

async function upsertProduct(slug: string, payload: WpProductCreate): Promise<WpPost> {
  const existing = await wpFetch<WpPost[]>('GET', `/wp-json/wp/v2/products?slug=${encodeURIComponent(slug)}`)
  if (existing.length > 0) {
    const updated = await wpFetch<WpPost>('POST', `/wp-json/wp/v2/products/${existing[0].id}`, payload)
    console.log(`  ↻ product updated: ${slug} (id ${updated.id})`)
    return updated
  }
  const created = await wpFetch<WpPost>('POST', '/wp-json/wp/v2/products', { ...payload, slug })
  console.log(`  ✓ product created: ${slug} (id ${created.id})`)
  return created
}

console.log(`→ Authenticating with ${WP_BASE}…`)
const me = await wpFetch<{ name: string }>('GET', '/wp-json/wp/v2/users/me')
console.log(`  ✓ logged in as ${me.name}`)

console.log('\n→ Seeding category terms…')
const termIds = new Map<string, number>()
for (const cat of CATEGORIES) {
  const term = await ensureCategoryTerm(cat.id, cat.title)
  termIds.set(cat.id, term.id)
}

console.log('\n→ Seeding products (1 per category, gallery = images)…')
for (const cat of CATEGORIES) {
  const termId = termIds.get(cat.id)!
  const slug = `${cat.id}-pack`
  const fallback = cat.products[0] ?? {
    name: cat.title,
    nameEn: cat.titleEn,
    detail: cat.description,
    detailEn: cat.descriptionEn,
  }
  const gallery = cat.images.map((url, i) => {
    const product = cat.products[i] ?? fallback
    return {
      url: url.startsWith('http') ? url : `${WP_BASE}${url}`,
      name_es: product.name,
      name_en: product.nameEn,
      detail_es: product.detail,
      detail_en: product.detailEn,
    }
  })

  await upsertProduct(slug, {
    title: cat.title,
    status: 'publish',
    product_categories: [termId],
    acf: {
      name_es: cat.title,
      name_en: cat.titleEn,
      subtitle_es: cat.subtitle,
      subtitle_en: cat.subtitleEn,
      description_es: cat.description,
      description_en: cat.descriptionEn,
      icon: cat.icon,
      color: cat.color,
      whatsapp: cat.whatsapp,
      gallery,
    },
  })
}

console.log('\n✅ Seed complete.')
