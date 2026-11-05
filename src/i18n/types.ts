export type Locale = 'en' | 'es'
export type LanguagePreference = 'auto' | Locale
export type ThemePreference = 'system' | 'dark' | 'light'
export interface TextDictionary {
  name: string; profession: string; experience: string; projects: string
  language: { label: string; auto: string; en: string; es: string }
  theme: { label: string; system: string; dark: string; light: string }
}
export interface AsciiDictionary { name: readonly string[]; profession: readonly string[]; experience: string; projects: string }
