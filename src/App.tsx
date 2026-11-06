import { useLanguage } from './hooks/use-language'
import { useScrollHeader } from './hooks/use-scroll-header'
import { useTheme } from './hooks/use-theme'
import { texts } from './i18n/texts'
import { ascii } from './i18n/ascii'
import { LanguageSelector } from './components/language-selector/component'
import { ThemeSelector } from './components/theme-selector/component'
import { Home } from './home/component'
import { Experience } from './experience/component'
import { experienceContent } from './experience/content'
import { Projects } from './projects/component'
import styles from './App.module.css'

function App() {
  const { locale, setPreference: setLanguage } = useLanguage()
  const { preference: theme, setPreference: setTheme } = useTheme()
  const headerHidden = useScrollHeader()
  const content = texts[locale]
  const art = ascii[locale]
  return (
    <>
      <header className={`${styles.toolbar} ${headerHidden ? styles.hidden : ''}`}>
        <a className={styles.brand} href="#home">{content.portfolio}</a>
        <div className={styles.selectors}>
          <LanguageSelector value={locale} onChange={setLanguage} labels={content.language} />
          <ThemeSelector value={theme} onChange={setTheme} labels={content.theme} />
        </div>
      </header>
      <main>
        <Home name={content.name} profession={content.profession} art={art} labels={content} />
        <Experience title={content.experience} art={art.experience} locale={locale} content={experienceContent[locale]} />
        <Projects title={content.projects} art={art.projects} locale={locale} labels={content.project} />
      </main>
    </>
  )
}
export default App
