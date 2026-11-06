import type { Locale } from '../i18n/types'

const starts: Record<Locale, readonly number[]> = {
  en: [0, 11, 18, 26, 32, 41, 50, 57],
  es: [0, 11, 18, 27, 36, 45, 54, 60, 69],
}

export function createProjectTitleLayers(art: string, locale: Locale): string[] {
  const rows = art.split('\n')
  const columns = Math.max(...rows.map((row) => row.length))
  return starts[locale].map((_, letter) => rows.map((row, rowIndex) => {
    const padded = row.padEnd(columns)
    return Array.from(padded, (character, column) => {
      // The English j descends one column beneath the preceding o.
      const jDescender = locale === 'en' && rowIndex >= 8 && column === 25
      const owner = jDescender ? 3 : starts[locale].findLastIndex((start) => column >= start)
      return owner === letter ? character : ' '
    }).join('')
  }).join('\n'))
}
