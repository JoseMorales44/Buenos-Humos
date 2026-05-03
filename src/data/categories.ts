/** One row per gallery image — shown in the category modal when that slide is active. */
export interface CategoryProduct {
  name: string
  nameEn: string
  detail: string
  detailEn: string
}

export interface Category {
  id: string
  title: string
  titleEn: string
  subtitle: string
  subtitleEn: string
  icon: string
  description: string
  descriptionEn: string
  color: string
  images: string[]
  /** Same length as `images`; each item describes the product in that photo. */
  products: CategoryProduct[]
  whatsapp: string
}

export const CATEGORIES: Category[] = [
  {
    id: 'bongs',
    title: 'Pipas & Bongs',
    titleEn: 'Pipes & Bongs',
    subtitle: 'Ingeniería extraterrestre',
    subtitleEn: 'Alien Engineering',
    icon: '👽',
    description:
      'Bongs de borosilicato, silicona de grado alimenticio y diseños animados exóticos. Arte funcional para una filtración superior.',
    descriptionEn:
      'Borosilicate bongs, food-grade silicone, and exotic animated designs. Functional art for superior filtration.',
    color: 'bg-yellow-400',
    images: [
      '/categorias/pipas-bongs/bong-vidrio-rosa.webp',
      '/categorias/pipas-bongs/pipas-ceramica.webp',
      '/categorias/pipas-bongs/vaso-bong.webp',
      '/categorias/pipas-bongs/bongs-animados.webp',
    ],
    products: [
      {
        name: 'Bong de vidrio rosa',
        nameEn: 'Pink glass bong',
        detail:
          'Pieza de borosilicato resistente al calor, acabado rosa y buen volumen de agua para humos suaves. Ideal si buscas estética y filtración limpia.',
        detailEn:
          'Heat-resistant borosilicate piece, pink finish, solid water volume for smooth draws. Great when you want looks and clean filtration.',
      },
      {
        name: 'Pipas de cerámica',
        nameEn: 'Ceramic pipes',
        detail:
          'Pipas compactas en cerámica: tacto agradable, fáciles de limpiar y perfectas para sesiones rápidas sin complicarte.',
        detailEn:
          'Compact ceramic pipes: nice in the hand, easy to clean, perfect for quick sessions without fuss.',
      },
      {
        name: 'Vaso / bong estilo copa',
        nameEn: 'Cup-style bong',
        detail:
          'Diseño tipo vaso con base estable; buena ergonomía y chispa visual para tu mesa. Pregunta por colores y tallas disponibles.',
        detailEn:
          'Cup-style build with a stable base; ergonomic and a statement on the table. Ask about colors and sizes in stock.',
      },
      {
        name: 'Bongs animados / colección exótica',
        nameEn: 'Animated / exotic bongs',
        detail:
          'Piezas con personajes y formas animadas: colección que rota según llegadas. Te asesoramos cuál encaja con tu estilo y uso.',
        detailEn:
          'Character-shaped and animated-style pieces; stock rotates with new drops. We help you pick what fits your style.',
      },
    ],
    whatsapp: '¡Hola BH! 👽 Quiero más información de bongs y piezas de vidrio.',
  },
  {
    id: 'cueros',
    title: 'Cueros & Accesorios',
    titleEn: 'Papers & Accessories',
    subtitle: 'Ritual orgánico',
    subtitleEn: 'Organic Ritual',
    icon: '📄',
    description:
      'Mitigamos el riesgo con fibras naturales. Raw, OCB y Blazy Susan. Blunts 100% cáñamo y opciones con fibra de fruta.',
    descriptionEn:
      'Risk mitigation with natural fibers. Raw, OCB, and Blazy Susan. 100% hemp blunts and fruit fiber options.',
    color: 'bg-blue-400',
    images: [
      '/categorias/cueros-accesorios/rolling-machine.webp',
      '/categorias/cueros-accesorios/bandejas.webp',
      '/categorias/cueros-accesorios/cueros.webp',
      '/categorias/cueros-accesorios/cueros_blunt.webp',
      '/categorias/cueros-accesorios/encendedor.webp',
    ],
    products: [
      {
        name: 'Máquina de enrollar',
        nameEn: 'Rolling machine',
        detail:
          'Enrollado uniforme y rápido; reduce desperdicio de material y es ideal si estás empezando o quieres acabado prolijo.',
        detailEn:
          'Fast, even rolls; less waste and great if you are learning or want a neat finish every time.',
      },
      {
        name: 'Bandejas y organizadores',
        nameEn: 'Trays and organizers',
        detail:
          'Bandejas para preparar sin ensuciar, con diseños de marca y tamaños para casa o viaje. Complementos para tu ritual ordenado.',
        detailEn:
          'Prep trays that keep mess down, branded designs, sizes for home or travel. Keeps your ritual tidy.',
      },
      {
        name: 'Papeles y fibras naturales',
        nameEn: 'Natural-fiber papers',
        detail:
          'Raw, OCB, Blazy Susan y más: fibras naturales para mitigar irritación. Te orientamos según grosor, quema y sabor.',
        detailEn:
          'Raw, OCB, Blazy Susan and more—natural fibers to reduce harshness. We guide you on thickness, burn, and taste.',
      },
      {
        name: 'Blunts de cáñamo',
        nameEn: 'Hemp blunts',
        detail:
          'Envolturas 100% cáñamo y opciones con fibra de fruta; sabor limpio y menor química que alternativas industriales.',
        detailEn:
          '100% hemp wraps and fruit-fiber options; cleaner taste and less industrial chemistry than cheap alternatives.',
      },
      {
        name: 'Encendedores y fuego',
        nameEn: 'Lighters and flame',
        detail:
          'Encendedores confiables y accesorios para encender sin quemar exceso de papel. Pide el modelo que prefieras en tienda.',
        detailEn:
          'Reliable lighters and tools so you light without torching the paper. Ask what we have in store.',
      },
    ],
    whatsapp: '¡Hola BH! 📄 Busco cueros orgánicos y accesorios de enrolado.',
  },
  {
    id: 'grow',
    title: 'Grow Shop',
    titleEn: 'Grow Shop',
    subtitle: 'Jardín espacial',
    subtitleEn: 'Space Garden',
    icon: '🌳',
    description:
      'Asesoría técnica, genéticas exóticas, nutrientes y luces LED de alta gama para tu autocultivo.',
    descriptionEn: 'Technical advice, exotic genetics, nutrients, and high-end LED lights for your home grow.',
    color: 'bg-green-400',
    images: ['/categorias/grow/grow.webp'],
    products: [
      {
        name: 'Grow shop integral',
        nameEn: 'Full grow shop lineup',
        detail:
          'Genéticas, sustratos, nutrientes, iluminación LED y asesoría técnica para cada fase. Te armamos lista según espacio, presupuesto y experiencia.',
        detailEn:
          'Genetics, media, nutrients, LED lighting, and stage-by-stage advice. We build a list for your space, budget, and skill level.',
      },
    ],
    whatsapp: '¡Hola BH! 🌳 Necesito asesoría y suministros para mi cultivo.',
  },
  {
    id: 'cbd',
    title: 'CBD & Medicinal',
    titleEn: 'CBD & Medicinal',
    subtitle: 'Bienestar galáctico',
    subtitleEn: 'Galactic Wellness',
    icon: '🧘‍♂️',
    description: 'Gotas para mascotas, cremas potentes para humanos y gomitas para el sueño. Bienestar galáctico.',
    descriptionEn: 'Drops for pets, potent creams for humans, and sleep gummies. Galactic wellness.',
    color: 'bg-purple-400',
    images: ['/categorias/cbd-medicinal/cbd_1.webp'],
    products: [
      {
        name: 'Línea CBD y bienestar',
        nameEn: 'CBD wellness line',
        detail:
          'Gotas para mascotas, tópicos y formatos orales para descanso y confort. Explicamos concentración, uso responsable y lo que conviene consultar con un profesional.',
        detailEn:
          'Pet drops, topicals, and oral formats for rest and comfort. We explain strength, responsible use, and when to talk to a clinician.',
      },
    ],
    whatsapp: '¡Hola BH! 🧘‍♂️ Busco soluciones de CBD medicinal.',
  },
  {
    id: 'vape',
    title: 'Vape & Tech',
    titleEn: 'Vape & Tech',
    subtitle: 'Discreción y tecnología',
    subtitleEn: 'Discretion & Tech',
    icon: '💨',
    description:
      'Vaporizadores desechables/recargables y hardware especializado para destilados. Lujo discreto.',
    descriptionEn: 'Disposable/rechargeable vaporizers and specialized hardware for distillates. Discreet luxury.',
    color: 'bg-orange-400',
    images: [
      '/categorias/vape-tech/vape_tech_1.webp',
      '/categorias/vape-tech/vape_tech_2.webp',
      '/categorias/vape-tech/vape_tech_3.webp',
      '/categorias/vape-tech/vape_tech_4.webp',
      '/categorias/vape-tech/vape_tech_5.webp',
    ],
    products: [
      {
        name: 'Vape / pod compacto',
        nameEn: 'Compact vape / pod',
        detail:
          'Formato bolsillo, discreto para salir. Compatible con líneas que manejamos en tienda; te mostramos resistencias y cuidados.',
        detailEn:
          'Pocket-sized and discreet for on the go. We carry compatible lines—ask about coils and maintenance.',
      },
      {
        name: 'Batería y cartucho',
        nameEn: 'Battery and cartridge setup',
        detail:
          'Combinaciones de voltaje y flujo para destilados; evita quemados y alarga la vida del atomizador con buen uso.',
        detailEn:
          'Voltage and airflow pairings for distillates; avoids burning and extends atomizer life with proper use.',
      },
      {
        name: 'Vaporizador de mesa o sesión',
        nameEn: 'Session / desktop-style vape',
        detail:
          'Más vapor y control de temperatura para quien prefiere sesión en casa. Ideal para explorar terpenos sin combustión directa.',
        detailEn:
          'More vapor and temp control for home sessions. Great for exploring terpenes without direct combustion.',
      },
      {
        name: 'Repuestos y accesorios',
        nameEn: 'Spares and accessories',
        detail:
          'Boquillas, bases de carga y piezas de desgaste según modelo. Si traes foto o marca, ubicamos repuesto o equivalente.',
        detailEn:
          'Mouthpieces, charging docks, wear parts by model. Send a photo or brand and we match spares or equivalents.',
      },
      {
        name: 'Novedades en vape',
        nameEn: 'Latest vape drops',
        detail:
          'Rotación de modelos nuevos y ediciones limitadas. Escríbenos por WhatsApp con el estilo que buscas (discreto, nube, sabor).',
        detailEn:
          'Rotating new models and limited drops. WhatsApp us with the style you want—discreet, clouds, or flavor-first.',
      },
    ],
    whatsapp: '¡Hola BH! 💨 Quiero ver los vaporizadores y baterías disponibles.',
  },
  {
    id: 'tabaco',
    title: 'Tabaco',
    titleEn: 'Tobacco',
    subtitle: 'Ritual clásico',
    subtitleEn: 'Classic Ritual',
    icon: '🚬',
    description: 'Tabaco en bolsa, filtros y marcas de culto como Backwoods y Captain Pipe.',
    descriptionEn: 'Pouch tobacco, filters, and cult brands like Backwoods and Captain Pipe.',
    color: 'bg-red-400',
    images: ['/categorias/tabaco/tabaco_1.webp'],
    products: [
      {
        name: 'Tabaco en bolsa y clásicos',
        nameEn: 'Pouch tobacco and classics',
        detail:
          'Tabaco para liar, filtros y marcas icónicas tipo Backwoods / Captain Pipe según disponibilidad. Te orientamos corte, humedad y conservación.',
        detailEn:
          'Rolling tobacco, filters, and iconic brands like Backwoods / Captain Pipe when in stock. We help with cut, humidity, and storage.',
      },
    ],
    whatsapp: '¡Hola BH! 🚬 Busco tabaco y accesorios clásicos.',
  },
  {
    id: 'merch',
    title: 'BH-Merch',
    titleEn: 'BH-Merch',
    subtitle: 'Estilo fuera de este mundo',
    subtitleEn: 'Out of this World Style',
    icon: '✨',
    description: 'Cojines, Flower Bags y carteras exclusivas con el sello Luxury de la casa.',
    descriptionEn: 'Cushions, Flower Bags, and exclusive purses with the house Luxury seal.',
    color: 'bg-pink-400',
    images: [
      '/categorias/bh-merch/cojin-blazy-susan.webp',
      '/categorias/bh-merch/cojines.webp',
      '/categorias/bh-merch/cojines-buenos-humos.webp',
      '/categorias/bh-merch/bh-bags.webp',
    ],
    products: [
      {
        name: 'Cojín Blazy Susan',
        nameEn: 'Blazy Susan cushion',
        detail:
          'Cojín oficial con estética rosa y comodidad para tu sala o grow corner. Pieza de colección para fans de la marca.',
        detailEn:
          'Official cushion with Blazy pink vibes for your lounge or grow corner. A collector piece for fans of the brand.',
      },
      {
        name: 'Colección de cojines',
        nameEn: 'Cushion collection',
        detail:
          'Variedad de estampados y tamaños para combinar con tu espacio. Pregunta por el set que tengamos en sede Norte o Sur.',
        detailEn:
          'Assorted prints and sizes to match your space. Ask what we have at North or South locations.',
      },
      {
        name: 'Cojines Buenos Humos',
        nameEn: 'Buenos Humos cushions',
        detail:
          'Branding BH Luxury: detalle bordado o estampado según modelo. Perfecto para regalo o para marcar tu spot favorito.',
        detailEn:
          'BH Luxury branding—embroidery or print by model. Great as a gift or to mark your favorite spot.',
      },
      {
        name: 'Flower Bags / carteras',
        nameEn: 'Flower Bags / purses',
        detail:
          'Bolsos y carteras con sello exclusivo para llevar tu kit con estilo. Capacidad y compartimentos según diseño—consúltanos por color.',
        detailEn:
          'Bags and purses with exclusive branding to carry your kit in style. Capacity and pockets vary by design—ask about colors.',
      },
    ],
    whatsapp: '¡Hola BH! ✨ Quiero ver la mercancía exclusiva de la marca.',
  },
]
