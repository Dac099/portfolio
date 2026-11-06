import { useRef } from 'react'
import { useBinaryCanvas } from './use-binary-canvas'
import styles from './component.module.css'

export function BinaryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useBinaryCanvas(canvasRef)
  return <canvas ref={canvasRef} className={styles.canvas} />
}
