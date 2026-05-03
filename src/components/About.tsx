import { useApp } from '../context/AppContext'

export function About() {
  const { lang } = useApp()

  const texts = {
    es: {
      title1: 'DE ESTE MUNDO',
      title2: 'PARA OTROS MUNDOS',
      body1:
        'En Buenos Humos no solo te vendemos parafernalia, te acompañamos en todo tu proceso, con base en Cali listos para despegar en cualquier momento.',
      body2:
        'Nuestra misión es que tengas unos "Buenos Humos" a través de la mitigación de riesgos, brindándote siempre los mejores productos para la salud de todos nosotros.',
      body3:
        'Somos un equipo enfocado en el cuidado e integridad de nuestros clientes, listos para acompañarlos en este intense pero inolvidable viaje.',
    },
    en: {
      title1: 'FROM THIS WORLD',
      title2: 'TO OTHER WORLDS',
      body1:
        "At Buenos Humos we don't just sell paraphernalia, we accompany you through your whole process, based in Cali ready to blast off at any moment.",
      body2:
        'Our mission is for you to have "Good Smokes" through risk mitigation, always providing the best products for everyone\'s health.',
      body3:
        'We are a team focused on the care and integrity of our customers, ready to accompany them on this intense but unforgettable journey.',
    },
  }

  const t = texts[lang as keyof typeof texts]

  return (
    <section
      className="relative pt-20 pb-20 px-4 bg-gray-200 dark:bg-zinc-900 transition-colors duration-300 overflow-hidden"
      id="about"
    >
      <div
        className="absolute inset-0 opacity-[0.25] dark:opacity-[0.10] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="order-2 md:order-1">
          <div className="relative">
            <div className="absolute inset-0 bg-black dark:bg-white translate-x-4 translate-y-4 rounded-xl"></div>
            <img
              src="/tienda/buenos-humos-cali.webp"
              alt="Sede Buenos Humos"
              className="relative w-full rounded-xl border-4 border-black dark:border-white grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
        <div className="order-1 md:order-2 text-black dark:text-white">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
            {t.title1} <br />
            <span className="text-pink-500">{t.title2}</span>
          </h2>
          <p className="text-xl font-bold mb-6 leading-relaxed">{t.body1}</p>
          <p className="text-lg font-medium mb-6">{t.body2}</p>
          <div className="bg-white dark:bg-black p-4 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] text-black dark:text-white">
            <p className="font-mono font-bold text-sm">{t.body3}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
