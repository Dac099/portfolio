import { useEffect } from 'react'
import type { RefObject } from 'react'
import { amplitude, createCells, waveIntensity } from '../utils/ripple'
import type { Cell } from '../utils/ripple'

export function useAsciiCanvas(canvasRef: RefObject<HTMLCanvasElement | null>, characters: readonly string[]) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const target = canvas
    const context = ctx
    const large = window.matchMedia('(min-width: 768px)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const systemTheme = window.matchMedia('(prefers-color-scheme: light)')
    let cells: Cell[] = []
    let palette: string[] = []
    let width = 0
    let height = 0
    let visible = false
    let frame = 0
    let start: number | null = null
    let disposed = false
    let densityQuery: MediaQueryList | null = null

    // Resolve browser-supported CSS colors into sRGB bytes for the shade palette.
    const probe = document.createElement('canvas')
    probe.width = probe.height = 1
    const probeContext = probe.getContext('2d')
    function resolveColor(color: string): number[] {
      if (!probeContext) return [0, 0, 0]
      probeContext.clearRect(0, 0, 1, 1)
      probeContext.fillStyle = color
      probeContext.fillRect(0, 0, 1, 1)
      return Array.from(probeContext.getImageData(0, 0, 1, 1).data.slice(0, 3))
    }

    function updatePalette() {
      const base = resolveColor(getComputedStyle(target).color)
      const root = getComputedStyle(document.documentElement)
      const bg = resolveColor(root.getPropertyValue('--bg').trim())
      palette = Array.from({ length: 101 }, (_, index) => {
        const mix = index / 100 * 0.6
        const channels = base.map((channel, i) => Math.round(channel * (1 - mix) + bg[i] * mix))
        return `rgb(${channels.join(' ')})`
      })
      draw(0, false)
    }

    function draw(elapsed: number, animated: boolean) {
      if (!width || !height || !palette.length) return
      context.clearRect(0, 0, width, height)
      const style = getComputedStyle(target)
      context.font = `${style.fontSize} ${style.fontFamily}`
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      for (const cell of cells) {
        const intensity = animated ? waveIntensity(cell.distance, elapsed) : 0
        context.fillStyle = palette[Math.round(intensity * 100)]
        context.fillText(cell.character, cell.x, cell.y + intensity * amplitude)
      }
    }

    function resize() {
      const rect = target.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      target.width = Math.round(width * ratio)
      target.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      cells = createCells(characters, width, height, large.matches ? 50 : 25)
      draw(0, false)
    }

    function animate(now: number) {
      if (start === null) start = now
      draw(now - start, true)
      frame = requestAnimationFrame(animate)
    }

    function stop() {
      cancelAnimationFrame(frame)
      frame = 0
      start = null
    }

    function updateAnimation() {
      if (visible && !document.hidden && !reduced.matches) {
        if (!frame) frame = requestAnimationFrame(animate)
      } else {
        stop()
        if (visible && !document.hidden) draw(0, false)
      }
    }

    function watchDensity() {
      densityQuery?.removeEventListener('change', onDensityChange)
      densityQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
      densityQuery.addEventListener('change', onDensityChange)
    }

    function onDensityChange() {
      watchDensity()
      resize()
    }

    function onFontChange() {
      if (!disposed) draw(0, false)
    }

    const resizeObserver = new ResizeObserver(resize)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      updateAnimation()
    })
    const themeObserver = new MutationObserver(updatePalette)
    resizeObserver.observe(target)
    intersectionObserver.observe(target)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class', 'style'] })
    large.addEventListener('change', resize)
    reduced.addEventListener('change', updateAnimation)
    systemTheme.addEventListener('change', updatePalette)
    document.addEventListener('visibilitychange', updateAnimation)
    window.addEventListener('resize', resize)
    document.fonts.addEventListener('loadingdone', onFontChange)
    void document.fonts.ready.then(onFontChange)
    watchDensity()
    resize()
    updatePalette()

    return () => {
      disposed = true
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      themeObserver.disconnect()
      large.removeEventListener('change', resize)
      reduced.removeEventListener('change', updateAnimation)
      systemTheme.removeEventListener('change', updatePalette)
      document.removeEventListener('visibilitychange', updateAnimation)
      window.removeEventListener('resize', resize)
      densityQuery?.removeEventListener('change', onDensityChange)
      document.fonts.removeEventListener('loadingdone', onFontChange)
    }
  }, [canvasRef, characters])
}
