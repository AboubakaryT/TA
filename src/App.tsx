import { useCallback, useEffect, useState } from 'react'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import About from './sections/About'
import Contact from './sections/Contact'
import { Deck, Nav } from './components/Deck'
import Mobile from './mobile/Mobile'
import { useIsMobile } from './useIsMobile'
import { PopupsProvider } from './popups'
import { TABS, TabsContext } from './tabs'
import type { TabId } from './tabs'

const fromHash = (): TabId => {
  const h = window.location.hash.replace('#', '')
  return TABS.some((t) => t.id === h) ? (h as TabId) : 'top'
}

export default function App() {
  const [active, setActive] = useState<TabId>(fromHash)
  const mobile = useIsMobile()

  const go = useCallback((id: TabId) => {
    setActive(id)
    window.history.replaceState(null, '', id === 'top' ? window.location.pathname : `#${id}`)
  }, [])

  useEffect(() => {
    const onHash = () => setActive(fromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <TabsContext.Provider value={{ active, go }}>
      <PopupsProvider>
      {mobile ? (
        <Mobile />
      ) : (
      <div className="scene">
        <Nav />
        <Deck>
          <main id="page" role="tabpanel" key={active}>
            {active === 'top' && <Hero />}
            {active === 'projects' && <Projects />}
            {active === 'about' && <About />}
            {active === 'contact' && <Contact />}
          </main>
        </Deck>
      </div>
      )}
      </PopupsProvider>
    </TabsContext.Provider>
  )
}
