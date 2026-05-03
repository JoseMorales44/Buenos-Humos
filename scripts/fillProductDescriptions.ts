import { WP_BASE, wpFetch } from './wpAuth'

interface WpPost {
  id: number
  slug: string
  acf?: Record<string, unknown>
}

interface Desc {
  es: string
  en: string
}

const DESCRIPTIONS: Record<string, Desc> = {
  'top-puff': {
    es: 'Bong portátil inflable tipo botella. Se llena con agua para filtrado suave, se desinfla para guardar en segundos. Ideal para llevar a festivales, parques o planes fuera de casa sin cargar piezas frágiles.',
    en: 'Inflatable bottle-style bong. Fill with water for smooth filtration, deflate and pack it away in seconds. Perfect for festivals, parks or trips when you don’t want to carry fragile glass.',
  },
  'sopletes-floppi': {
    es: 'Soplete recargable con llama azul de alta temperatura. Resistente al viento, ideal para encender dabs, conos y sesiones al aire libre. Cuerpo robusto y carga de gas butano en segundos.',
    en: 'Refillable torch lighter with a high-temp blue flame. Wind-resistant and perfect for dabs, cones and outdoor sessions. Solid build and fast butane refill.',
  },
  smokebuddy: {
    es: 'Filtro personal de carbón activado que elimina olor y humo al exhalar. Perfecto para sesiones discretas en casa, apartamentos o viajes. Dura cientos de usos antes de necesitar reemplazo.',
    en: 'Personal activated-carbon filter that removes odor and smoke on exhale. Great for discreet sessions at home, apartments or travel. Lasts hundreds of uses before replacement.',
  },
  powerhitter: {
    es: 'Boquilla de silicona con válvula que permite sesiones compartidas sin contacto directo. Higiénico, fácil de limpiar y compatible con conos armados o porros.',
    en: 'Silicone valve mouthpiece for hands-free shared sessions. Hygienic, easy to clean and compatible with pre-rolled cones or joints.',
  },
  'pots-mijo': {
    es: 'Frascos herméticos de vidrio para conservar flor fresca, preservando aroma y humedad. Tapa con sello opaco que bloquea la luz y evita que pierda propiedades.',
    en: 'Airtight glass jars that keep flower fresh, locking in aroma and moisture. Opaque seal blocks light and prevents quality loss.',
  },
  'pipa-silicona-anticaida': {
    es: 'Pipa de silicona flexible e irrompible. Resistente a golpes y caídas, fácil de limpiar bajo agua. Ideal para uso diario, viajes y exteriores.',
    en: 'Flexible unbreakable silicone pipe. Drop-proof, easy to rinse under water. Perfect for daily use, travel and outdoors.',
  },
  'pipa-con-candela': {
    es: 'Pipa de diseño compacto con encendedor integrado en la base. Menos accesorios para cargar y una sola pieza lista para encender donde estés.',
    en: 'Compact pipe with a built-in lighter in the base. Fewer accessories to carry — one piece, ready to spark anywhere.',
  },
  'narguila-grandes': {
    es: 'Narguila de tamaño grande con base de vidrio y manguera flexible. Filtrado profundo de humo para sesiones largas en grupo. Incluye plato y boquillas.',
    en: 'Large-size hookah with glass base and flexible hose. Deep smoke filtration for long group sessions. Tray and mouthpieces included.',
  },
  'mechas-raw': {
    es: 'Mechas de cáñamo natural sin químicos. Encienden de forma limpia y duradera, ideales como reemplazo del encendedor tradicional. Caja resellable.',
    en: 'Natural hemp wicks with no chemicals. Clean, long-lasting flame — a chemical-free alternative to lighters. Resealable box.',
  },
  'licuadora-kingpalm': {
    es: 'Hoja de palma natural prearmada lista para rellenar. Sin tabaco, sin químicos. Combustión lenta y sabor suave, se adapta a distintos gramajes.',
    en: 'Pre-rolled natural palm leaf ready to fill. Tobacco-free, chemical-free. Slow burn, mellow taste, fits different loads.',
  },
  'hookah-lits': {
    es: 'Narguila compacta con base iluminada LED. Portable, fácil de armar y desarmar, ideal para sesiones en casa o reuniones pequeñas. Incluye manguera y boquilla.',
    en: 'Compact hookah with LED-lit base. Portable, easy to assemble and break down — great for home sessions or small gatherings. Hose and mouthpiece included.',
  },
  'guarda-porros-raw': {
    es: 'Tubo hermético de aluminio RAW para guardar porros armados. Evita que se aplasten, conserva el aroma y cabe fácilmente en el bolsillo.',
    en: 'RAW airtight aluminum tube for storing pre-rolls. Keeps joints intact, seals in aroma and fits easily in your pocket.',
  },
  'grinder-raw': {
    es: 'Grinder metálico RAW de 4 piezas con dientes afilados y compartimento para kief. Molienda uniforme para armados parejos y combustión óptima.',
    en: 'RAW 4-piece metal grinder with sharp teeth and kief catcher. Even grind for consistent rolls and optimal burn.',
  },
  'grinder-hamburguesa': {
    es: 'Grinder de aluminio con diseño divertido tipo hamburguesa. 3 piezas, dientes afilados y acabado antideslizante. Un detalle ideal para tu kit diario.',
    en: 'Aluminum grinder with a fun burger design. 3 pieces, sharp teeth and a non-slip finish. A playful must-have in your daily kit.',
  },
  'filtros-trofill': {
    es: 'Filtros prearmados Trofill listos para usar. Densidad media que retira impurezas sin sacrificar sabor. Caja resellable para mantenerlos limpios.',
    en: 'Pre-rolled Trofill filters, ready to use. Medium density removes impurities without killing flavor. Resealable box keeps them clean.',
  },
  'filtros-buenos-humos': {
    es: 'Tips de cartón reciclado marca Buenos Humos. Perforación suave, ideales para tirar parejo. Empaque resellable, 100% biodegradable.',
    en: 'Buenos Humos recycled-cardboard tips. Soft perforation for a smooth draw. Resealable pack, 100% biodegradable.',
  },
  'cueros-raw-dorados': {
    es: 'Papeles RAW dorados 1¼. Fibra natural sin blanqueadores, combustión lenta y pareja. Los favoritos de quienes buscan un armado clásico y limpio.',
    en: 'RAW Gold 1¼ rolling papers. Natural unbleached fiber with slow, even burn. A classic pick for smooth, clean rolls.',
  },
  'cueros-raw-black-organic-hemp': {
    es: 'Papeles RAW Black Organic Hemp, ultra finos. Cáñamo orgánico, sabor neutro y combustión pareja. La línea premium para quienes quieren sentir solo la flor.',
    en: 'RAW Black Organic Hemp papers — ultra thin. Organic hemp, neutral taste and even burn. The premium line for pure flavor.',
  },
  'cueros-c-thru': {
    es: 'Papeles transparentes C-Thru de celulosa vegetal. Queman limpios, sin sabor y sin ceniza oscura. Una experiencia moderna para verla arder.',
    en: 'C-Thru transparent papers made from vegetable cellulose. Clean burn, no taste, no dark ash. A modern experience — watch it burn.',
  },
  'cueros-blazy-susan-rosados': {
    es: 'Papeles Blazy Susan rosados 1¼. Diseño icónico, papel ultra fino y combustión lenta. Un clásico con estilo para cualquier armado.',
    en: 'Blazy Susan pink 1¼ papers. Iconic design, ultra-thin paper and slow burn. A stylish classic for any roll.',
  },
  'conos-raw-x3': {
    es: 'Tres conos RAW pre-armados listos para rellenar. Sin pegamento extra, papel clásico RAW. Perfectos para ahorrar tiempo sin perder calidad.',
    en: 'Three RAW pre-rolled cones ready to fill. No extra glue, classic RAW paper. Save time without losing quality.',
  },
  'cono-challenge-raw': {
    es: 'Cono gigante RAW estilo Challenge para compartir. Armado sencillo gracias a su tamaño, ideal para sesiones grupales y fotos memorables.',
    en: 'Giant RAW Challenge cone for sharing. Easy to fill thanks to the size — perfect for group sessions and memorable photos.',
  },
  cojines: {
    es: 'Cojines Buenos Humos con estampados originales. Perfectos para acomodar tu rincón de sesión. Tela resistente y relleno firme.',
    en: 'Buenos Humos cushions with original prints. Perfect to set up your session corner. Durable fabric and firm filling.',
  },
  clippers: {
    es: 'Encendedores Clipper recargables con diseños coleccionables. Piedra reemplazable y llama ajustable. El clásico que nunca falla.',
    en: 'Refillable Clipper lighters with collectible designs. Replaceable flint and adjustable flame. The classic that never fails.',
  },
  'cenicero-smoking-redondo': {
    es: 'Cenicero Smoking redondo de vidrio grueso. Base estable, fácil de limpiar y diseño clásico que no pasa de moda.',
    en: 'Round thick-glass Smoking ashtray. Stable base, easy to clean and a timeless classic design.',
  },
  'cenicero-raw': {
    es: 'Cenicero RAW con logo grabado. Metálico, resistente y con ranuras para sostener el armado. Un clásico de la marca en tu mesa.',
    en: 'RAW ashtray with engraved logo. Metal, durable, with slots to hold your roll. A brand classic on your table.',
  },
  'cargador-bateria-usb': {
    es: 'Cargador USB universal para baterías de vape 510. Compacto, con LED indicador de carga. Compatible con la mayoría de baterías del catálogo.',
    en: 'Universal USB charger for 510 vape batteries. Compact with LED status indicator. Works with most batteries in our catalog.',
  },
  'candlea-zippo': {
    es: 'Encendedor Zippo original con llama al viento y cuerpo metálico. Ícono coleccionable, recargable con gasolina Zippo. Garantía de por vida del fabricante.',
    en: 'Original Zippo lighter with windproof flame and all-metal body. A collectible icon, refillable with Zippo fluid. Manufacturer lifetime warranty.',
  },
  'candelas-raw': {
    es: 'Fósforos largos RAW en caja rasposa. Ideales para encender narguilas, velas y exteriores donde un encendedor no alcanza.',
    en: 'RAW long matches in a strike-box. Perfect for lighting hookahs, candles and outdoor spots where a lighter falls short.',
  },
  'camisetas-bh-benjamin': {
    es: 'Camiseta Buenos Humos colección Benjamín. Algodón 100%, estampado original y corte unisex. Edición limitada.',
    en: 'Buenos Humos Benjamín-collection t-shirt. 100% cotton, original print, unisex fit. Limited edition.',
  },
  'camiseta-de-bh-x-pablotunes': {
    es: 'Camiseta colaboración Buenos Humos x PabloTunes. Algodón premium con arte exclusivo de la colaboración. Pieza de colección.',
    en: 'Buenos Humos x PabloTunes collab tee. Premium cotton with exclusive artwork from the collaboration. A collector piece.',
  },
  'bong-raw': {
    es: 'Bong RAW de vidrio borosilicato con percolador y difusor. Filtrado suave, golpes más limpios y base estable. Incluye bowl RAW.',
    en: 'RAW borosilicate glass bong with percolator and diffuser. Smooth filtration, cleaner hits and a stable base. RAW bowl included.',
  },
  'blones-qara': {
    es: 'Blunts Qara de cáñamo 100% natural. Sin tabaco, combustión lenta y sabor suave. Presentación resellable para mantener frescura.',
    en: 'Qara 100% natural hemp blunts. Tobacco-free, slow burn and mellow flavor. Resealable pack keeps them fresh.',
  },
  'blones-magx-palm': {
    es: 'Blunt de hoja de palma MagX. Prearmada, sin tabaco y con combustión muy lenta. Sabor terroso suave que resalta la flor.',
    en: 'MagX palm-leaf blunt. Pre-rolled, tobacco-free, very slow burn. Soft earthy flavor that lets the flower shine.',
  },
  'blones-lions-rolling-amarillos': {
    es: 'Blunts Lions Rolling amarillos con sabor suave. Papel fino y combustión pareja. Diseño icónico para un armado con estilo.',
    en: 'Yellow Lions Rolling blunts with mild flavor. Thin paper, even burn. Iconic design for a stylish roll.',
  },
  'blones-high-hemp': {
    es: 'Blunt High Hemp orgánico sin tabaco. Hoja de cáñamo artesanal, combustión lenta y sabor natural. Una opción más limpia que el tabaco.',
    en: 'Organic High Hemp blunt — tobacco-free. Handcrafted hemp wrap, slow burn and natural flavor. A cleaner alternative to tobacco.',
  },
  'blones-blazy-susan': {
    es: 'Blunts rosados Blazy Susan prearmados. Papel icónico, combustión lenta y look inconfundible para una sesión con estilo.',
    en: 'Pre-rolled Blazy Susan pink blunts. Iconic paper, slow burn and an unmistakable look for a stylish session.',
  },
  'blones-backwoods-morados': {
    es: 'Blunts Backwoods morados, sabor uva. Hoja natural enrollada a mano, combustión lenta e intensa. Los favoritos de quienes buscan potencia.',
    en: 'Purple Backwoods blunts, grape flavor. Hand-rolled natural leaf with a slow, intense burn. A favorite for full-bodied sessions.',
  },
  'baterias-mijo': {
    es: 'Batería Mijo 510 con ajuste de voltaje y carga USB-C. Compacta, discreta y compatible con cartuchos estándar del mercado.',
    en: 'Mijo 510 battery with adjustable voltage and USB-C charging. Compact, discreet and compatible with standard cartridges.',
  },
  'bateria-pt420-rossin': {
    es: 'Batería PT420 Rossin con carga rápida y varios niveles de temperatura. Construcción sólida y autonomía para todo el día.',
    en: 'PT420 Rossin battery with fast charging and multiple heat levels. Solid build and full-day battery life.',
  },
  'bateria-kodo-pro': {
    es: 'Batería Kodo Pro ultra compacta estilo llavero. Carga rápida USB-C, botón único y perfil delgado que cabe en cualquier bolsillo.',
    en: 'Ultra-compact Kodo Pro keychain-style battery. Fast USB-C charging, single button and slim profile that fits any pocket.',
  },
  'bateria-brass': {
    es: 'Batería Brass de acabado metálico dorado. Rosca 510 universal, buena autonomía y diseño elegante para cartuchos premium.',
    en: 'Brass battery with a gold metallic finish. Universal 510 thread, solid battery life and a sleek look for premium carts.',
  },
  'bandeja-con-tapa': {
    es: 'Bandeja de armado con tapa magnética. Espacio amplio para moler, filtrar y armar sin perder ni un gramo. Perfecta para guardar todo entre sesiones.',
    en: 'Rolling tray with magnetic lid. Plenty of room to grind, filter and roll without losing a crumb. Perfect for storing your kit between sessions.',
  },
  'armadora-backwoods-9': {
    es: 'Máquina armadora Backwoods #9 para blunts de tamaño grande. Cuero sintético duradero, rodillos suaves y armados parejos sin esfuerzo.',
    en: 'Backwoods #9 rolling machine for large blunts. Durable synthetic leather, smooth rollers and effortless even rolls.',
  },
  'aceite-de-cbd-keep-calm': {
    es: 'Aceite de CBD Keep Calm de espectro amplio. Gotero dosificador, ideal para apoyar el descanso, reducir estrés y molestias leves. Consumo sublingual.',
    en: 'Keep Calm broad-spectrum CBD oil. Dropper dosing — supports rest, stress relief and mild discomfort. Sublingual use.',
  },
  'ace-ultra-celular': {
    es: 'Vape desechable Ace Ultra con formato tipo celular. Varios sabores, batería de larga duración y calentamiento rápido. Listo para usar, sin recarga.',
    en: 'Ace Ultra disposable vape with a phone-style format. Multiple flavors, long-lasting battery and fast heat-up. Ready out of the box — no refill.',
  },
}

console.log(`→ Authenticating with ${WP_BASE}…`)
await wpFetch<{ name: string }>('GET', '/wp-json/wp/v2/users/me')
console.log('  ✓ authenticated\n')

const slugs = Object.keys(DESCRIPTIONS)
console.log(`→ Writing descriptions for ${slugs.length} products…\n`)

let updated = 0
let skipped = 0
for (const slug of slugs) {
  const found = await wpFetch<WpPost[]>('GET', `/wp-json/wp/v2/products?slug=${encodeURIComponent(slug)}`)
  if (found.length === 0) {
    console.log(`  ! ${slug}: product not found, skip`)
    skipped++
    continue
  }
  const desc = DESCRIPTIONS[slug]
  await wpFetch<WpPost>('POST', `/wp-json/wp/v2/products/${found[0].id}`, {
    acf: { description_es: desc.es, description_en: desc.en },
  })
  console.log(`  ✓ ${slug}`)
  updated++
}

console.log(`\n✅ Done. ${updated} updated, ${skipped} skipped.`)
