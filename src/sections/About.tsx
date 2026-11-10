import { Box, Section, Txt } from '../components/primitives'

export default function About() {
  return (
    <Section id="about" width={11314} height={7165} top={272} bg="/assets/about-bg.webp">
      <Box l={10820} t={285} w={170} h={70} bg="#b1dec8" />
      <Txt as="div" l={4451} t={2164} size={400} className="fr fr-black-italic lines nowrap">
        <p>A designer, student</p>
        <p>and creative problem solver.</p>
      </Txt>

      <Txt l={4451} t={3315} w={5667} h={1411} size={200} className="dm dm-regular">
        I’m a BFA Graphic Design student at the university at Buffalo with a passion for visual
        storytelling, branding and digital experiences. I’m always exploring new ways to combine
        design, culture and technology to create work that feels thoughtful and engaging.
      </Txt>

      <Txt as="div" l={4702} t={4821} size={169} className="dm dm-regular nowrap">
        Buffalo, NY
      </Txt>
      <Txt as="div" l={6457} t={4821} size={169} className="dm dm-regular nowrap">
        UB BFA ‘28
      </Txt>
      <Txt as="div" l={8065} t={4813} size={169} className="dm dm-regular nowrap">
        Open to Internships
      </Txt>

      <Txt l={1216} t={5656} w={3484} h={943} size={500} rot={2.5} className="fr fr-black nowrap">
        Tools I Use
      </Txt>

      <Txt l={8852} t={5797} w={1557} h={774} size={128} className="dm dm-regular">
        Design, layout, and visual storytelling
      </Txt>
    </Section>
  )
}
