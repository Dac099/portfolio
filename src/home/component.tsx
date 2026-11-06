import { AsciiArt } from '../components/ascii-art/component'
import type { AsciiDictionary } from '../i18n/types'
import type { TextDictionary } from '../i18n/types'
import { AsciiBackground } from './components/ascii-background/component'
import styles from './component.module.css'
type Props = { name: string; profession: string; art: AsciiDictionary; labels: Pick<TextDictionary, 'home' | 'contact' | 'navigation' | 'experience' | 'projects'> }
export function Home({ name, profession, art, labels }: Props) {
  return (
    <section id="home" className={styles.section}>
      <div className={styles.foreground}>
        <div className={styles.content}>
          <AsciiArt as="h1" label={name} art={art.name} />
          <AsciiArt as="p" label={profession} art={art.profession} accent size="small" />
        </div>
        <footer className={styles.footer}>
          <div className={styles.footerArea}>
            <h2>{labels.contact}</h2>
            <ul className={styles.links}>
              <li><a href="mailto:davidcejazapata+portfolio@gmail.com">davidcejazapata+portfolio@gmail.com</a></li>
              <li><a href="https://www.tiktok.com/@dac_099" target="_blank" rel="noreferrer">TikTok</a></li>
              <li><a href="https://www.linkedin.com/in/david-ceja-zapata" target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>
          </div>
          <nav className={`${styles.footerArea} ${styles.navigation}`} aria-label={labels.navigation}>
            <h2>{labels.navigation}</h2>
            <ul className={styles.links}>
              <li><a href="#home">{labels.home}</a></li>
              <li><a href="#experience">{labels.experience}</a></li>
              <li><a href="#projects">{labels.projects}</a></li>
            </ul>
          </nav>
        </footer>
      </div>
      <AsciiBackground />
    </section>
  )
}
