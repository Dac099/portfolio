import { AsciiArt } from '../components/ascii-art/component'
import type { AsciiDictionary } from '../i18n/types'
import styles from './component.module.css'
type Props = { name: string; profession: string; art: AsciiDictionary }
export function Home({ name, profession, art }: Props) {
  return <section id="home" className={styles.section}><div className={styles.content}><AsciiArt as="h1" label={name} art={art.name} /><AsciiArt as="p" label={profession} art={art.profession} accent /></div></section>
}
