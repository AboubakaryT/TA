import { Box, Section, Txt, u } from '../components/primitives'
import { useTabs } from '../tabs'

export default function Hero() {
  const { go } = useTabs()
  return (
    <Section id="top" width={10988} height={7009} top={266} bg="/assets/home-bg-3.webp">
      <Box l={10080} t={520} w={320} h={118} bg="#f3f3f3" />
      {/* cream patches hide the old orange blob, tape and buttons baked into the export */}
      <Box l={200} t={1085} w={1150} h={1950} bg="#fff7f1" />
      <Box l={200} t={2900} w={820} h={420} bg="#fff7f1" />
      <Box l={700} t={4820} w={3700} h={500} bg="#fff7f1" />

      <Txt as="div" l={1086} t={1120} size={800} className="fr fr-black-italic lines nowrap">
        <p>Hi, I’m</p>
        <p>Tashawna!</p>
      </Txt>

      <Txt l={1250} t={3200} size={370} className="fr fr-italic nowrap" style={{ transform: "rotate(-2.5deg)", transformOrigin: "left center" }}>
        Graphic Designer
      </Txt>

      <Txt l={861} t={3962} w={4725} h={886} size={200} className="dm dm-regular">
        I design visual experiences across branding, print, and digital that communicate, connect,
        and create impact
      </Txt>

      <a
        href="#projects"
        onClick={(e) => {
          e.preventDefault()
          go('projects')
        }}
        className="abs dm dm-bold"
        style={{
          left: u(747), top: u(4870), width: u(1766), height: u(394), borderRadius: u(200),
          background: '#2b1a2c', color: '#fff', fontSize: u(150),
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: u(60),
        }}
      >
        View My Work <span>↗</span>
      </a>
      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          go('about')
        }}
        className="abs dm dm-bold"
        style={{
          left: u(2650), top: u(4870), width: u(1270), height: u(394), borderRadius: u(200),
          border: `${u(22)} solid #2b1a2c`, boxSizing: 'border-box', fontSize: u(150),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        About Me
      </a>
    </Section>
  )
}
