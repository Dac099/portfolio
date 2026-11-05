import { useEffect, useRef, useState } from 'react'
import styles from './component.module.css'
import { useRipple } from './hooks/use-ripple'

const allowedCharacters = [
  '#', '$', '%', '&', // 35–38
  ...'0123456789', // 48–57
]

export function AsciiBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null)
  const [isSmall, setIsSmall] = useState(() => !window.matchMedia('(min-width: 768px)').matches)
  const [characters] = useState(() =>
    Array.from({ length: 2500 }, () => allowedCharacters[Math.floor(Math.random() * allowedCharacters.length)]),
  )
  useRipple(backgroundRef, isSmall)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    const update = (event: MediaQueryListEvent) => setIsSmall(!event.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return (
    <div ref={backgroundRef} className={styles.background} aria-hidden="true">
      {characters.slice(0, isSmall ? 1250 : 2500).map((character, index) => <span key={index}>{character}</span>)}
    </div>
  )
}
