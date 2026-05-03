import type { Category } from './categories'
import { CATEGORIES } from './categories'

/** Text block appended to Salinas system prompt so the model only names real catalog lines. */
export function buildCatalogPromptBlock(lang: 'es' | 'en'): string {
  const lines: string[] = []
  lines.push('---')
  lines.push('CATÁLOGO BUENOS HUMOS (OBLIGATORIO)')
  lines.push(
    'Solo puedes recomendar por nombre productos que aparezcan explícitamente en el bloque siguiente. Si no hay un producto concreto para el caso, orienta con la categoría (p. ej. Grow Shop), menciona las sedes y WhatsApp, y no inventes referencias ni marcas que no estén listadas.',
  )
  lines.push('')

  const pick = (cat: Category) => {
    const title = lang === 'es' ? cat.title : cat.titleEn
    const desc = lang === 'es' ? cat.description : cat.descriptionEn
    lines.push(`[${cat.id}] ${title}`)
    lines.push(`  Resumen: ${desc}`)
    for (const p of cat.products) {
      const name = lang === 'es' ? p.name : p.nameEn
      const detail = lang === 'es' ? p.detail : p.detailEn
      lines.push(`  - ${name}: ${detail}`)
    }
    lines.push('')
  }

  for (const cat of CATEGORIES) {
    pick(cat)
  }

  return lines.join('\n')
}
