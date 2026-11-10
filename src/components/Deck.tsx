import type { ReactNode } from 'react'
import { TABS, useTabs } from '../tabs'
import type { TabId } from '../tabs'

/** Cascade geometry, in % of the deck width: depth 0 is the front (active) page. */
const LEFT = [0, 2.6, 6.7, 10.3]
const RIGHT = [0, 2.7, 6.4, 9.8]
const BODY_TOP = [12.6, 8.5, 5.1, 2.0]
const EAR_H = 2.4
const INSET: Partial<Record<TabId, number>> = { top: 0.7, about: 0.25, contact: 0.5 } // small margin around the window in these exports

const Icon = ({ id }: { id: TabId }) => {
  const p = { width: '1.9cqw', height: '1.9cqw', viewBox: '0 0 24 24', fill: 'none', stroke: '#000', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' } as const
  if (id === 'top')
    return (
      <svg {...p}>
        <path d="M3 11.5 12 4l9 7.5M5.5 10v9.5h13V10M10 19.5v-5h4v5" />
      </svg>
    )
  if (id === 'projects')
    return (
      <svg {...p}>
        <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
      </svg>
    )
  if (id === 'about')
    return (
      <svg {...p}>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 14.2c1 1.6 2.4 2.3 4 2.3s3-.7 4-2.3M9 9.5v.5M15 9.5v.5" />
      </svg>
    )
  return (
    <svg {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </svg>
  )
}

export function Deck({ children }: { children: ReactNode }) {
  const { active, go } = useTabs()
  // front = active tab, the rest keep their original order behind it
  const order = [active, ...TABS.map((t) => t.id).filter((id) => id !== active)]
  return (
    <div className="deck">
      <div className="deck-inner" style={{ paddingTop: `${BODY_TOP[0]}cqw` }}>
        {TABS.map((tab) => {
          const d = order.indexOf(tab.id)
          const isFront = d === 0
          const left = isFront ? (INSET[tab.id] ?? 0) : LEFT[d]
          return (
            <div key={tab.id}>
              {!isFront && (
                <div
                  className="layer"
                  onClick={() => go(tab.id)}
                  style={{
                    left: `${LEFT[d]}cqw`,
                    width: `${100 - LEFT[d] - RIGHT[d]}cqw`,
                    top: `${BODY_TOP[d]}cqw`,
                    background: tab.color,
                    zIndex: 10 - d,
                    ['--i' as string]: d,
                  }}
                />
              )}
              <button
                type="button"
                role="tab"
                aria-selected={isFront}
                aria-controls="page"
                className="ear"
                onClick={() => go(tab.id)}
                style={{
                  left: `${left}cqw`,
                  width: `${tab.ear}cqw`,
                  top: `${BODY_TOP[d] - EAR_H}cqw`,
                  zIndex: isFront ? 31 : 10 - d,
                  ['--tab' as string]: tab.color,
                  ['--ex' as string]: isFront ? '1.8cqw' : '0cqw',
                  ['--i' as string]: d,
                }}
              >
                {tab.label}
                <Icon id={tab.id} />
              </button>
            </div>
          )
        })}
        <div className="page-slot">{children}</div>
      </div>
    </div>
  )
}

export function Nav() {
  const { active, go } = useTabs()
  const link = (id: TabId, label: string) => (
    <a
      href={id === 'top' ? '#' : `#${id}`}
      className={`nav-link${active === id ? ' is-active' : ''}`}
      onClick={(e) => {
        e.preventDefault()
        go(id)
      }}
    >
      {label}
    </a>
  )
  return (
    <header className="nav">
      <a
        className="nav-logo"
        href="#"
        onClick={(e) => {
          e.preventDefault()
          go('top')
        }}
      >
        <span className="nav-spark">✦</span> tashawna.
      </a>
      <nav className="nav-links">
        {link('top', 'Home')}
        {link('projects', 'Work')}
        {link('about', 'About')}
        <span className="nav-rule" />
        <a className="nav-link" href="/Tashawna_Resume.pdf" target="_blank" rel="noreferrer">
          Resume ↗
        </a>
        <a className="nav-link" href="https://www.linkedin.com/in/tashawnaa" target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <a
          className="nav-chat"
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            go('contact')
          }}
        >
          Let’s chat
        </a>
      </nav>
    </header>
  )
}
