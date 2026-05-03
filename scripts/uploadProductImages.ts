import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, basename, extname } from 'node:path'
import { WP_BASE, getJwtToken, wpFetch } from './wpAuth'

interface WpMedia { id: number; slug: string; source_url: string }
interface WpPost { id: number; slug: string; acf?: Record<string, unknown> }

const CATEGORY_FOLDER: Record<string, string> = {
  bongs: 'public/categorias/pipas-bongs',
  cueros: 'public/categorias/cueros-accesorios',
  grow: 'public/categorias/grow',
  cbd: 'public/categorias/cbd-medicinal',
  vape: 'public/categorias/vape-tech',
  tabaco: 'public/categorias/tabaco',
  merch: 'public/categorias/bh-merch',
}

const MIME: Record<string, string> = {
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
}

function slugify(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

async function uploadOrFindMedia(filePath: string): Promise<WpMedia> {
  const filename = basename(filePath)
  const ext = extname(filename).toLowerCase()
  const mime = MIME[ext]
  if (!mime) throw new Error(`unsupported ext: ${ext}`)
  const slug = slugify(basename(filename, ext))

  const existing = await wpFetch<WpMedia[]>('GET', `/wp-json/wp/v2/media?slug=${encodeURIComponent(slug)}&per_page=1`)
  if (existing.length > 0) {
    console.log(`    · media exists: ${existing[0].slug} (id ${existing[0].id})`)
    return existing[0]
  }

  const buf = readFileSync(filePath)
  const token = await getJwtToken()
  const res = await fetch(`${WP_BASE}/wp-json/wp/v2/media`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': mime,
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
    body: buf,
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`media upload failed (${res.status}): ${text.slice(0, 300)}`)
  const created = JSON.parse(text) as WpMedia
  console.log(`    ✓ uploaded: ${created.slug} → ${created.source_url}`)
  return created
}

console.log(`→ Authenticating with ${WP_BASE}…`)
await wpFetch<{ name: string }>('GET', '/wp-json/wp/v2/users/me')
console.log('  ✓ authenticated\n')

console.log('→ Uploading category images to WP Media…')
const mediaByCategory = new Map<string, WpMedia[]>()
for (const [catId, folder] of Object.entries(CATEGORY_FOLDER)) {
  let files: string[] = []
  try {
    files = readdirSync(folder)
      .filter((f) => MIME[extname(f).toLowerCase()])
      .map((f) => join(folder, f))
      .filter((p) => statSync(p).isFile())
  } catch {
    console.log(`  · ${catId}: folder missing, skip`)
    continue
  }
  console.log(`  · ${catId}: ${files.length} file(s)`)
  const list: WpMedia[] = []
  for (const file of files) list.push(await uploadOrFindMedia(file))
  mediaByCategory.set(catId, list)
}

console.log('\n→ Fetching products + their term assignments…')
const products = await wpFetch<Array<WpPost & {
  product_categories?: number[]
  _embedded?: { 'wp:term'?: Array<Array<{ slug: string }>> }
}>>('GET', '/wp-json/wp/v2/products?_embed&per_page=100')
console.log(`  ✓ ${products.length} products`)

const productsByCategory = new Map<string, typeof products>()
for (const p of products) {
  const groups = p._embedded?.['wp:term'] ?? []
  let slug: string | undefined
  for (const g of groups) {
    const t = g.find((t) => t.slug && CATEGORY_FOLDER[t.slug])
    if (t) { slug = t.slug; break }
  }
  if (!slug) continue
  const arr = productsByCategory.get(slug) ?? []
  arr.push(p)
  productsByCategory.set(slug, arr)
}

console.log('\n→ Attaching media to products (round-robin within each category)…')
let updates = 0
for (const [catId, prods] of productsByCategory.entries()) {
  const media = mediaByCategory.get(catId)
  if (!media || media.length === 0) {
    console.log(`  · ${catId}: no media, skip ${prods.length} products`)
    continue
  }
  for (let i = 0; i < prods.length; i++) {
    const p = prods[i]
    const m = media[i % media.length]
    const acf = (p.acf ?? {}) as Record<string, unknown>
    const galleryItem = {
      url: m.source_url,
      name_es: (acf.name_es as string) ?? '',
      name_en: (acf.name_en as string) ?? '',
      detail_es: (acf.description_es as string) ?? '',
      detail_en: (acf.description_en as string) ?? '',
    }
    await wpFetch<WpPost>('POST', `/wp-json/wp/v2/products/${p.id}`, {
      featured_media: m.id,
      acf: { ...acf, gallery: [galleryItem] },
    })
    updates++
    console.log(`  ↻ ${p.slug} ← ${m.slug}`)
  }
}

console.log(`\n✅ Done. ${updates} product(s) updated.`)
