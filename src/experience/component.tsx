import { AsciiArt } from '../components/ascii-art/component'
import styles from './component.module.css'
export function Experience({ title, art }: { title: string; art: string }) {
  return <section id="experience" className={styles.section}><AsciiArt as="h2" label={title} art={art} align="left" /></section>
}
