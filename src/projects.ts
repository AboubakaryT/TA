export type ProjectId = 'alfa' | 'ub' | 'personal'

export type Project = {
  id: ProjectId
  title: string
  /** popup frame export (transparent corners) and its natural size */
  frame: string
  size: [number, number]
  /** Pictures shown in the three slots (arrows scroll through more). Put files in /public/projects/<id>/ and list them here. */
  images: string[]
  slotColor: string
  gallery: boolean
}

const ALFA = ['amy-putman-banner', 'brian-keeler-banner', 'brian-keeler', 'ritu-bajaj', 'keith-vogrin', 'image'].map((n) => `/projects/alfa/${n}-c.jpg`)

const UB = ['acm-website.jpg', 'fall-gbm.jpg', 'gbm-slides.jpg', 'swe-panel.webp', 'resume-roast-fixed.webp', 'resume-roast.jpg'].map((n) => `/projects/ub/${n}`)

export const PROJECTS: Record<ProjectId, Project> = {
  alfa: { id: 'alfa', title: 'Alfa Art Gallery', frame: '/assets/frame-alfa.webp', size: [8000, 2859], images: ALFA, slotColor: '#ead7f6', gallery: true },
  ub: { id: 'ub', title: 'UB ACM', frame: '/assets/frame-ub-2.webp', size: [8000, 2859], images: UB, slotColor: '#cddcf8', gallery: true },
  personal: { id: 'personal', title: 'Personal Projects', frame: '/assets/frame-personal.webp', size: [3573, 2129], images: [], slotColor: '#ead7f6', gallery: false },
}

/** Layout of the gallery frames, in the frame's own pixels (8000 x 2859). */
export const GALLERY = {
  slots: [2872, 4539, 6206].map((x) => ({ x: x - 12, y: 698, w: 1518, h: 1772 })),
  prev: { x: 2748, y: 1608 },
  next: { x: 7820, y: 1648 },
  close: { x: 7640, y: 256 },
  bar: 400,
  left: { x: 0, y: 400, w: 2600, h: 2459 },
}
export const PERSONAL = { close: { x: 3358, y: 120 }, bar: 230 }

export type Caption = { title: string; text: string; tag: string }

/** Cute captions shown under an enlarged photo, keyed by image path. */
export const CAPTIONS: Record<string, Caption> = {
  '/projects/alfa/amy-putman-banner-c.jpg': { title: 'Pigmented Perceptions', text: 'A moody, dark banner for the gallery’s group exhibition, built to make the artwork glow.', tag: 'exhibition banner' },
  '/projects/alfa/brian-keeler-banner-c.jpg': { title: 'Pigmented Perceptions, but make it bright', text: 'The light version of the exhibition banner: a featured painting, sponsor logos and every opening date in one tidy spread.', tag: 'exhibition banner' },
  '/projects/alfa/brian-keeler-c.jpg': { title: 'Brian Keeler, featured artist', text: 'A poster that lets one painting take center stage, with pastel blocks holding all the event details.', tag: 'artist poster' },
  '/projects/alfa/ritu-bajaj-c.jpg': { title: 'Ritu Bajaj, featured artist', text: 'Tulips on a deep black background, with fine linework that makes them look like they’re floating.', tag: 'artist poster' },
  '/projects/alfa/keith-vogrin-c.jpg': { title: 'Meet the Artist: Keith Vogrin', text: 'A thumbnail for an artist interview and Q&A, with the painting peeking out behind the text.', tag: 'social thumbnail' },
  '/projects/alfa/image-c.jpg': { title: 'Meet the Artist, story edition', text: 'The same artist-talk announcement, restyled tall for stories so it fits in your thumb’s reach.', tag: 'story graphic' },
  '/projects/ub/acm-website.jpg': { title: 'Fall GBM', text: 'A retro-computer-window look for UB ACM’s first meeting of the semester, with a cheeky cursor pointing at the snacks.', tag: 'square post' },
  '/projects/ub/fall-gbm.jpg': { title: 'Fall GBM, story edition', text: 'The same retro desktop, stretched tall for stories, with the where, when and snacks stacked in cute little cards.', tag: 'story graphic' },
  '/projects/ub/gbm-slides.jpg': { title: 'Fall GBM slide deck', text: 'Every slide from the meeting, from the welcome screen to game night, all dressed up as little desktop windows.', tag: 'presentation' },
  '/projects/ub/swe-panel.webp': { title: 'Software Engineer Panel', text: 'A line-up of alumni and student interns from big tech, each with their company logo tucked beside them.', tag: 'event poster' },
  '/projects/ub/resume-roast-fixed.webp': { title: 'CSE Resume Roast', text: 'Bring your resume, get gentle feedback. A cloudy blue gradient keeps the roast friendly.', tag: 'event flyer' },
  '/projects/ub/resume-roast.jpg': { title: 'CSE Resume Roast', text: 'The original square flyer for the evening of resume advice, live demos and 1:1 reviews.', tag: 'event flyer' },
}
