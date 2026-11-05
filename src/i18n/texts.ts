import type { Locale, TextDictionary } from './types'
export const texts: Record<Locale, TextDictionary> = {
  en: {
    name: 'David Ceja Zapata', profession: 'Computer Systems Engineer',
    experience: 'Experience', projects: 'Projects',
    language: { label: 'Language', auto: 'Automatic', en: 'English', es: 'Español' },
    theme: { label: 'Theme', system: 'System', dark: 'Dark', light: 'Light' },
  },
  es: {
    name: 'David Ceja Zapata', profession: 'Ingeniero en sistemas',
    experience: 'Experiencia', projects: 'Proyectos',
    language: { label: 'Idioma', auto: 'Automático', en: 'English', es: 'Español' },
    theme: { label: 'Tema', system: 'Sistema', dark: 'Oscuro', light: 'Claro' },
  },
}
