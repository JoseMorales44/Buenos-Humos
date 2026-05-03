/** Reservation line from event flyers (La Terraza / La Industria Negra). */
export const EVENT_RESERVATIONS_WHATSAPP = '573234069062'

/** Flyers in `/public` — keep filenames in sync with uploaded assets. */
export const EVENT_PROMO_IMAGES = [
  {
    file: 'WhatsApp Image 2026-03-19 at 10.53.21 PM.jpeg',
    titleEs: 'Dotty Dolly Dancehall Party',
    titleEn: 'Dotty Dolly Dancehall Party',
  },
  {
    file: 'WhatsApp Image 2026-03-19 at 10.53.21 PM2.jpeg',
    titleEs: 'La Terraza Club — Dancehall Party',
    titleEn: 'La Terraza Club — Dancehall Party',
  },
  {
    file: 'WhatsApp Image 2026-03-19 at 10.53.22 PM3.jpeg',
    titleEs: 'Nailú — Dancehall Party',
    titleEn: 'Nailú — Dancehall Party',
  },
] as const

export type EventPromoImage = (typeof EVENT_PROMO_IMAGES)[number]

export function eventPromoSrc(file: string): string {
  return encodeURI(`/${file}`)
}
