import type { Locale, TextDictionary } from '../../i18n/types'
import styles from './component.module.css'
type Props = { value: Locale; onChange: (value: Locale) => void; labels: TextDictionary['language'] }
export function LanguageSelector({ value, onChange, labels }: Props) {
  return (
    <fieldset className={styles.control}>
      <legend>{labels.label}</legend>
      <div className={styles.options}>
        <label className={styles.option}>
          <input type="radio" name="language" value="es" checked={value === 'es'} onChange={() => onChange('es')} />
          <span aria-hidden="true">ES</span>
          <span className={styles.srOnly}>{labels.es}</span>
        </label>
        <label className={styles.option}>
          <input type="radio" name="language" value="en" checked={value === 'en'} onChange={() => onChange('en')} />
          <span aria-hidden="true">EN</span>
          <span className={styles.srOnly}>{labels.en}</span>
        </label>
      </div>
    </fieldset>
  )
}
