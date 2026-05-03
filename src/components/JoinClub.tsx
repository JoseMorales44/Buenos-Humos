import { useState, type FormEvent } from 'react'
import { useApp } from '../context/AppContext'
import { Rocket } from './icons'

const WHATSAPP_NUMBER = '573165871602'

export function JoinClub() {
  const { lang } = useApp()
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const texts = {
    es: {
      title: 'ÚNETE AL CLUB',
      subtitle: 'Déjanos tus datos y te abrimos WhatsApp con un mensaje listo para enviar.',
      nameLabel: 'Nombre o apodo',
      namePlaceholder: 'Cómo te llamamos',
      cityLabel: 'Ciudad (opcional)',
      cityPlaceholder: 'Ej. Cali',
      messageLabel: '¿Qué te gustaría del club? (opcional)',
      messagePlaceholder: 'Productos, eventos, asesoría…',
      submit: 'ENVIAR POR WHATSAPP',
      helper: 'Se abrirá WhatsApp con tu mensaje; solo tienes que confirmar el envío.',
      nameError: 'Escribe tu nombre para continuar.',
    },
    en: {
      title: 'JOIN THE CLUB',
      subtitle: 'Leave your details and we will open WhatsApp with a ready-to-send message.',
      nameLabel: 'Name or nickname',
      namePlaceholder: 'What should we call you',
      cityLabel: 'City (optional)',
      cityPlaceholder: 'e.g. Cali',
      messageLabel: 'What are you looking for? (optional)',
      messagePlaceholder: 'Products, events, advice…',
      submit: 'SEND VIA WHATSAPP',
      helper: 'WhatsApp will open with your message; you only need to tap send.',
      nameError: 'Please enter your name to continue.',
    },
  }

  const t = texts[lang as keyof typeof texts]
  const es = lang === 'es'

  const buildWhatsAppBody = () => {
    const lines: string[] = []
    if (es) {
      lines.push('¡Hola BH! Quiero ser parte del club Buenos Humos.')
      lines.push('')
      lines.push(`Nombre: ${name.trim()}`)
      if (city.trim()) lines.push(`Ciudad: ${city.trim()}`)
      if (message.trim()) {
        lines.push('')
        lines.push('Me interesa:')
        lines.push(message.trim())
      }
      lines.push('')
      lines.push('¡Gracias!')
    } else {
      lines.push('Hi BH! I want to be part of the Buenos Humos club.')
      lines.push('')
      lines.push(`Name: ${name.trim()}`)
      if (city.trim()) lines.push(`City: ${city.trim()}`)
      if (message.trim()) {
        lines.push('')
        lines.push("I'm interested in:")
        lines.push(message.trim())
      }
      lines.push('')
      lines.push('Thanks!')
    }
    return lines.join('\n')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setError(true)
      return
    }
    setError(false)
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppBody())}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      id="join-club"
      className="py-20 px-4 bg-gray-200 dark:bg-zinc-900 border-y-4 border-black dark:border-white transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black dark:text-white mb-3">
            {t.title}
          </h2>
          <p className="font-mono text-sm md:text-base text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
          <div className="h-2 w-20 bg-pink-500 mx-auto mt-6 border-2 border-black dark:border-white" />
        </div>

        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="border-4 border-black dark:border-white bg-white dark:bg-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(236,72,153,1)] dark:shadow-[8px_8px_0px_0px_rgba(236,72,153,0.8)] text-black dark:text-white"
            noValidate
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="join-name" className="block font-bold text-sm uppercase tracking-wide mb-2">
                  {t.nameLabel}
                </label>
                <input
                  id="join-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    if (error) setError(false)
                  }}
                  placeholder={t.namePlaceholder}
                  autoComplete="name"
                  aria-invalid={error}
                  aria-describedby={error ? 'join-name-error' : undefined}
                  className="w-full border-4 border-black dark:border-white bg-[#f5f5f5] dark:bg-zinc-900 px-4 py-3 font-bold outline-none focus:shadow-[4px_4px_0px_0px_rgba(236,72,153,1)]"
                />
                {error && (
                  <p id="join-name-error" className="mt-2 text-sm font-bold text-pink-600 dark:text-pink-400" role="alert">
                    {t.nameError}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="join-city" className="block font-bold text-sm uppercase tracking-wide mb-2">
                  {t.cityLabel}
                </label>
                <input
                  id="join-city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={t.cityPlaceholder}
                  autoComplete="address-level2"
                  className="w-full border-4 border-black dark:border-white bg-[#f5f5f5] dark:bg-zinc-900 px-4 py-3 font-bold outline-none focus:shadow-[4px_4px_0px_0px_rgba(236,72,153,1)]"
                />
              </div>

              <div>
                <label htmlFor="join-message" className="block font-bold text-sm uppercase tracking-wide mb-2">
                  {t.messageLabel}
                </label>
                <textarea
                  id="join-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.messagePlaceholder}
                  rows={4}
                  className="w-full border-4 border-black dark:border-white bg-[#f5f5f5] dark:bg-zinc-900 px-4 py-3 font-bold outline-none focus:shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] resize-y min-h-[100px]"
                />
              </div>
            </div>

            <p className="mt-6 text-xs font-mono text-gray-600 dark:text-gray-400">{t.helper}</p>

            <button
              type="submit"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black font-black text-lg py-4 px-6 border-4 border-black dark:border-white hover:bg-pink-500 hover:text-white dark:hover:bg-pink-500 dark:hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            >
              <Rocket className="w-6 h-6 shrink-0" />
              {t.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
