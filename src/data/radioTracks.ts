export interface RadioTrack {
  file: string
  name: string
}

/** Build URL for files in public/musica (encode spaces, emoji, &). */
function musica(fileName: string): string {
  return `/musica/${encodeURIComponent(fileName)}`
}

export const RADIO_TRACKS: RadioTrack[] = [
  { file: musica('cancion-bh.mp3'), name: 'Cohete - Pablo Tunes Ft. Zamanta' },
  { file: musica('estatal.mp3'), name: 'Estatal' },
  { file: musica('Jamby El Favo x Pablo Tunes x Sou B - Cali Fornia (Video Oficial).mp3'), name: 'Cali Fornia' },
  { file: musica('Pablo Tunes x El Jincho - Cuidao (Video Oficial).mp3'), name: 'Cuidado' },
  { file: musica('Pablo Tunes x Jamby El Favo - Maraton (Video Oficial) prod. by Sou B.mp3'), name: 'Maraton' }
]
