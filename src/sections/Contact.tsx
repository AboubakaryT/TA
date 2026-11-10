import { Box, Section, Txt, u } from '../components/primitives'

const EMAIL = 'tashawnaa230@gmail.com'

export default function Contact() {
  return (
    <Section id="contact" width={11154} height={6245} top={236} bg="/assets/contact-bg.webp">
      <Box l={10790} t={240} w={120} h={60} bg="#deb2ec" />
      <Txt
        as="div"
        l={830}
        t={3123.4}
        w={4874}
        h={2587}
        size={600}
        rot={4.23}
        className="fr fr-black-italic lines nowrap"
      >
        <p>Let’s </p>
        <p>Work </p>
        <p>Together!</p>
      </Txt>

      <Txt as="div" l={4807} t={4132} w={2735} h={1571} size={163} className="dm dm-black lines">
        <p>Have a project, opportunity, or idea you’ll like to talk about?</p>
        <p>I’d love to hear from you.</p>
      </Txt>

      <Txt as="div" l={5021} t={5049} size={163} className="dm dm-black nowrap" style={{ color: '#fff' }}>
        Get in Touch
      </Txt>
      <a
        href={`mailto:${EMAIL}`}
        aria-label="Get in Touch"
        className="abs"
        style={{ left: u(4807), top: u(4918), width: u(1442), height: u(457), borderRadius: u(300) }}
      />

      <Txt as="div" l={7867} t={4239} size={163} className="dm dm-semibold nowrap">
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </Txt>
      <Txt as="div" l={7867} t={4642} size={163} className="dm dm-semibold nowrap">
        <a href="https://www.linkedin.com/in/tashawnaa" target="_blank" rel="noreferrer">
          linkedin.com/in/tashawnaa
        </a>
      </Txt>
    </Section>
  )
}
