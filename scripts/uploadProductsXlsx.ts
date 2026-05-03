import XLSX from 'xlsx'
import { WP_BASE, wpFetch } from './wpAuth'

const XLSX_PATH = 'PRODUCTOS.xlsx'

interface WpTerm { id: number; slug: string; name: string }
interface WpPost { id: number; slug: string }

const CATEGORY_TITLES: Record<string, string> = {
  bongs: 'Pipas & Bongs',
  cueros: 'Cueros & Accesorios',
  grow: 'Grow Shop',
  cbd: 'CBD & Medicinal',
  vape: 'Vape & Tech',
  tabaco: 'Tabaco',
  merch: 'BH-Merch',
}

function inferCategory(name: string, principal: string | null, secundaria: string | null): string {
  const n = name.toLowerCase()
  const p = (principal ?? '').toLowerCase()
  const s = (secundaria ?? '').toLowerCase()

  if (n.includes('cbd') || n.includes('aceite de cbd')) return 'cbd'
  if (n.includes('cuero')) return 'cueros'
  if (n.includes('bong') || n.includes('hookah') || n.includes('narguila') || n.includes('pipa') || n.includes('top puff')) return 'bongs'
  if (n.includes('camiseta') || n.includes('cojin') || n.includes('merch')) return 'merch'
  if (n.includes('bateria') || n.includes('baterías') || n.includes('cargador') || n.includes('ace ultra') || n.includes('vape') || n.includes('vaporizador')) return 'vape'
  if (p.includes('electrón')) return 'vape'
  if (s.includes('vaporiz') || s.includes('bateria') || s.includes('destilado')) return 'vape'
  if (p.includes('merch')) return 'merch'
  return 'tabaco'
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function ensureCategoryTerm(slug: string, name: string): Promise<WpTerm> {
  const existing = await wpFetch<WpTerm[]>('GET', `/wp-json/wp/v2/product_categories?slug=${encodeURIComponent(slug)}`)
  if (existing.length > 0) return existing[0]
  return wpFetch<WpTerm>('POST', '/wp-json/wp/v2/product_categories', { name, slug })
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
    gallery: Array<{ url: string; name_es: string; name_en: string; detail_es: string; detail_en: string }>
  }
}

async function upsertProduct(slug: string, payload: WpProductCreate & { slug?: string }): Promise<WpPost> {
  const existing = await wpFetch<WpPost[]>('GET', `/wp-json/wp/v2/products?slug=${encodeURIComponent(slug)}`)
  if (existing.length > 0) {
    const updated = await wpFetch<WpPost>('POST', `/wp-json/wp/v2/products/${existing[0].id}`, payload)
    console.log(`  ↻ updated: ${slug} (id ${updated.id})`)
    return updated
  }
  const created = await wpFetch<WpPost>('POST', '/wp-json/wp/v2/products', { ...payload, slug })
  console.log(`  ✓ created: ${slug} (id ${created.id})`)
  return created
}

const wb = XLSX.readFile(XLSX_PATH)
const rows = XLSX.utils.sheet_to_json<unknown[]>(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: null })
const numbered = rows.slice(1).filter((r) => typeof r[2] === 'number') as Array<[number, string, number, string | null, string | null, string | null, ...unknown[]]>

console.log(`→ ${numbered.length} numbered rows from ${XLSX_PATH}`)
console.log(`→ Authenticating with ${WP_BASE}…`)
await wpFetch<{ name: string }>('GET', '/wp-json/wp/v2/users/me')
console.log('  ✓ authenticated')

console.log('\n→ Ensuring category terms…')
const termIds = new Map<string, number>()
for (const [id, title] of Object.entries(CATEGORY_TITLES)) {
  const term = await ensureCategoryTerm(id, title)
  termIds.set(id, term.id)
  console.log(`  · ${id} → term id ${term.id}`)
}

console.log('\n→ Uploading products…')
const summary: Record<string, number> = {}
for (const row of numbered) {
  const [, name, , principal, secundaria] = row
  const catId = inferCategory(name, principal, secundaria)
  const termId = termIds.get(catId)!
  const slug = slugify(name)
  summary[catId] = (summary[catId] ?? 0) + 1
  await upsertProduct(slug, {
    title: name,
    status: 'publish',
    product_categories: [termId],
    acf: {
      name_es: name,
      name_en: name,
      subtitle_es: '',
      subtitle_en: '',
      description_es: '',
      description_en: '',
      icon: '✨',
      color: 'bg-pink-400',
      whatsapp: '',
      gallery: [],
    },
  })
}

console.log('\n✅ Done. By category:')
for (const [k, v] of Object.entries(summary)) console.log(`  · ${k}: ${v}`)
