import { Section, Txt, u } from '../components/primitives'
import { usePopups } from '../popups'
import { PROJECTS } from '../projects'
import type { ProjectId } from '../projects'

/** Folder hit areas in design px (x, y, w, h) + the paper sprite cut from the same spot. */
const FOLDERS: { id: ProjectId; box: [number, number, number, number]; papers: string; oy: number; sy: number }[] = [
  { id: 'alfa', box: [300, 3350, 3720, 2780], papers: '/assets/papers-alfa.png', oy: 22.3, sy: 1.2 },
  { id: 'ub', box: [4000, 2150, 3280, 2370], papers: '/assets/papers-ub.png', oy: 26.3, sy: 1.2 },
  { id: 'personal', box: [7140, 3550, 3660, 2810], papers: '/assets/papers-pers.png', oy: 31.8, sy: 1.19 },
]

export default function Projects() {
  const { open } = usePopups()
  return (
    <Section id="projects" width={11130} height={7422} top={270} bg="/assets/projects-bg-2.webp">
      <Txt l={515} t={1973} size={501} className="fr fr-black-italic nowrap">
        PROJECTS
      </Txt>

      <Txt
        as="div"
        l={921.9}
        t={4439.5}
        w={3037.6}
        size={700}
        rot={7.64}
        className="fr fr-black-italic lines nowrap"
        style={{ color: '#eddafa', lineHeight: u(600) }}
      >
        <p>Alfa Art</p>
        <p>Gallery</p>
      </Txt>

      <Txt
        l={4527}
        t={3407.6}
        w={2760.6}
        size={600}
        rot={4.63}
        className="fr fr-black-italic nowrap"
        style={{ color: '#1645b9', lineHeight: u(462) }}
      >
        UB ACM
      </Txt>

      <Txt
        as="div"
        l={7859.6}
        t={4430}
        size={450}
        rot={-9.76}
        className="fr fr-black-italic lines nowrap"
        style={{ color: '#a55733' }}
      >
        <p>PERSONAL</p>
        <p>PROJECTS</p>
      </Txt>

      {FOLDERS.map((f) => (
        <button
          key={f.id}
          type="button"
          className="folder"
          aria-label={`Open ${PROJECTS[f.id].title}`}
          onClick={() => open(f.id)}
          style={{ left: u(f.box[0]), top: u(f.box[1]), width: u(f.box[2]), height: u(f.box[3]), ['--sy' as string]: f.sy }}
        >
          <img className="papers" src={f.papers} alt="" draggable={false} style={{ transformOrigin: `50% ${f.oy}%` }} />
        </button>
      ))}
    </Section>
  )
}
