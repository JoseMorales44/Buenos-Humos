import { WP_BASE, getJwtToken, wpFetch } from './wpAuth'

console.log(`→ JWT login on ${WP_BASE}…`)
const token = await getJwtToken()
console.log(`  ✓ token received (length ${token.length})`)

console.log('\n→ Authenticated /users/me')
const me = await wpFetch<{ name: string; id: number }>('GET', '/wp-json/wp/v2/users/me')
console.log(`  ✓ ${me.name} (id ${me.id})`)

console.log('\n→ /products')
const products = await wpFetch<unknown[]>('GET', '/wp-json/wp/v2/products')
console.log(`  ✓ ${products.length} products`)

console.log('\n→ /product_categories')
const cats = await wpFetch<unknown[]>('GET', '/wp-json/wp/v2/product_categories')
console.log(`  ✓ ${cats.length} categories`)

console.log('\n✅ All checks passed.')
