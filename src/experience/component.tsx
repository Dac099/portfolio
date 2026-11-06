import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent } from 'react'
import { AsciiArt } from '../components/ascii-art/component'
import type { Locale } from '../i18n/types'
import { achievementIds } from './content'
import type { AchievementId, ExperienceContent } from './content'
import { AsciiPerlinBackground } from './components/ascii-perlin-background/component'
import styles from './component.module.css'

const englishColumns = [0, 11, 20, 29, 38, 46, 50, 59, 68, 77]
const spanishColumns = [...englishColumns, 81]
const url = (path: string) => `${import.meta.env.BASE_URL}${path}`
const cvFiles: Record<Locale, string> = { es: 'Cv/David_Ceja_Zapata__FullStack.pdf', en: 'Cv/David_Ceja_Zapata__FullStack_EN.pdf' }
type PhotoId = keyof ExperienceContent['photos']
type Media = { type: 'icon'; name: string; file: string } | { type: 'photo'; id: PhotoId; original: string; ascii: string; ratio: string }
const icon = (name: string, file: string): Media => ({ type: 'icon', name, file })
const photo = (id: PhotoId, original: string, ascii: string, ratio: string): Media => ({ type: 'photo', id, original, ascii, ratio })
const media: Record<AchievementId, { hero?: Media; gallery: Media[] }> = {
  deployment: { hero: icon('Gitea', 'gitea.svg'), gallery: [photo('rack', 'rack.jpg', 'asciiRack.png', '3072 / 4080'), icon('Docker', 'docker.svg'), icon('Linux', 'linux.svg')] },
  queries: { hero: icon('PostgreSQL', 'psql.svg'), gallery: [photo('graphicSystem', 'graphicSystem.jpg', 'asciiGraphicSystem.png', '4080 / 3072'), icon('Data', 'data.svg'), icon('Data Server', 'databaseServer.svg')] },
  integrations: { hero: icon('HubSpot', 'hubspot.svg'), gallery: [photo('monitorApp', 'monitorApp.jpg', 'asciiMonitorApp.png', '3072 / 4080'), photo('traceability', 'traceability.jpg', 'asciiTraceability.png', '4080 / 3072'), icon('Meta', 'meta-glyph.svg'), icon('API', 'api.svg')] },
  requirements: { hero: icon('Document', 'document.svg'), gallery: [photo('site', 'site.jpg', 'asciiSite.png', '3072 / 4080'), photo('diagram', 'diagram.jpg', 'aciiDiagram.png', '2160 / 3840'), icon('Jira', 'jira.svg')] },
  stack: { gallery: [icon('Docker', 'docker.svg'), icon('Git', 'git.svg'), icon('AWS', 'aws-svgrepo-com.svg'), icon('.NET', 'dotnet.svg'), icon('TypeScript', 'typescript.svg'), icon('React', 'react.svg'), icon('Next.js', 'nextjs.svg'), icon('PostgreSQL', 'psql.svg'), icon('MySQL', 'mysql.svg'), icon('Linux', 'linux.svg'), icon('Testing', 'testing.svg')] },
}

function useSmallScreen() {
  const [small, setSmall] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)')
    const update = () => setSmall(query.matches)
    query.addEventListener('change', update)
    update()
    return () => query.removeEventListener('change', update)
  }, [])
  return small
}

function moveTab(event: KeyboardEvent<HTMLButtonElement>, orientation: 'horizontal' | 'vertical') {
  const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown'
  const previousKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp'
  if (![nextKey, previousKey, 'Home', 'End'].includes(event.key)) return
  const buttons = Array.from(event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? [])
  const current = buttons.indexOf(event.currentTarget)
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (current + (event.key === nextKey ? 1 : -1) + buttons.length) % buttons.length
  event.preventDefault()
  buttons[next]?.focus({ preventScroll: true })
  buttons[next]?.click()
}

function Photo({ item, content }: { item: Extract<Media, { type: 'photo' }>; content: ExperienceContent }) {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  function reveal() {
    clearTimeout(timer.current)
    setClicked(true)
    timer.current = setTimeout(() => setClicked(false), 1000)
  }
  return (
    <button type="button" className={styles.photo} style={{ aspectRatio: item.ratio }}
      aria-label={`${content.showOriginal}: ${content.photos[item.id]}`}
      onClick={reveal} onPointerEnter={(event) => { if (event.pointerType !== 'touch') setHovered(true) }}
      onPointerLeave={(event) => { if (event.pointerType !== 'touch') setHovered(false) }}>
      <img src={url(item.ascii)} alt="" />
      <img src={url(item.original)} alt="" onLoad={() => setLoaded(true)} className={`${styles.original} ${loaded && (hovered || clicked) ? styles.revealed : ''}`} />
    </button>
  )
}

function MediaItem({ item, content }: { item: Media; content: ExperienceContent }) {
  if (item.type === 'photo') return <Photo item={item} content={content} />
  const mask = `url("${url(item.file)}")`
  return <div className={styles.iconItem} role="img" aria-label={item.name}><span aria-hidden="true" className={styles.icon} style={{ maskImage: mask, WebkitMaskImage: mask } as CSSProperties} /><span>{item.name}</span></div>
}

function AchievementPanel({ id, content }: { id: AchievementId; content: ExperienceContent }) {
  const item = content.items[id]
  const assets = media[id]
  return (
    <div key={id} className={styles.achievementCard}>
      {assets.hero && <div className={styles.intro}><MediaItem item={assets.hero} content={content} /><p>{item.paragraphs[0]}</p></div>}
      {item.paragraphs[1] && <p>{item.paragraphs[1]}</p>}
      <div className={`${styles.gallery} ${id === 'stack' ? styles.stack : ''}`}>
        {assets.gallery.map((asset) => <MediaItem key={asset.type === 'photo' ? asset.id : asset.name} item={asset} content={content} />)}
      </div>
    </div>
  )
}

export function Experience({ title, art, content, locale }: { title: string; art: string; content: ExperienceContent; locale: Locale }) {
  const [area, setArea] = useState<'achievements' | 'career'>('achievements')
  const [selected, setSelected] = useState<AchievementId>('deployment')
  const small = useSmallScreen()
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.foreground}>
        <AsciiArt as="h2" label={title} art={art} align="left" revealColumns={locale === 'es' ? spanishColumns : englishColumns} />
        <div className={styles.toolbar}>
          <div className={styles.areaTabs} role="tablist" aria-label={title}>
            {(['achievements', 'career'] as const).map((id) => <button key={id} id={`experience-tab-${id}`} role="tab" type="button" aria-selected={area === id} aria-controls={`experience-panel-${id}`} tabIndex={area === id ? 0 : -1} onClick={() => setArea(id)} onKeyDown={(event) => moveTab(event, 'horizontal')}>{content[id]}</button>)}
          </div>
          <a className={styles.download} href={url(cvFiles[locale])} download>{content.download} <span aria-hidden="true">↓</span></a>
        </div>
        <div id="experience-panel-achievements" role="tabpanel" aria-labelledby="experience-tab-achievements" hidden={area !== 'achievements'}>
          {area === 'achievements' && (small ? (
            <div className={styles.accordion}>
              {achievementIds.map((id) => <div className={styles.accordionItem} key={id}>
                <h3><button id={`achievement-tab-${id}`} type="button" aria-expanded={selected === id} aria-controls={`achievement-panel-${id}`} onClick={() => setSelected(id)}>{content.items[id].title}<span aria-hidden="true">{selected === id ? '−' : '+'}</span></button></h3>
                <div id={`achievement-panel-${id}`} role="region" aria-labelledby={`achievement-tab-${id}`} hidden={selected !== id}>{selected === id && <AchievementPanel id={id} content={content} />}</div>
              </div>)}
            </div>
          ) : (
            <div className={styles.achievementsLayout}>
              <div className={styles.achievementTabs} role="tablist" aria-label={content.achievements} aria-orientation="vertical">
                {achievementIds.map((id) => <button key={id} id={`achievement-tab-${id}`} type="button" role="tab" aria-selected={selected === id} aria-controls={`achievement-panel-${id}`} tabIndex={selected === id ? 0 : -1} onClick={() => setSelected(id)} onKeyDown={(event) => moveTab(event, 'vertical')}>{content.items[id].title}</button>)}
              </div>
              {achievementIds.map((id) => <div key={id} id={`achievement-panel-${id}`} role="tabpanel" aria-labelledby={`achievement-tab-${id}`} hidden={selected !== id}>{selected === id && <AchievementPanel id={id} content={content} />}</div>)}
            </div>
          ))}
        </div>
        <div id="experience-panel-career" role="tabpanel" tabIndex={0} aria-labelledby="experience-tab-career" hidden={area !== 'career'}>
          {area === 'career' && <div className={styles.career}><p className={styles.careerIntro}>{content.introduction}</p><div className={styles.jobs}>
            {content.jobs.map((job) => <article className={styles.job} key={job.company}><h3>{job.company}</h3><p className={styles.role}>{job.role}</p><p className={styles.period}>{job.period}</p><ul>{job.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}</ul></article>)}
          </div></div>}
        </div>
      </div>
      <div className={styles.background} aria-hidden="true"><AsciiPerlinBackground /></div>
    </section>
  )
}
