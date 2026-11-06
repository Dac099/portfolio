import type { CSSProperties } from 'react'
import type { ThemePreference, TextDictionary } from '../../i18n/types'
import styles from './component.module.css'
type Props = { value: ThemePreference; onChange: (value: ThemePreference) => void; labels: TextDictionary['theme'] }
const iconUrl = (file: string) => `${import.meta.env.BASE_URL}${file}`
const icons: Record<ThemePreference, string> = { dark: 'moon.svg', light: 'sun.svg', system: 'auto.svg' }
export function ThemeSelector({ value, onChange, labels }: Props) {
  const options: { value: ThemePreference; label: string }[] = [
    { value: 'dark', label: labels.dark },
    { value: 'light', label: labels.light },
    { value: 'system', label: labels.system },
  ]

  return (
    <fieldset className={styles.control}>
      <legend>{labels.label}</legend>
      <div className={styles.options}>
        {options.map((option) => (
          <label key={option.value} className={styles.option}>
            <input
              type="radio"
              name="theme"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span
              aria-hidden="true"
              className={styles.icon}
              style={{ maskImage: `url("${iconUrl(icons[option.value])}")`, WebkitMaskImage: `url("${iconUrl(icons[option.value])}")` } as CSSProperties}
            />
            <span className={styles.srOnly}>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
