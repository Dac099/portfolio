import { useEffect, useState } from 'react'
import type { ThemePreference } from '../i18n/types'
const key = 'portfolio.theme'
function readPreference(): ThemePreference {
  try {
    const value = localStorage.getItem(key)
    if (value === 'system' || value === 'dark' || value === 'light') return value
  } catch { /* Storage is optional. */ }
  return 'system'
}
export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(readPreference)
  useEffect(() => {
    if (preference === 'system') delete document.documentElement.dataset.theme
    else document.documentElement.dataset.theme = preference
    try { localStorage.setItem(key, preference) } catch { /* Storage is optional. */ }
  }, [preference])
  return { preference, setPreference }
}
