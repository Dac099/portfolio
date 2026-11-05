import { useRef, useState } from 'react'
import { useAsciiCanvas } from './hooks/use-ascii-canvas'
import styles from './component.module.css'

const allowedCharacters = '#$%&0123456789'

export function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [characters] = useState(() =>
    Array.from({ length: 2500 }, () => allowedCharacters[Math.floor(Math.random() * allowedCharacters.length)]),
  )

  useAsciiCanvas(canvasRef, characters)

  return <canvas ref={canvasRef} className={styles.background} aria-hidden="true" />
}
