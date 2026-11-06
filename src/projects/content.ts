import type { Locale } from '../i18n/types'
import projectData from './projects.json'

export type Project = {
  id: string
  name: Record<Locale, string>
  url: string
  repository?: string
  description: Record<Locale, string>
  images: {
    ascii: string
    original: string
    alt: Record<Locale, string>
  }
  technologies: string[]
}

export const projects: Project[] = projectData
