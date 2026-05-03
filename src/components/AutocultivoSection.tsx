import { useApp } from '../context/AppContext'
// 
const CULTIVATION_BG = '/CULTIVATION.jpeg'
const WHATSAPP_NUMBER = '573165871602'

/// Cambio minor: Se actualizó el texto del mensaje de WhatsApp para que sea más específico sobre el kit de inicio Cali Gold, facilitando la comunicación directa con los clientes interesados en ese producto. Además, se ajustó el diseño del botón para mejorar su visibilidad y atractivo, incentivando a los usuarios a solicitar asesoría técnica.
export function AutocultivoSection() {
  const { lang } = useApp()

  const texts = {
    es: {
      eyebrow: '04.',
      title: 'AUTOCULTIVO: TECNOLOGÍA Y AUTONOMÍA',
      lead:
        'Transforme su espacio en un jardín de alta eficiencia. En Buenos Humos le entregamos la tecnología y el conocimiento técnico para que su proceso de cultivo sea autónomo, seguro y de resultados superiores. Sin intermediarios, solo calidad real respaldada por expertos en horticultura.',
      kitLabel: 'KIT DESTACADO',
      kitTitle: 'KIT DE INICIO PROFESIONAL',
      kitSubtitle: 'Cali Gold',
      kitIncludes: 'Incluye:',
      kitItems: [
        'Carpa de cultivo Pro',
        'Iluminación LED Full Spectrum',
        'Set de macetas de tela',
        'Sustrato abonado premium',
        'Instrumentación de medición (pH / EC)',
      ],
      kitCta: 'SOLICITAR ASESORÍA TÉCNICA',
      catalogTitle: 'CATÁLOGO TÉCNICO',
      catalog: [
        {
          title: 'Nutrición Avanzada',
          desc: 'Fertilizantes y bioestimulantes para cada etapa del cultivo.',
        },
        {
          title: 'Sustratos de Élite',
          desc: 'Mezclas aireadas para un desarrollo radicular óptimo.',
        },
        {
          title: 'Protección de Cultivo',
          desc: 'Soluciones preventivas contra patógenos y plagas.',
        },
        {
          title: 'Hardware de Cultivo',
          desc: 'Carpas, ventilación y control ambiental.',
        },
      ],
      legalLabel: 'MARCO LEGAL',
      legal:
        'Derecho al Autocultivo: Según la Ley 30 de 1986, se permite el cultivo de hasta 20 plantas para uso personal. El Decreto 811 de 2021 avala el suministro legal de genética. Cultive con respaldo legal.',
      kitWaMessage: '¡Hola BH! 🌳 Quiero asesoría técnica para el Kit de Inicio Cali Gold.',
    },
    en: {
      eyebrow: '04.',
      title: 'HOME GROWING: TECHNOLOGY & AUTONOMY',
      lead:
        'Turn your space into a high-efficiency garden. At Buenos Humos we provide the technology and technical know-how so your grow is autonomous, safe and delivers superior results. No middlemen — just real quality backed by horticulture experts.',
      kitLabel: 'FEATURED KIT',
      kitTitle: 'PROFESSIONAL STARTER KIT',
      kitSubtitle: 'Cali Gold',
      kitIncludes: 'Includes:',
      kitItems: [
        'Pro grow tent',
        'Full Spectrum LED lighting',
        'Fabric pot set',
        'Premium pre-fertilized substrate',
        'Measurement instruments (pH / EC)',
      ],
      kitCta: 'REQUEST TECHNICAL ADVICE',
      catalogTitle: 'TECHNICAL CATALOG',
      catalog: [
        {
          title: 'Advanced Nutrition',
          desc: 'Fertilizers and biostimulants for every stage of the grow.',
        },
        {
          title: 'Elite Substrates',
          desc: 'Aerated mixes for optimal root development.',
        },
        {
          title: 'Crop Protection',
          desc: 'Preventive solutions against pathogens and pests.',
        },
        {
          title: 'Grow Hardware',
          desc: 'Tents, ventilation and environmental control.',
        },
      ],
      legalLabel: 'LEGAL FRAMEWORK',
      legal:
        'Right to Home Grow: Under Law 30 of 1986, growing up to 20 plants for personal use is permitted. Decree 811 of 2021 backs the legal supply of genetics. Grow with legal support.',
      kitWaMessage: "Hi BH! 🌳 I'd like technical advice for the Cali Gold Starter Kit.",
    },
  }

  const t = texts[lang as keyof typeof texts]
  const kitHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.kitWaMessage)}`

  return (
    <section
      id="autocultivo"
      className="relative scroll-mt-20 overflow-x-hidden border-y-4 border-black dark:border-white"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${CULTIVATION_BG})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 md:py-24">
        <p className="mb-2 text-center font-mono text-xs font-bold uppercase tracking-[0.3em] text-pink-400">
          {t.eyebrow}
        </p>
        <h2 className="text-center text-3xl font-black uppercase leading-[0.95] tracking-tighter text-white md:text-5xl">
          {t.title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-base font-medium leading-relaxed text-white/95 md:text-lg">
          {t.lead}
        </p>

        <div className="mt-12 rounded-xl border-4 border-black bg-white text-black shadow-[8px_8px_0_0_rgba(255,255,255,0.9)]">
          <div className="p-6 md:p-8">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-pink-600">
              {t.kitLabel} · {t.kitSubtitle}
            </p>
            <h3 className="mt-1 text-2xl font-black uppercase tracking-tight md:text-3xl">
              {t.kitTitle}
            </h3>
            <p className="mt-4 font-bold uppercase tracking-wide text-black/70">{t.kitIncludes}</p>
            <ul className="mt-2 space-y-1.5 text-base font-medium leading-relaxed md:text-lg">
              {t.kitItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 inline-block h-2 w-2 shrink-0 bg-pink-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={kitHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block border-4 border-black bg-pink-600 px-6 py-3 font-black uppercase tracking-wide text-white shadow-[4px_4px_0_0_#000] transition hover:bg-pink-500 hover:shadow-[6px_6px_0_0_#000]"
            >
              {t.kitCta}
            </a>
          </div>
        </div>

        <p className="mt-12 text-center font-mono text-xs font-bold uppercase tracking-[0.3em] text-pink-400">
          {t.catalogTitle}
        </p>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          {t.catalog.map((card) => (
            <div
              key={card.title}
              className="border-4 border-white bg-black/60 p-5 shadow-[6px_6px_0_0_rgba(255,255,255,0.2)] backdrop-blur-sm"
            >
              <h4 className="text-lg font-black uppercase tracking-tight text-white md:text-xl">
                {card.title}
              </h4>
              <p className="mt-2 text-sm font-medium leading-relaxed text-white/85 md:text-base">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 border-4 border-white/60 bg-black/70 p-4 md:p-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-pink-300">
            {t.legalLabel}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-white/85 md:text-sm">{t.legal}</p>
        </div>
      </div>
    </section>
  )
}
