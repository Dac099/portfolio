import type { ThemePreference, TextDictionary } from '../../i18n/types'
import styles from './component.module.css'
type Props = { value: ThemePreference; onChange: (value: ThemePreference) => void; labels: TextDictionary['theme'] }
export function ThemeSelector({ value, onChange, labels }: Props) {
  return <label className={styles.control}>{labels.label}<select value={value} onChange={(event) => onChange(event.target.value as ThemePreference)}><option value="system">{labels.system}</option><option value="dark">{labels.dark}</option><option value="light">{labels.light}</option></select></label>
}
