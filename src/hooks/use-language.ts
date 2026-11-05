import { useEffect, useState } from 'react'
import type { LanguagePreference, Locale } from '../i18n/types'
const key = 'portfolio.language'
function readPreference(): LanguagePreference {
  try {
    const value = localStorage.getItem(key)
    if (value === 'auto' || value === 'en' || value === 'es') return value
  } catch { /* Storage is optional. */ }
  return 'auto'
}
function browserLocale(): Locale {
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const language of languages) {
    const code = language.toLowerCase().split('-')[0]
    if (code === 'en' || code === 'es') return code
  }
  return 'en'
}
export function useLanguage() {
  const [preference, setPreference] = useState<LanguagePreference>(readPreference)
  const [automaticLocale, setAutomaticLocale] = useState<Locale>(browserLocale)
  const locale = preference === 'auto' ? automaticLocale : preference
  useEffect(() => {
    const update = () => setAutomaticLocale(browserLocale())
    window.addEventListener('languagechange', update)
    return () => window.removeEventListener('languagechange', update)
  }, [])
  useEffect(() => { document.documentElement.lang = locale }, [locale])
  useEffect(() => {
    try { localStorage.setItem(key, preference) } catch { /* Storage is optional. */ }
  }, [preference])
  return { locale, preference, setPreference }
}
