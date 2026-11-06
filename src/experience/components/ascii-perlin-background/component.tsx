import { useRef } from 'react'
import { useAsciiPerlinCanvas } from './use-ascii-perlin-canvas'
import styles from './component.module.css'

export function AsciiPerlinBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useAsciiPerlinCanvas(canvasRef)
  return <canvas ref={canvasRef} className={styles.canvas} />
}
