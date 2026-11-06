import { useEffect, useState } from 'react'

export function useScrollHeader() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let previousY = Math.max(0, window.scrollY)

    function onScroll() {
      const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      const currentY = Math.max(0, Math.min(window.scrollY, maxY))

      if (currentY === 0) setHidden(false)
      else if (currentY > previousY) setHidden(true)
      else if (currentY < previousY) setHidden(false)

      previousY = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return hidden
}
