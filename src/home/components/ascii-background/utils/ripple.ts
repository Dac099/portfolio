export const interval = 1000
export const speed = 0.18
export const waveWidth = 54
export const amplitude = 5
export const rows = 50

export type Cell = { character: string; x: number; y: number; distance: number }

export function createCells(characters: readonly string[], width: number, height: number, columns: number): Cell[] {
  return characters.slice(0, columns * rows).map((character, index) => {
    const x = (index % columns + 0.5) * width / columns
    const y = (Math.floor(index / columns) + 0.5) * height / rows
    return { character, x, y, distance: Math.hypot(x - width / 2, y - height / 2) }
  })
}

export function waveIntensity(distance: number, elapsed: number): number {
  const latestRadius = (elapsed % interval) * speed
  const previousWaves = Math.floor(elapsed / interval)
  const wave = Math.max(0, Math.min(previousWaves, Math.round((distance - latestRadius) / (interval * speed))))
  const delta = distance - (latestRadius + wave * interval * speed)
  return Math.abs(delta) <= waveWidth ? (1 + Math.cos(Math.PI * delta / waveWidth)) / 2 : 0
}
