import { useEffect } from 'react'
import type { RefObject } from 'react'

const rows = 50
const frameInterval = 1000 / 30
const nextInterval = () => 500 + Math.random() * 1500
type Cell = { value: 0 | 1; nextChange: number }

export function useBinaryCanvas(canvasRef: RefObject<HTMLCanvasElement | null>) {
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
    let columns = 0, width = 0, height = 0, elapsed = 0, frame = 0
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
      for (let i = 0; i < cells.length; i++) {
        const x = (i % columns + 0.5) * width / columns
        const y = (Math.floor(i / columns) + 0.5) * height / rows
        ctx.fillText(String(cells[i].value), x, y)
      }
    }

    function resize() {
      const rect = target.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      target.width = Math.round(width * ratio)
      target.height = Math.round(height * ratio)
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      const nextColumns = large.matches ? 50 : 25
      if (columns !== nextColumns) {
        columns = nextColumns
        cells = Array.from({ length: columns * rows }, () => ({ value: Math.random() < 0.5 ? 0 : 1, nextChange: elapsed + nextInterval() }))
      }
      draw()
    }

    function animate(now: number) {
      if (lastDraw === null) lastDraw = now
      else if (now - lastDraw >= frameInterval) {
        elapsed += now - lastDraw
        lastDraw = now
        let changed = false
        for (const cell of cells) {
          if (elapsed >= cell.nextChange) {
            cell.value = cell.value === 0 ? 1 : 0
            cell.nextChange = elapsed + nextInterval()
            changed = true
          }
        }
        if (changed) draw()
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
      densityQuery?.removeEventListener('change', onDensityChange)
      document.fonts.removeEventListener('loadingdone', onFontChange)
    }
  }, [canvasRef])
}
