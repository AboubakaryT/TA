import { Box, Section, Txt, u } from '../components/primitives'
import { useTabs } from '../tabs'

export default function Hero() {
  const { go } = useTabs()
  return (
    <Section id="top" width={10988} height={7009} top={266} bg="/assets/home-bg-3.webp">
      <Box l={10080} t={520} w={320} h={118} bg="#f3f3f3" />
      {/* cream patches hide the old orange blob, tape and buttons baked into the export */}
      <Box l={200} t={1085} w={1150} h={2150} bg="#fff7f1" />
      <Box l={1000} t={2990} w={4700} h={960} bg="#fff7f1" />
      <Box l={700} t={4820} w={3700} h={500} bg="#fff7f1" />

      <Txt as="div" l={1086} t={1120} size={800} className="fr fr-black-italic lines nowrap">
        <p>Hi, I’m</p>
        <p>Tashawna!</p>
      </Txt>

      <Box l={1250} t={3040} w={3100} h={70} r={50} bg="#c7a3e6" style={{ transform: 'rotate(-0.8deg)' }} />

      <Box l={1030} t={3290} w={3120} h={620} bg="#d9bff0" style={{ borderRadius: '48% 52% 50% 50% / 60% 55% 45% 40%' }} />
      <Txt l={1330} t={3340} size={370} className="fr fr-italic nowrap">
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
