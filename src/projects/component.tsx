import { AsciiArt } from '../components/ascii-art/component'
import type { Locale } from '../i18n/types'
import { BinaryBackground } from './components/binary-background/component'
import { createProjectTitleLayers } from './title-layers'
import styles from './component.module.css'
export function Projects({ title, art, locale }: { title: string; art: string; locale: Locale }) {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.foreground}>
        <AsciiArt as="h2" label={title} art={art} align="left" revealLayers={createProjectTitleLayers(art, locale)} />
      </div>
      <div className={styles.background} aria-hidden="true"><BinaryBackground /></div>
    </section>
  )
}
