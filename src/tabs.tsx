import { createContext, useContext } from 'react'

export type TabId = 'top' | 'projects' | 'about' | 'contact'

/** `ear` is the tab's width in % of the deck width. */
export const TABS: { id: TabId; label: string; color: string; ear: number }[] = [
  { id: 'top', label: 'Home', color: '#f4f3f3', ear: 26 },
  { id: 'projects', label: 'Work', color: '#ffac8f', ear: 29 },
  { id: 'about', label: 'About Me', color: '#b2dec9', ear: 24 },
  { id: 'contact', label: 'Contact', color: '#ddb2eb', ear: 20 },
]

export const TabsContext = createContext<{ active: TabId; go: (id: TabId) => void }>({
  active: 'top',
  go: () => {},
})

export const useTabs = () => useContext(TabsContext)
