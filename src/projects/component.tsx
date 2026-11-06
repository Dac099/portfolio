import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { AsciiArt } from '../components/ascii-art/component'
import type { Locale, TextDictionary } from '../i18n/types'
import { BinaryBackground } from './components/binary-background/component'
import { projects } from './content'
import type { Project } from './content'
import { createProjectTitleLayers } from './title-layers'
import styles from './component.module.css'

const url = (path: string) => `${import.meta.env.BASE_URL}${path}`

function moveTab(event: KeyboardEvent<HTMLButtonElement>) {
  const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End']
  if (!keys.includes(event.key)) return

  const tabs = Array.from(event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? [])
  const current = tabs.indexOf(event.currentTarget)
  const next = event.key === 'Home' ? 0
    : event.key === 'End' ? tabs.length - 1
      : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length

  event.preventDefault()
  tabs[next]?.focus({ preventScroll: true })
  tabs[next]?.click()
}

export function Projects({ title, art, locale, labels }: {
  title: string
  art: string
  locale: Locale
  labels: TextDictionary['project']
}) {
  const firstProject = projects[0]
  const [selectedId, setSelectedId] = useState(() => firstProject?.id ?? '')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [revealDetails, setRevealDetails] = useState(false)
  const imageFrameRef = useRef<HTMLDivElement>(null)
  const transitionRef = useRef(false)
  const movingImageRef = useRef<HTMLImageElement | null>(null)
  const animationRef = useRef<Animation | null>(null)
  const selectedProject = projects.find((project) => project.id === selectedId) ?? firstProject

  useEffect(() => () => {
    animationRef.current?.cancel()
    movingImageRef.current?.remove()
  }, [])

  function selectProject(project: Project, source: HTMLButtonElement) {
    if (!selectedProject || transitionRef.current) return

    const target = imageFrameRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!target || reducedMotion || typeof HTMLImageElement.prototype.animate !== 'function') {
      setSelectedId(project.id)
      setRevealDetails(true)
      return
    }

    const start = source.querySelector<HTMLElement>(`.${styles.thumbnail}`)?.getBoundingClientRect() ?? source.getBoundingClientRect()
    const end = target.getBoundingClientRect()
    const movingImage = document.createElement('img')
    movingImage.src = url(project.images.original)
    movingImage.alt = ''
    Object.assign(movingImage.style, {
      position: 'fixed',
      top: `${start.top}px`,
      left: `${start.left}px`,
      width: `${start.width}px`,
      height: `${start.height}px`,
      zIndex: '110',
      objectFit: 'contain',
      pointerEvents: 'none',
      transformOrigin: 'top left',
    })
    document.body.append(movingImage)

    transitionRef.current = true
    movingImageRef.current = movingImage
    setIsTransitioning(true)
    setRevealDetails(false)
    const animation = movingImage.animate([
      { transform: 'translate(0, 0) scale(1, 1)' },
      {
        transform: `translate(${end.left - start.left}px, ${end.top - start.top}px) scale(${end.width / start.width}, ${end.height / start.height})`,
      },
    ], { duration: 420, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' })
    animationRef.current = animation
    animation.onfinish = () => {
      setSelectedId(project.id)
      setIsTransitioning(false)
      setRevealDetails(true)
      transitionRef.current = false
      movingImage.remove()
      movingImageRef.current = null
      animationRef.current = null
    }
  }

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.foreground}>
        <AsciiArt as="h2" label={title} art={art} align="left" revealLayers={createProjectTitleLayers(art, locale)} />
        {projects.length === 0 ? <p className={styles.empty}>{labels.empty}</p> : (
          <>
            <div className={styles.carousel} role="tablist" aria-label={labels.carousel} aria-orientation="horizontal" aria-busy={isTransitioning}>
              {projects.map((project) => (
                <button
                  key={project.id}
                  id={`project-tab-${project.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selectedProject?.id === project.id}
                  aria-controls="project-panel"
                  tabIndex={selectedProject?.id === project.id ? 0 : -1}
                  className={styles.projectCard}
                  disabled={isTransitioning}
                  onClick={(event) => selectProject(project, event.currentTarget)}
                  onKeyDown={moveTab}
                >
                  <span className={styles.thumbnail}>
                    <img src={url(project.images.ascii)} alt="" />
                    <img className={styles.original} src={url(project.images.original)} alt="" />
                  </span>
                  <span className={styles.projectName}>{project.name[locale]}</span>
                </button>
              ))}
            </div>
            {selectedProject && (
              <div id="project-panel" role="tabpanel" aria-labelledby={`project-tab-${selectedProject.id}`} className={styles.detailPanel} aria-label={labels.details}>
                <div ref={imageFrameRef} className={`${styles.detailImage} ${isTransitioning ? styles.imageInTransit : ''}`}>
                  <img src={url(selectedProject.images.original)} alt={selectedProject.images.alt[locale]} />
                </div>
                <div key={selectedProject.id} className={`${styles.details} ${revealDetails ? styles.revealDetails : ''}`} aria-live="polite">
                  <h3>{selectedProject.name[locale]}</h3>
                  <div className={styles.links}>
                    <a href={selectedProject.url} target="_blank" rel="noreferrer" aria-label={`${labels.visit}: ${selectedProject.url}`}><span>{labels.visit}</span>{selectedProject.url}<span aria-hidden="true"> ↗</span></a>
                    {selectedProject.repository && <a href={selectedProject.repository} target="_blank" rel="noreferrer" aria-label={`${labels.sourceCode}: ${selectedProject.repository}`}><span>{labels.sourceCode}</span>{selectedProject.repository}<span aria-hidden="true"> ↗</span></a>}
                  </div>
                  <p>{selectedProject.description[locale]}</p>
                  <h4>{labels.technologies}</h4>
                  <ul className={styles.technologies}>
                    {selectedProject.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className={styles.background} aria-hidden="true"><BinaryBackground /></div>
    </section>
  )
}
