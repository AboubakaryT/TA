import type { CSSProperties, ReactNode } from 'react'
import { TABS, useTabs } from '../tabs'
import { usePopups } from '../popups'
import type { ProjectId } from '../projects'
import type { TabId } from '../tabs'

const EMAIL = 'tashawnaa230@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/tashawnaa'
const u = (n: number) => `calc(var(--u) * ${n})`

/** Shows a rectangle (x,y,w,h in design px) cut out of a full-frame background export. */
function Crop({
  src, frame, x, y, w, h, children, style,
}: {
  src: string
  frame: [number, number]
  x: number; y: number; w: number; h: number
  children?: ReactNode
  style?: CSSProperties
}) {
  return (
    <div className="m-crop" style={{ aspectRatio: `${w} / ${h}`, ...style }}>
      <div
        className="m-crop-in"
        style={{ ['--u' as string]: `calc(100cqw / ${w})`, left: u(-x), top: u(-y), width: u(frame[0]), height: u(frame[1]) }}
      >
        <img src={src} alt="" draggable={false} />
        {children}
      </div>
    </div>
  )
}

function Hero() {
  const { go } = useTabs()
  return (
    <>
      <h1 className="m-h1 fr fr-black-italic">
        Hi, I’m<br />
        Tashawna!
      </h1>
      <p className="m-hl fr fr-italic">Graphic Designer</p>
      <p className="m-p dm dm-regular">
        I design visual experiences across branding, print, and digital that communicate, connect,
        and create impact
      </p>
      <div className="m-btns">
        <button className="m-btn dark dm dm-bold" onClick={() => go('projects')}>View My Work ↗</button>
        <button className="m-btn line dm dm-bold" onClick={() => go('about')}>About Me</button>
      </div>
      <Crop src="/assets/home-bg-3.webp" frame={[10988, 7009]} x={6300} y={1100} w={4600} h={5000} />
    </>
  )
}

function Projects() {
  const { open } = usePopups()
  const wrap = (id: ProjectId, el: ReactNode) => (
    <button type="button" className="m-folder" onClick={() => open(id)}>{el}</button>
  )
  const f: [number, number] = [11130, 7422]
  const s = '/assets/projects-bg-2.webp'
  const label = (css: CSSProperties) => ({ position: 'absolute' as const, whiteSpace: 'nowrap' as const, transformOrigin: '0 0', ...css })
  return (
    <>
      <h1 className="m-h1 fr fr-black-italic" style={{ textTransform: 'uppercase' }}>Projects</h1>
      <div className="m-stack">
        {wrap('alfa', <Crop src={s} frame={f} x={300} y={3350} w={3720} h={2780}>
          <div className="fr fr-black-italic" style={label({ left: u(921.9), top: u(4439.5), fontSize: u(700), lineHeight: u(600), color: '#eddafa', transform: 'rotate(-7.64deg)' })}>
            Alfa Art<br />Gallery
          </div>
        </Crop>)}
        {wrap('ub', <Crop src={s} frame={f} x={4000} y={2150} w={3280} h={2370}>
          <div className="fr fr-black-italic" style={label({ left: u(4527), top: u(3407.6), fontSize: u(600), color: '#1645b9', transform: 'rotate(-4.63deg)' })}>UB ACM</div>
        </Crop>)}
        {wrap('personal', <Crop src={s} frame={f} x={7140} y={3550} w={3660} h={2810}>
          <div className="fr fr-black-italic" style={label({ left: u(7859.6), top: u(4430), fontSize: u(450), lineHeight: u(430), color: '#a55733', transform: 'rotate(9.76deg)' })}>
            PERSONAL<br />PROJECTS
          </div>
        </Crop>)}
      </div>
    </>
  )
}

function About() {
  const f: [number, number] = [11314, 7165]
  const s = '/assets/about-bg.webp'
  return (
    <>
      <Crop src={s} frame={f} x={4600} y={1230} w={2750} h={900} style={{ width: '62%' }} />
      <Crop src={s} frame={f} x={300} y={1150} w={3950} h={4000} style={{ width: '88%', margin: '0 auto' }} />
      <h1 className="m-h2 fr fr-black-italic">A designer, student and creative problem solver.</h1>
      <p className="m-p dm dm-regular">
        I’m a BFA Graphic Design student at the university at Buffalo with a passion for visual
        storytelling, branding and digital experiences. I’m always exploring new ways to combine
        design, culture and technology to create work that feels thoughtful and engaging.
      </p>
      <div className="m-chips dm dm-regular">
        <span style={{ background: '#fee4b4' }}>Buffalo, NY</span>
        <span style={{ background: '#fee4b4' }}>UB BFA ‘28</span>
        <span style={{ background: '#cce9d1' }}>Open to Internships</span>
      </div>
      <h2 className="m-h3 fr fr-black">Tools I Use</h2>
      <Crop src={s} frame={f} x={3600} y={5450} w={4700} h={900} style={{ borderRadius: '5cqw' }} />
      <p className="m-small dm dm-regular">Design, layout, and visual storytelling</p>
    </>
  )
}

function Contact() {
  return (
    <>
      <h1 className="m-h1 fr fr-black-italic">
        Let’s<br />Work<br />Together!
      </h1>
      <p className="m-p dm dm-black">
        Have a project, opportunity, or idea you’ll like to talk about? I’d love to hear from you.
      </p>
      <a className="m-btn dark dm dm-black" href={`mailto:${EMAIL}`}>Get in Touch</a>
      <p className="m-p dm dm-semibold">
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <br />
        <a href={LINKEDIN} target="_blank" rel="noreferrer">linkedin.com/in/tashawnaa</a>
      </p>
    </>
  )
}

export default function Mobile() {
  const { active, go } = useTabs()
  const tab = TABS.find((t) => t.id === active)!
  const pages: Record<TabId, ReactNode> = {
    top: <Hero />, projects: <Projects />, about: <About />, contact: <Contact />,
  }
  return (
    <div className="m-scene">
      <header className="m-nav">
        <a className="m-logo" href="#" onClick={(e) => { e.preventDefault(); go('top') }}>✦ tashawna.</a>
        <a className="m-resume dm" href="/Tashawna_Resume.pdf" target="_blank" rel="noreferrer">Resume ↗</a>
        <a className="m-chat" href="#contact" onClick={(e) => { e.preventDefault(); go('contact') }}>Let’s chat</a>
      </header>
      <nav className="m-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === active}
            className={t.id === active ? 'on' : ''}
            style={{ background: t.color }}
            onClick={() => go(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <main className="m-card" role="tabpanel" key={active} style={{ borderColor: tab.color }}>
        <div className="m-bar"><i style={{ background: '#d9232b' }} /><i style={{ background: '#f4a62a' }} /><i style={{ background: '#5fcf80' }} /></div>
        <div className="m-body">{pages[active]}</div>
      </main>
    </div>
  )
}
