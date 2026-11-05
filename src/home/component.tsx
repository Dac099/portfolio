import { AsciiArt } from '../components/ascii-art/component'
import type { AsciiDictionary } from '../i18n/types'
import { AsciiBackground } from './components/ascii-background/component'
import styles from './component.module.css'
type Props = { name: string; profession: string; art: AsciiDictionary }
export function Home({ name, profession, art }: Props) {
  return (
    <section id="home" className={styles.section}>
      <div className={styles.foreground}>
        <div className={styles.content}>
          <AsciiArt as="h1" label={name} art={art.name} />
          <AsciiArt as="p" label={profession} art={art.profession} accent size="small" />
        </div>
      </div>
      <AsciiBackground />
    </section>
  )
}
