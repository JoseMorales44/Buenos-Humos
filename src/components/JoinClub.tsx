import { useState, type FormEvent } from 'react'
import { useApp } from '../context/AppContext'
import { Rocket } from './icons'

const WHATSAPP_NUMBER = '573165871602'

const CATEGORY_OPTIONS = [
  'Parafernalia',
  'Destilados',
  'Vaporizadores',
  'Tabaco',
  'Merch',
  'Autocultivo',
  'CBD',
] as const

type Category = (typeof CATEGORY_OPTIONS)[number]

export function JoinClub() {
  const { lang } = useApp()
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [instagram, setInstagram] = useState('')
  const [email, setEmail] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const texts = {
    es: {
      title: 'ÚNETE AL CLUB',
      subtitle: 'Déjanos tus datos y te abrimos WhatsApp con un mensaje listo para enviar.',
      nameLabel: 'Nombre o apodo',
      namePlaceholder: 'Cómo te llamamos',
      cityLabel: 'Ciudad',
      cityPlaceholder: 'Ej. Cali',
      whatsappLabel: 'WhatsApp',
      whatsappPlaceholder: '+57 300 123 4567',
      instagramLabel: 'Usuario de Instagram',
      instagramPlaceholder: '@tu_usuario',
      emailLabel: 'Correo electrónico',
      emailPlaceholder: 'tu@correo.com',
      birthDateLabel: 'Fecha de nacimiento',
      submit: 'ENVIAR POR WHATSAPP',
      categoriesLabel: '¿Qué categorías te interesan?',
      messageLabel: '¿Qué te gustaría del club? (opcional)',
      messagePlaceholder: 'Productos, eventos, asesoría…',
      helper: 'Se abrirá WhatsApp con tu mensaje; solo tienes que confirmar el envío.',
      nameError: 'Escribe tu nombre para continuar.',
      cityError: 'Escribe tu ciudad.',
      whatsappError: 'Escribe tu número de WhatsApp.',
      birthDateError: 'Selecciona tu fecha de nacimiento.',
    },
    en: {
      title: 'JOIN THE CLUB',
      subtitle: 'Leave your details and we will open WhatsApp with a ready-to-send message.',
      nameLabel: 'Name or nickname',
      namePlaceholder: 'What should we call you',
      cityLabel: 'City',
      cityPlaceholder: 'e.g. Cali',
      whatsappLabel: 'WhatsApp',
      whatsappPlaceholder: '+57 300 123 4567',
      instagramLabel: 'Instagram username',
      instagramPlaceholder: '@your_username',
      emailLabel: 'Email',
      emailPlaceholder: 'you@email.com',
      birthDateLabel: 'Date of birth',
      submit: 'SEND VIA WHATSAPP',
      categoriesLabel: 'Which categories interest you?',
      messageLabel: 'What are you looking for? (optional)',
      messagePlaceholder: 'Products, events, advice…',
      helper: 'WhatsApp will open with your message; you only need to tap send.',
      nameError: 'Please enter your name to continue.',
      cityError: 'Please enter your city.',
      whatsappError: 'Please enter your WhatsApp number.',
      birthDateError: 'Please select your date of birth.',
    },
  }

  const t = texts[lang as keyof typeof texts]
  const es = lang === 'es'

  const toggleCategory = (cat: Category) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat],
    )
  }

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

  const validate = () => {
    const next: Record<string, string> = {}
    if (!name.trim()) next.name = t.nameError
    if (!city.trim()) next.city = t.cityError
    if (!whatsapp.trim()) next.whatsapp = t.whatsappError
    if (!birthDate) next.birthDate = t.birthDateError
    if (email.trim() && !isValidEmail(email.trim())) {
      next.email = es ? 'Correo no válido.' : 'Invalid email.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const buildWhatsAppBody = () => {
    const lines: string[] = []
    if (es) {
      lines.push('¡Hola BH! Quiero ser parte del club Buenos Humos.')
      lines.push('')
      lines.push(`Nombre: ${name.trim()}`)
      lines.push(`Ciudad: ${city.trim()}`)
      lines.push(`WhatsApp: ${whatsapp.trim()}`)
      if (instagram.trim()) lines.push(`Instagram: ${instagram.trim()}`)
      if (email.trim()) lines.push(`Email: ${email.trim()}`)
      lines.push(`Fecha de nacimiento: ${birthDate}`)
      if (selectedCategories.length > 0) {
        lines.push('')
        lines.push('Categorías de interés:')
        selectedCategories.forEach(c => lines.push(`- ${c}`))
      }
      if (message.trim()) {
        lines.push('')
        lines.push('Comentario adicional:')
        lines.push(message.trim())
      }
      lines.push('')
      lines.push('¡Gracias!')
    } else {
      lines.push('Hi BH! I want to be part of the Buenos Humos club.')
      lines.push('')
      lines.push(`Name: ${name.trim()}`)
      lines.push(`City: ${city.trim()}`)
      lines.push(`WhatsApp: ${whatsapp.trim()}`)
      if (instagram.trim()) lines.push(`Instagram: ${instagram.trim()}`)
      if (email.trim()) lines.push(`Email: ${email.trim()}`)
      lines.push(`Date of birth: ${birthDate}`)
      if (selectedCategories.length > 0) {
        lines.push('')
        lines.push('Categories of interest:')
        selectedCategories.forEach(c => lines.push(`- ${c}`))
      }
      if (message.trim()) {
        lines.push('')
        lines.push('Additional comment:')
        lines.push(message.trim())
      }
      lines.push('')
      lines.push('Thanks!')
    }
    return lines.join('\n')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppBody())}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const inputClass = "w-full border-4 border-black dark:border-white bg-[#f5f5f5] dark:bg-zinc-900 px-4 py-3 font-bold outline-none focus:shadow-[4px_4px_0px_0px_rgba(236,72,153,1)]"
  const labelClass = "block font-bold text-sm uppercase tracking-wide mb-2"

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

              {/* Name */}
              <div>
                <label htmlFor="join-name" className={labelClass}>{t.nameLabel}</label>
                <input id="join-name" type="text" value={name}
                  onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(prev => { const n = { ...prev }; delete n.name; return n }) }}
                  placeholder={t.namePlaceholder} autoComplete="name"
                  aria-invalid={!!errors.name} aria-describedby={errors.name ? 'join-name-error' : undefined}
                  className={`${inputClass} ${errors.name ? 'border-pink-500' : ''}`}
                />
                {errors.name && <p id="join-name-error" className="mt-2 text-sm font-bold text-pink-600 dark:text-pink-400" role="alert">{errors.name}</p>}
              </div>

              {/* City */}
              <div>
                <label htmlFor="join-city" className={labelClass}>{t.cityLabel}</label>
                <input id="join-city" type="text" value={city}
                  onChange={(e) => { setCity(e.target.value); if (errors.city) setErrors(prev => { const n = { ...prev }; delete n.city; return n }) }}
                  placeholder={t.cityPlaceholder} autoComplete="address-level2"
                  aria-invalid={!!errors.city}
                  className={`${inputClass} ${errors.city ? 'border-pink-500' : ''}`}
                />
                {errors.city && <p className="mt-2 text-sm font-bold text-pink-600 dark:text-pink-400" role="alert">{errors.city}</p>}
              </div>

              {/* WhatsApp */}
              <div>
                <label htmlFor="join-whatsapp" className={labelClass}>{t.whatsappLabel}</label>
                <input id="join-whatsapp" type="tel" value={whatsapp}
                  onChange={(e) => { setWhatsapp(e.target.value); if (errors.whatsapp) setErrors(prev => { const n = { ...prev }; delete n.whatsapp; return n }) }}
                  placeholder={t.whatsappPlaceholder} autoComplete="tel"
                  aria-invalid={!!errors.whatsapp}
                  className={`${inputClass} ${errors.whatsapp ? 'border-pink-500' : ''}`}
                />
                {errors.whatsapp && <p className="mt-2 text-sm font-bold text-pink-600 dark:text-pink-400" role="alert">{errors.whatsapp}</p>}
              </div>

              {/* Instagram */}
              <div>
                <label htmlFor="join-instagram" className={labelClass}>{t.instagramLabel}</label>
                <input id="join-instagram" type="text" value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder={t.instagramPlaceholder}
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="join-email" className={labelClass}>{t.emailLabel}</label>
                <input id="join-email" type="email" value={email}
                  onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => { const n = { ...prev }; delete n.email; return n }) }}
                  placeholder={t.emailPlaceholder} autoComplete="email"
                  aria-invalid={!!errors.email}
                  className={`${inputClass} ${errors.email ? 'border-pink-500' : ''}`}
                />
                {errors.email && <p className="mt-2 text-sm font-bold text-pink-600 dark:text-pink-400" role="alert">{errors.email}</p>}
              </div>

              {/* Date of Birth */}
              <div>
                <label htmlFor="join-birthdate" className={labelClass}>{t.birthDateLabel}</label>
                <input id="join-birthdate" type="date" value={birthDate}
                  onChange={(e) => { setBirthDate(e.target.value); if (errors.birthDate) setErrors(prev => { const n = { ...prev }; delete n.birthDate; return n }) }}
                  aria-invalid={!!errors.birthDate}
                  className={`${inputClass} h-[52px] ${errors.birthDate ? 'border-pink-500' : ''}`}
                />
                {errors.birthDate && <p className="mt-2 text-sm font-bold text-pink-600 dark:text-pink-400" role="alert">{errors.birthDate}</p>}
              </div>

              {/* Categories (multi-select checkboxes) */}
              <div>
                <label className={`${labelClass} mb-3`}>{t.categoriesLabel}</label>
                <div className="grid grid-cols-2 gap-3">
                  {CATEGORY_OPTIONS.map(cat => {
                    const checked = selectedCategories.includes(cat)
                    return (
                      <button
                        key={cat}
                        type="button"
                        role="checkbox"
                        aria-checked={checked}
                        onClick={() => toggleCategory(cat)}
                        className={`border-4 border-black dark:border-white px-4 py-3 font-bold text-sm uppercase tracking-wide text-left transition-all ${
                          checked
                            ? 'bg-pink-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]'
                            : 'bg-[#f5f5f5] dark:bg-zinc-900 text-black dark:text-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]'
                        }`}
                      >
                        {checked ? '✓ ' : ''}{cat}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Message (optional) */}
              <div>
                <label htmlFor="join-message" className={labelClass}>{t.messageLabel}</label>
                <textarea id="join-message" value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.messagePlaceholder} rows={4}
                  className={`${inputClass} resize-y min-h-[100px]`}
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
