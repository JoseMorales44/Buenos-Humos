import { useApp } from '../context/AppContext'

const CBD_BG =
  'https://www.vitabiotics-cbd.com/cdn/shop/articles/MicrosoftTeams-image_6.jpg?v=1627398765'
const WHATSAPP_NUMBER = '573165871602'

export function CbdSection() {
  const { lang } = useApp()

  const texts = {
    es: {
      eyebrow: '05.',
      title: 'CBD & MEDICINAL: EQUILIBRIO NATURAL',
      lead:
        'Recupere el bienestar natural de su cuerpo. Nuestro extracto de CBD está diseñado para quienes buscan alivio, enfoque y descanso profundo sin efectos psicoactivos. Calidad certificada para un estilo de vida consciente y equilibrado.',
      productLabel: 'PRODUCTO DESTACADO',
      productName: 'Aceite CBD Buenos Humos',
      productMeta: 'Full Spectrum · 30 ml',
      benefitsTitle: 'Beneficios:',
      benefits: [
        'Apoyo en recuperación muscular',
        'Regulación del sueño',
        'Control de ansiedad y estrés',
      ],
      productCta: 'ADQUIRIR PRODUCTO',
      legalLabel: 'REGULACIÓN MÉDICA',
      legal:
        'El acceso seguro al cannabis medicinal está protegido por la Ley 1787 de 2016. Conforme al Decreto 1138 de 2025, garantizamos productos con trazabilidad y cumplimiento normativo total.',
      closing:
        '¿Ya tiene el jardín a punto? Pase por nuestra boutique y complemente su experiencia con parafernalia de borosilicato y accesorios premium.',
      closingCta: 'EXPLORAR SMOKE SHOP',
      productWaMessage: '¡Hola BH! 🧘 Quiero adquirir el aceite CBD Full Spectrum 30 ml.',
    },
    en: {
      eyebrow: '05.',
      title: 'CBD & MEDICINAL: NATURAL BALANCE',
      lead:
        "Recover your body's natural wellness. Our CBD extract is designed for those seeking relief, focus and deep rest without psychoactive effects. Certified quality for a conscious and balanced lifestyle.",
      productLabel: 'FEATURED PRODUCT',
      productName: 'Buenos Humos CBD Oil',
      productMeta: 'Full Spectrum · 30 ml',
      benefitsTitle: 'Benefits:',
      benefits: [
        'Supports muscle recovery',
        'Sleep regulation',
        'Anxiety and stress control',
      ],
      productCta: 'GET THIS PRODUCT',
      legalLabel: 'MEDICAL REGULATION',
      legal:
        'Safe access to medical cannabis is protected by Law 1787 of 2016. In compliance with Decree 1138 of 2025, we guarantee products with full traceability and regulatory compliance.',
      closing:
        'Got the garden dialed in? Stop by our boutique and round out your experience with borosilicate gear and premium accessories.',
      closingCta: 'EXPLORE SMOKE SHOP',
      productWaMessage: "Hi BH! 🧘 I'd like to purchase the Full Spectrum CBD oil (30 ml).",
    },
  }

  const t = texts[lang as keyof typeof texts]
  const productHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.productWaMessage)}`

  return (
    <section
      id="cbd"
      className="relative scroll-mt-20 overflow-x-hidden border-b-4 border-black dark:border-white"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${CBD_BG})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/85 via-green-900/75 to-emerald-950/90" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 md:py-24">
        <p className="mb-2 text-center font-mono text-xs font-bold uppercase tracking-[0.3em] text-emerald-300">
          {t.eyebrow}
        </p>
        <h2 className="text-center text-3xl font-black uppercase leading-[0.95] tracking-tighter text-white md:text-5xl">
          {t.title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-base font-medium leading-relaxed text-white/95 md:text-lg">
          {t.lead}
        </p>

        <div className="mx-auto mt-12 max-w-2xl rounded-xl border-4 border-emerald-300 bg-black/55 p-6 text-white shadow-[8px_8px_0_0_rgba(16,185,129,0.55)] backdrop-blur-sm md:p-8">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-300">
            {t.productLabel}
          </p>
          <h3 className="mt-1 text-2xl font-black uppercase tracking-tight md:text-3xl">
            {t.productName}
          </h3>
          <p className="mt-1 font-mono text-sm text-emerald-200/90">{t.productMeta}</p>

          <p className="mt-5 font-bold uppercase tracking-wide text-white/80">{t.benefitsTitle}</p>
          <ul className="mt-2 space-y-1.5 text-base font-medium leading-relaxed md:text-lg">
            {t.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span aria-hidden className="mt-1 inline-block h-2 w-2 shrink-0 bg-emerald-400" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <a
            href={productHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block border-4 border-white bg-emerald-500 px-6 py-3 font-black uppercase tracking-wide text-black shadow-[4px_4px_0_0_#000] transition hover:bg-emerald-400 hover:shadow-[6px_6px_0_0_#000]"
          >
            {t.productCta}
          </a>
        </div>

        <div className="mt-10 border-4 border-emerald-300/60 bg-emerald-950/70 p-4 md:p-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-200">
            {t.legalLabel}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-white/85 md:text-sm">{t.legal}</p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-5 text-center">
          <p className="max-w-2xl text-base font-medium leading-relaxed text-white/90 md:text-lg">
            {t.closing}
          </p>
          <a
            href="#categories"
            className="inline-block border-4 border-white bg-transparent px-6 py-3 font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-emerald-950"
          >
            {t.closingCta}
          </a>
        </div>
      </div>
    </section>
  )
}
