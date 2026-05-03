import { WP_BASE, wpFetch } from './wpAuth'

const PACK_SLUGS = ['bongs-pack', 'cueros-pack', 'grow-pack', 'cbd-pack', 'vape-pack', 'tabaco-pack', 'merch-pack']

interface WpPost { id: number; slug: string }

console.log(`→ Deleting *-pack products on ${WP_BASE}…`)
for (const slug of PACK_SLUGS) {
  const found = await wpFetch<WpPost[]>('GET', `/wp-json/wp/v2/products?slug=${encodeURIComponent(slug)}`)
  if (found.length === 0) {
    console.log(`  · not found: ${slug}`)
    continue
  }
  for (const p of found) {
    await wpFetch<unknown>('DELETE', `/wp-json/wp/v2/products/${p.id}?force=true`)
    console.log(`  ✗ deleted: ${p.slug} (id ${p.id})`)
  }
}
console.log('\n✅ Cleanup complete.')
