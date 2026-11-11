import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import { CAPTIONS, GALLERY, IG, PERSONAL_SLOTS, PROJECTS, STATS } from './projects'
import type { Project, ProjectId } from './projects'
import { useIsMobile } from './useIsMobile'

type Win = { id: ProjectId; x: number; y: number; z: number }

const PopupsContext = createContext<{ open: (id: ProjectId) => void }>({ open: () => {} })
export const usePopups = () => useContext(PopupsContext)

const popWidth = () => Math.min(window.innerWidth * 0.94, 1000)

/** Scales a photo toward a shared on-screen area so tall and wide posters feel the same size. */
function LightboxImg({ src, alt }: { src: string; alt: string }) {
  const [nat, setNat] = useState<[number, number] | null>(null)
  const [vp, setVp] = useState<[number, number]>([window.innerWidth, window.innerHeight])
  useEffect(() => {
    const r = () => setVp([window.innerWidth, window.innerHeight])
    window.addEventListener('resize', r)
    return () => window.removeEventListener('resize', r)
  }, [])
  let style: CSSProperties = { visibility: 'hidden' }
  if (nat) {
    const [vw, vh] = vp
    const desktop = vw > 760
    const boxW = desktop ? vw * 0.92 - 360 : vw * 0.9
    const boxH = desktop ? vh * 0.82 : vh * 0.56
    const area = desktop ? vw * vh * 0.34 : vw * vh * 0.22
    const s = Math.min(Math.sqrt(area / (nat[0] * nat[1])), boxW / nat[0], boxH / nat[1])
    style = { width: Math.round(nat[0] * s), height: Math.round(nat[1] * s) }
  }
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      style={style}
      onLoad={(e) => setNat([e.currentTarget.naturalWidth, e.currentTarget.naturalHeight])}
    />
  )
}

export function PopupsProvider({ children }: { children: ReactNode }) {
  const [wins, setWins] = useState<Win[]>([])
  const [zoom, setZoom] = useState<string | null>(null)
  const zTop = useRef(100)

  useEffect(() => {
    if (!zoom) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setZoom(null)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [zoom])

  const open = useCallback((id: ProjectId) => {
    zTop.current += 1
    setWins((w) => {
      if (w.some((x) => x.id === id)) return w.map((x) => (x.id === id ? { ...x, z: zTop.current } : x))
      const n = w.length
      return [
        ...w,
        {
          id,
          x: Math.max(6, (window.innerWidth - popWidth()) / 2 + n * 30),
          y: Math.max(10, window.innerHeight * 0.16 + n * 30),
          z: zTop.current,
        },
      ]
    })
  }, [])

  const focus = (id: ProjectId) => {
    zTop.current += 1
    setWins((w) => w.map((x) => (x.id === id ? { ...x, z: zTop.current } : x)))
  }
  const close = (id: ProjectId) => setWins((w) => w.filter((x) => x.id !== id))
  const move = (id: ProjectId, x: number, y: number) => setWins((w) => w.map((q) => (q.id === id ? { ...q, x, y } : q)))

  return (
    <PopupsContext.Provider value={{ open }}>
      {children}
      {wins.map((w) => (
        <ProjectWindow key={w.id} win={w} onFocus={() => focus(w.id)} onClose={() => close(w.id)} onMove={(x, y) => move(w.id, x, y)} onZoom={setZoom} />
      ))}
      {zoom && (
        <div className="lightbox" onClick={() => setZoom(null)} role="dialog" aria-label="Image preview">
          <figure className="lb-fig" onClick={(e) => e.stopPropagation()}>
            <LightboxImg key={zoom} src={zoom} alt={CAPTIONS[zoom]?.title ?? ''} />
            {CAPTIONS[zoom] && (
              <figcaption className="lb-cap">
                <span className="lb-tag dm dm-bold">✦ {CAPTIONS[zoom].tag}</span>
                <b className="fr fr-italic lb-title">{CAPTIONS[zoom].title}</b>
                <span className="dm dm-regular lb-text">{CAPTIONS[zoom].text}</span>
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </PopupsContext.Provider>
  )
}

const pct = (v: number, of: number) => `${(v / of) * 100}%`

/** A rectangle (design px of the frame) cut out of the frame image. */
function cut(p: Project, x: number, y: number, w: number, h: number): CSSProperties {
  const [W, H] = p.size
  return {
    aspectRatio: `${w} / ${h}`,
    backgroundImage: `url(${p.frame})`,
    backgroundSize: `${(W / w) * 100}% ${(H / h) * 100}%`,
    backgroundPosition: `${W === w ? 0 : (x / (W - w)) * 100}% ${H === h ? 0 : (y / (H - h)) * 100}%`,
  }
}

const Eye = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />
  </svg>
)
const Heart = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true">
    <path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 3 4.8 6.4 4.8c2 0 3.7 1.1 5.6 3.2 1.9-2.1 3.6-3.2 5.6-3.2 3.4 0 5.5 3.4 4 6.9C19.5 16.4 12 21 12 21Z" />
  </svg>
)
const InstaLogo = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5.5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
  </svg>
)

function InstaLink({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <a className={`pop-ig ${className ?? ''}`} style={style} href={IG.url} target="_blank" rel="noopener noreferrer" aria-label="UB ACM on Instagram">
      <InstaLogo />
      <b className="dm dm-bold">{IG.handle}</b>
      <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
    </a>
  )
}

function Slot({ p, src, style, onZoom }: { p: Project; src?: string; style?: CSSProperties; onZoom: (s: string) => void }) {
  const stat = src ? STATS[src] : undefined
  const zoomable = true
  const img = src && (
    <img
      src={src}
      alt=""
      draggable={false}
      className="fit"
    />
  )
  return (
    <div className={`pop-slot${stat ? ' has-stat' : ''}`} style={{ background: stat ? p.slotColor : '#fff7f1', ...style }}>
      {src &&
        (zoomable ? (
          <button type="button" className="pop-photo" aria-label="View larger" onClick={() => onZoom(src)}>
            {img}
          </button>
        ) : (
          <div className="pop-photo">{img}</div>
        ))}
      {stat && (
        <div className="pop-stat dm dm-semibold">
          <span><Eye /> {stat.views} views</span>
          {stat.likes && <span><Heart /> {stat.likes} likes</span>}
          <i><InstaLogo /></i>
        </div>
      )}
    </div>
  )
}

function ProjectWindow({
  win, onFocus, onClose, onMove, onZoom,
}: {
  win: Win
  onFocus: () => void
  onClose: () => void
  onMove: (x: number, y: number) => void
  onZoom: (s: string) => void
}) {
  const p = PROJECTS[win.id]
  const mobile = useIsMobile()
  const [W, H] = p.size
  const [from, setFrom] = useState(0)
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null)

  const down = (e: PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { sx: e.clientX, sy: e.clientY, ox: win.x, oy: win.y }
  }
  const moveEv = (e: PointerEvent) => {
    const d = drag.current
    if (!d) return
    onMove(
      Math.min(Math.max(d.ox + e.clientX - d.sx, -300), window.innerWidth - 90),
      Math.min(Math.max(d.oy + e.clientY - d.sy, 0), window.innerHeight - 50),
    )
  }
  const dragProps = { onPointerDown: down, onPointerMove: moveEv, onPointerUp: () => (drag.current = null), onPointerCancel: () => (drag.current = null) }

  const imgs = p.images
  const slots = p.id === 'personal' ? PERSONAL_SLOTS : GALLERY.slots
  const visible = mobile ? 3 : slots.length
  const step = (d: number) => setFrom((f) => Math.min(Math.max(f + d, 0), Math.max(imgs.length - visible, 0)))
  const closeAt = GALLERY.close
  const barH = GALLERY.bar
  const canPage = imgs.length > visible

  const closeBtn = (
    <button
      className="pop-x"
      aria-label={`Close ${p.title}`}
      onClick={onClose}
      style={{ left: pct(closeAt.x, W), top: pct(closeAt.y, H) }}
    />
  )

  /* ----- phone: stack the pieces of the frame ----- */
  if (mobile && p.gallery) {
    const L = GALLERY.left
    return (
      <div className="pop pop-m" role="dialog" aria-label={p.title} style={{ left: 4, top: win.y, zIndex: win.z }} onPointerDown={onFocus}>
        <div className="pop-m-bar" style={cut(p, 0, 0, W, GALLERY.bar)} {...dragProps}>
          {closeBtn}
        </div>
        <div className="pop-m-head" style={{ aspectRatio: `${L.w} / ${Math.round((L.h - 14) * 0.93)}` }}>
          <div style={cut(p, L.x, L.y + 14, L.w, L.h - 14)} />
        </div>
        {p.id === 'ub' && <InstaLink className="pop-ig-m" />}
        <div className="pop-m-row">
          {[0, 1, 2].filter((i) => imgs[from + i]).map((i) => (
            <Slot key={i} p={p} src={imgs[from + i]} onZoom={onZoom} />
          ))}
        </div>
        {canPage && (
          <div className="pop-m-nav">
            <button onClick={() => step(-1)} aria-label="Previous">‹</button>
            <button onClick={() => step(1)} aria-label="Next">›</button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className="pop"
      role="dialog"
      aria-label={p.title}
      style={{ left: win.x, top: win.y, zIndex: win.z, width: mobile ? 'min(94vw, 560px)' : popWidth(), aspectRatio: `${W} / ${H}` }}
      onPointerDown={onFocus}
    >
      <img className="pop-frame" src={p.frame} alt="" draggable={false} />
      <div className="pop-drag" style={{ height: pct(barH, H) }} {...dragProps} />
      {closeBtn}
      {p.gallery && (
        <>
          {p.id === 'ub' && <InstaLink style={{ left: pct(240, W), top: pct(2480, H), width: pct(2120, W), height: pct(270, H) }} />}
          {slots.map((s, i) => (
            <Slot key={i} p={p} src={imgs[from + i]} onZoom={onZoom} style={{ left: pct(s.x, W), top: pct(s.y, H), width: pct(s.w, W), height: pct(s.h, H) }} />
          ))}
          {canPage && <button className="pop-arrow" aria-label="Previous" onClick={() => step(-1)} style={{ left: pct(GALLERY.prev.x, W), top: pct(GALLERY.prev.y, H) }} />}
          {canPage && <button className="pop-arrow" aria-label="Next" onClick={() => step(1)} style={{ left: pct(GALLERY.next.x, W), top: pct(GALLERY.next.y, H) }} />}
        </>
      )}
    </div>
  )
}
