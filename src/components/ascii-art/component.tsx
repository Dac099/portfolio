import type { CSSProperties } from 'react'
import styles from './component.module.css'
type Props = { art: string | readonly string[]; label: string; as: 'h1' | 'h2' | 'p'; accent?: boolean; align?: 'left' | 'center'; size?: 'normal' | 'small' }
export function AsciiArt({ art, label, as: Tag, accent = false, align = 'center', size = 'normal' }: Props) {
  const words = typeof art === 'string' ? [art] : art

  return (
    <Tag className={`${styles.container} ${accent ? styles.accent : ''} ${align === 'left' ? styles.left : ''} ${size === 'small' ? styles.small : ''}`}>
      <span className={styles.srOnly}>{label}</span>
      {words.map((word, index) => {
        const columns = Math.max(...word.split('\n').map((line) => line.length))
        return <span key={index} aria-hidden="true" className={styles.art} style={{ '--columns': columns } as CSSProperties}>{word}</span>
      })}
    </Tag>
  )
}
