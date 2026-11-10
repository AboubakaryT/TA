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

const ALFA = ['amy-putman-banner', 'brian-keeler-banner', 'brian-keeler', 'ritu-bajaj', 'keith-vogrin', 'image'].map((n) => `/projects/alfa/${n}.jpg`)

const UB = ['acm-website.jpg', 'fall-gbm.jpg', 'resume-roast-fixed.webp', 'resume-roast.jpg'].map((n) => `/projects/ub/${n}`)

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
