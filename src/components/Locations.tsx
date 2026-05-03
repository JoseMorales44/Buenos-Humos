import { useApp } from '../context/AppContext'
import { LOCATIONS } from '../data/locations'
import { MapPin } from './icons'

export function Locations() {
  const { lang } = useApp()

  const texts = {
    es: {
      title: 'UBICACIONES EN',
      viewMap: 'Ver en Google Maps',
    },
    en: {
      title: 'LOCATIONS IN',
      viewMap: 'View on Google Maps',
    },
  }

  const t = texts[lang as keyof typeof texts]

  return (
    <section
      className="py-20 px-4 bg-[#f5f5f5] text-[#1a1a1a] dark:bg-black dark:text-white transition-colors duration-300"
      id="locations"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 text-center text-black dark:text-white">
          {t.title}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">CALI</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.id}
              className="bg-white dark:bg-black border-4 border-black dark:border-white p-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] rounded-xl relative overflow-hidden group"
            >
              <div className="h-48 overflow-hidden border-b-4 border-black dark:border-white">
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-black uppercase mb-4 flex items-center gap-2 text-black dark:text-white">
                  <MapPin className="w-8 h-8 text-pink-500" />
                  {lang === 'es' ? loc.name : loc.nameEn}
                </h3>
                <p className="text-xl font-bold mb-6 text-black dark:text-white">{loc.address}</p>
                <a
                  href={loc.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-black dark:bg-white text-white dark:text-black text-center font-bold py-3 border-2 border-transparent hover:bg-pink-500 hover:text-white transition-all uppercase"
                >
                  {t.viewMap}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
