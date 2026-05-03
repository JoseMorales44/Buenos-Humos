import { WP_BASE, getJwtToken, wpFetch } from './wpAuth'

interface WpMedia { id: number; slug: string; source_url: string }
interface WpPost { id: number; slug: string; featured_media?: number; acf?: Record<string, unknown> }

const KEYWORDS: Record<string, string> = {
  'hookah-lits': 'hookah',
  'bong-raw': 'bong,glass',
  'ace-ultra-celular': 'vape,pen',
  'armadora-backwoods-9': 'rolling,machine',
  'bandeja-con-tapa': 'tray,wood',
  'blones-backwoods-morados': 'cigar,leaf',
  'blones-blazy-susan': 'rolling,papers',
  'blones-high-hemp': 'hemp,leaf',
  'blones-lions-rolling-amarillos': 'rolling,papers',
  'blones-magx-palm': 'palm,leaf',
  'blones-qara': 'rolling,papers',
  'candelas-raw': 'matches,fire',
  'candlea-zippo': 'zippo,lighter',
  'cenicero-raw': 'ashtray',
  'cenicero-smoking-redondo': 'ashtray,glass',
  'clippers': 'lighter,clipper',
  'cono-challenge-raw': 'cone,paper',
  'conos-raw-x3': 'cone,paper',
  'filtros-buenos-humos': 'filter,cigarette',
  'filtros-trofill': 'filter,cigarette',
  'grinder-hamburguesa': 'grinder,herb',
  'grinder-raw': 'grinder,metal',
  'guarda-porros-raw': 'tube,case',
  'licuadora-kingpalm': 'palm,leaf',
  'mechas-raw': 'matches,box',
  'pots-mijo': 'jar,glass',
  'powerhitter': 'smoke,gadget',
  'smokebuddy': 'smoke,filter',
  'sopletes-floppi': 'torch,lighter',
}

function hashSeed(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0
  return Math.abs(h) || 1
}

async function uploadOrFindMedia(slug: string, bytes: Uint8Array): Promise<WpMedia> {
  const existing = await wpFetch<WpMedia[]>('GET', `/wp-json/wp/v2/media?slug=${encodeURIComponent(slug)}&per_page=1`)
  if (existing.length > 0) {
    console.log(`    · media exists: ${existing[0].slug} (id ${existing[0].id})`)
    return existing[0]
  }
  const token = await getJwtToken()
  const res = await fetch(`${WP_BASE}/wp-json/wp/v2/media`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'image/jpeg',
      'Content-Disposition': `attachment; filename="${slug}.jpg"`,
    },
    body: bytes,
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`media upload failed (${res.status}): ${text.slice(0, 300)}`)
  const created = JSON.parse(text) as WpMedia
  console.log(`    ✓ uploaded: ${created.slug} → ${created.source_url}`)
  return created
}

async function fetchLoremflickr(keywords: string, lock: number): Promise<Uint8Array> {
  const url = `https://loremflickr.com/800/800/${encodeURIComponent(keywords)}?lock=${lock}`
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok) throw new Error(`loremflickr ${res.status}`)
  const buf = await res.arrayBuffer()
  return new Uint8Array(buf)
}

console.log(`→ Authenticating with ${WP_BASE}…`)
await wpFetch<{ name: string }>('GET', '/wp-json/wp/v2/users/me')
console.log('  ✓ authenticated\n')

const slugs = Object.keys(KEYWORDS)
console.log(`→ Fetching unique images for ${slugs.length} products from loremflickr…\n`)

let updated = 0
for (const slug of slugs) {
  const keywords = KEYWORDS[slug]
  const lock = hashSeed(slug)
  console.log(`· ${slug} ← "${keywords}" (lock ${lock})`)
  try {
    const bytes = await fetchLoremflickr(keywords, lock)
    const mediaSlug = `${slug}-photo`
    const media = await uploadOrFindMedia(mediaSlug, bytes)
    const found = await wpFetch<WpPost[]>('GET', `/wp-json/wp/v2/products?slug=${encodeURIComponent(slug)}`)
    if (found.length === 0) {
      console.log(`    ! product not found, skip`)
      continue
    }
    await wpFetch<WpPost>('POST', `/wp-json/wp/v2/products/${found[0].id}`, { featured_media: media.id })
    console.log(`    ↻ product ${slug} ← media ${media.id}`)
    updated++
  } catch (e) {
    console.log(`    ! error: ${(e as Error).message}`)
  }
}

console.log(`\n✅ Done. ${updated}/${slugs.length} products updated.`)
