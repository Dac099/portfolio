import type { LanguagePreference, TextDictionary } from '../../i18n/types'
import styles from './component.module.css'
type Props = { value: LanguagePreference; onChange: (value: LanguagePreference) => void; labels: TextDictionary['language'] }
export function LanguageSelector({ value, onChange, labels }: Props) {
  return <label className={styles.control}>{labels.label}<select value={value} onChange={(event) => onChange(event.target.value as LanguagePreference)}><option value="auto">{labels.auto}</option><option value="es">{labels.es}</option><option value="en">{labels.en}</option></select></label>
}
