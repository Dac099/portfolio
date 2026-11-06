import { useEffect } from 'react'
import type { RefObject } from 'react'
import { perlin3D } from './perlin'

const characters = ['.', ',', '+', 'X', '#', '$', '&', '@'] as const
const rows = 50
const scale = 0.006
const speed = 0.12
const frameInterval = 1000 / 30
const margin = 0.025

type Cell = { x: number; y: number; character: number }

export function useAsciiPerlinCanvas(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    const target = canvas
    const ctx = context
    const large = window.matchMedia('(min-width: 768px)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const systemTheme = window.matchMedia('(prefers-color-scheme: light)')
    let cells: Cell[] = []
    let width = 0, height = 0, elapsed = 0, frame = 0
    let lastDraw: number | null = null
    let visible = false, disposed = false
    let densityQuery: MediaQueryList | null = null

    function draw() {
      if (!width || !height) return
      const style = getComputedStyle(target)
      ctx.clearRect(0, 0, width, height)
      ctx.font = `${style.fontSize} ${style.fontFamily}`
      ctx.fillStyle = style.color
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      for (const cell of cells) {
        const value = Math.max(0, Math.min(1, (perlin3D(cell.x * scale, cell.y * scale, 0.37 + elapsed * speed) + 1) / 2))
        if (cell.character < 0) cell.character = Math.min(characters.length - 1, Math.floor(value * characters.length))
        while (cell.character < characters.length - 1 && value > (cell.character + 1) / characters.length + margin) cell.character++
        while (cell.character > 0 && value < cell.character / characters.length - margin) cell.character--
        ctx.globalAlpha = 0.10 + value * 0.18
        ctx.fillText(characters[cell.character], cell.x, cell.y)
      }
      ctx.globalAlpha = 1
    }

    function resize() {
      const rect = target.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      target.width = Math.round(width * ratio)
      target.height = Math.round(height * ratio)
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      const columns = large.matches ? 50 : 25
      cells = Array.from({ length: columns * rows }, (_, index) => ({
        x: (index % columns + 0.5) * width / columns,
        y: (Math.floor(index / columns) + 0.5) * height / rows,
        character: -1,
      }))
      draw()
    }

    function animate(now: number) {
      if (lastDraw === null) lastDraw = now
      else if (now - lastDraw >= frameInterval) {
        elapsed += (now - lastDraw) / 1000
        lastDraw = now
        draw()
      }
      frame = requestAnimationFrame(animate)
    }

    function stop() {
      cancelAnimationFrame(frame)
      frame = 0
      lastDraw = null
    }

    function updateAnimation() {
      if (visible && !document.hidden && !reduced.matches) {
        if (!frame) frame = requestAnimationFrame(animate)
      } else {
        stop()
        if (visible && !document.hidden) draw()
      }
    }

    function watchDensity() {
      densityQuery?.removeEventListener('change', onDensityChange)
      densityQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
      densityQuery.addEventListener('change', onDensityChange)
    }
    function onDensityChange() { watchDensity(); resize() }
    function onFontChange() { if (!disposed) draw() }

    const resizeObserver = new ResizeObserver(resize)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      updateAnimation()
    })
    const themeObserver = new MutationObserver(draw)
    resizeObserver.observe(target)
    intersectionObserver.observe(target)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class', 'style'] })
    large.addEventListener('change', resize)
    reduced.addEventListener('change', updateAnimation)
    systemTheme.addEventListener('change', draw)
    document.addEventListener('visibilitychange', updateAnimation)
    window.addEventListener('resize', resize)
    document.fonts.addEventListener('loadingdone', onFontChange)
    void document.fonts.ready.then(onFontChange)
    watchDensity()
    resize()

    return () => {
      disposed = true
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      themeObserver.disconnect()
      large.removeEventListener('change', resize)
      reduced.removeEventListener('change', updateAnimation)
      systemTheme.removeEventListener('change', draw)
      document.removeEventListener('visibilitychange', updateAnimation)
      window.removeEventListener('resize', resize)
      densityQuery?.removeEventListener('change', onDensityChange)
      document.fonts.removeEventListener('loadingdone', onFontChange)
    }
  }, [canvasRef])
}
