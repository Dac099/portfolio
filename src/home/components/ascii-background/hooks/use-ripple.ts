import { useEffect } from 'react'
import type { RefObject } from 'react'

const interval = 700
const speed = 0.18
const width = 54
const amplitude = 5
const rows = 50

export function useRipple(backgroundRef: RefObject<HTMLDivElement | null>, isSmall: boolean) {
  useEffect(() => {
    const background = backgroundRef.current
    if (!background) return

    const characters = Array.from(background.children) as HTMLElement[]
    const columns = isSmall ? 25 : 50
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let distances: number[] = []
    let moved = new Set<number>()
    let frame = 0
    let start: number | null = null
    let visible = false

    function measure() {
      const { width: gridWidth, height: gridHeight } = background!.getBoundingClientRect()
      distances = characters.map((_, index) => {
        const x = ((index % columns) + 0.5) * gridWidth / columns
        const y = (Math.floor(index / columns) + 0.5) * gridHeight / rows
        return Math.hypot(x - gridWidth / 2, y - gridHeight / 2)
      })
    }

    function reset() {
      cancelAnimationFrame(frame)
      frame = 0
      start = null
      for (const index of moved) {
        characters[index].style.transform = ''
        characters[index].style.color = ''
      }
      moved = new Set()
    }

    function animate(now: number) {
      if (start === null) start = now
      const elapsed = now - start
      const latestRadius = (elapsed % interval) * speed
      const spacing = interval * speed
      const previousWaves = Math.floor(elapsed / interval)
      const nextMoved = new Set<number>()

      for (let index = 0; index < characters.length; index++) {
        const distance = distances[index]
        const wave = Math.max(0, Math.min(previousWaves, Math.round((distance - latestRadius) / spacing)))
        const delta = distance - (latestRadius + wave * spacing)
        if (Math.abs(delta) <= width) {
          const intensity = (1 + Math.cos(Math.PI * delta / width)) / 2
          characters[index].style.transform = `translateY(${(intensity * amplitude).toFixed(2)}px)`
          characters[index].style.color = `color-mix(in srgb, var(--fg) ${(100 - intensity * 60).toFixed(1)}%, var(--bg))`
          nextMoved.add(index)
        } else if (moved.has(index)) {
          characters[index].style.transform = ''
          characters[index].style.color = ''
        }
      }
      moved = nextMoved
      frame = requestAnimationFrame(animate)
    }

    function updateAnimation() {
      if (visible && !reducedMotion.matches) {
        if (!frame) frame = requestAnimationFrame(animate)
      } else {
        reset()
      }
    }

    measure()
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(background)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      updateAnimation()
    })
    intersectionObserver.observe(background)
    reducedMotion.addEventListener('change', updateAnimation)

    return () => {
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      reducedMotion.removeEventListener('change', updateAnimation)
      reset()
    }
  }, [backgroundRef, isSmall])
}
