import type { CSSProperties } from 'react'
import styles from './component.module.css'
type Props = { art: string | readonly string[]; label: string; as: 'h1' | 'h2' | 'p'; accent?: boolean; align?: 'left' | 'center'; size?: 'normal' | 'small'; revealColumns?: readonly number[]; revealLayers?: readonly string[] }
export function AsciiArt({ art, label, as: Tag, accent = false, align = 'center', size = 'normal', revealColumns, revealLayers }: Props) {
  const words = typeof art === 'string' ? [art] : art

  return (
    <Tag className={`${styles.container} ${accent ? styles.accent : ''} ${align === 'left' ? styles.left : ''} ${size === 'small' ? styles.small : ''}`}>
      <span className={styles.srOnly}>{label}</span>
      {words.map((word, index) => {
        const lines = word.split('\n')
        const columns = Math.max(...lines.map((line) => line.length))
        const pieces = revealLayers ?? revealColumns?.map((start, pieceIndex) => {
          const end = revealColumns[pieceIndex + 1] ?? columns
          return lines.map((line) => line.padEnd(columns).slice(start, end)).join('\n')
        })
        return (
          <span key={index} aria-hidden="true" className={`${styles.art} ${revealLayers ? styles.layered : pieces ? styles.segmented : ''}`} style={{ '--columns': columns } as CSSProperties}>
            {pieces ? pieces.map((piece, pieceIndex) => (
              <span key={pieceIndex} data-scroll-letter style={{
                '--reveal-start': `${pieceIndex / pieces.length * 100}%`,
                '--reveal-end': `${(pieceIndex + 1) / pieces.length * 100}%`,
              } as CSSProperties}>{piece}</span>
            )) : word}
          </span>
        )
      })}
    </Tag>
  )
}
