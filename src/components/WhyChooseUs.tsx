import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { Package, Clock, DollarSign, ShieldCheck } from './icons'

export function WhyChooseUs() {
  const { lang } = useApp()

  const texts = {
    es: {
      badge: 'Único y Diferente',
      title: 'Por Qué Elegirnos',
      subtitle: 'Calidad, rapidez y atención humana en cada pedido.',
      features: [
        {
          title: 'Mejores Productos',
          desc: 'Solo marcas autorizadas y verificadas.',
          icon: Package,
        },
        {
          title: 'Entrega Rápida',
          desc: 'Recibe tu pedido mismo día en Cali.',
          icon: Clock,
        },
        {
          title: 'Buenos Precios',
          desc: 'Precios justos y promos exclusivas.',
          icon: DollarSign,
        },
        {
          title: 'Garantía y Asesoría',
          desc: 'Te acompañamos antes y después de comprar.',
          icon: ShieldCheck,
        },
      ],
    },
    en: {
      badge: 'Unique and Different',
      title: 'Why Choose Us',
      subtitle: 'Quality, speed, and human attention in every order.',
      features: [
        {
          title: 'Best Products',
          desc: 'Only authorized and verified brands.',
          icon: Package,
        },
        {
          title: 'Fast Delivery',
          desc: 'Receive your order the same day in Cali.',
          icon: Clock,
        },
        {
          title: 'Great Prices',
          desc: 'Fair prices and exclusive promos.',
          icon: DollarSign,
        },
        {
          title: 'Warranty & Advice',
          desc: 'We accompany you before and after your purchase.',
          icon: ShieldCheck,
        },
      ],
    },
  }

  const t = texts[lang as keyof typeof texts]

  return (
    <section className="relative overflow-hidden py-24 px-4 sm:px-6 md:px-8 bg-gray-100 dark:bg-black transition-colors duration-300">
      {/* Video Background - More visible based on user feedback */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-40 dark:opacity-60"
        >
          <source src="/hero/buenos-humos-hero.mp4" type="video/mp4" />
        </video>
        {/* Overlays - Darken to maintain text contrast with higher video opacity */}
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-transparent to-gray-100 dark:from-black dark:via-transparent dark:to-black"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs font-black uppercase tracking-[0.25em] text-pink-600 dark:text-pink-400 mb-2"
          >
            {t.badge}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-black dark:text-white"
          >
            {t.title}
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '6rem' }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-2 bg-black dark:bg-white mx-auto mb-6"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mx-auto max-w-2xl text-base md:text-lg font-bold text-gray-600 dark:text-gray-400"
          >
            {t.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {t.features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.5 }}
              className="group relative h-full"
            >
              {/* Neobrutalist Shadow */}
              <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-xl bg-black dark:bg-white transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
              
              <div className="relative flex h-full flex-col items-center justify-between overflow-hidden rounded-xl border-4 border-black bg-white p-8 text-center transition-all dark:border-white dark:bg-zinc-950">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-pink-100 p-3 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400 border-2 border-black dark:border-white shadow-[3px_3px_0_0_#000] dark:shadow-[3px_3px_0_0_#fff]">
                  <feature.icon className="h-full w-full" strokeWidth={2.5} />
                </div>
                
                <div className="flex-1">
                  <h3 className="mb-3 text-xl font-black uppercase tracking-tight text-black dark:text-white">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm font-bold leading-relaxed text-gray-600 dark:text-gray-400">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
