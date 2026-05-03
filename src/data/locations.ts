export interface Location {
  id: string
  name: string
  nameEn: string
  address: string
  image: string
  mapLink: string
}

export const LOCATIONS: Location[] = [
  {
    id: 'norte',
    name: 'SEDE NORTE',
    nameEn: 'NORTH HQ',
    address: 'Cra. 1 Bis #61a-30, Centro Comercial Colón Plaza, Local 36.',
    image: '/tienda/tienda-norte.webp',
    mapLink: 'https://maps.app.goo.gl/dP9NagB29tAXma289',
  },
  {
    id: 'sur',
    name: 'SEDE SUR',
    nameEn: 'SOUTH HQ',
    address: 'Cl. 63 #98c-43.',
    image: '/tienda/tienda-sur.webp',
    mapLink: 'https://maps.app.goo.gl/8Z8Aah2eZmhT4nRJ7',
  },
]
