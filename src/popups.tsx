import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import { GALLERY, PERSONAL, PROJECTS } from './projects'
import type { Project, ProjectId } from './projects'
import { useIsMobile } from './useIsMobile'

type Win = { id: ProjectId; x: number; y: number; z: number }

const PopupsContext = createContext<{ open: (id: ProjectId) => void }>({ open: () => {} })
export const usePopups = () => useContext(PopupsContext)

const popWidth = (id?: ProjectId) => Math.min(window.innerWidth * 0.94, id === 'personal' ? 640 : 1000)

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
          x: Math.max(6, (window.innerWidth - popWidth(id)) / 2 + n * 30),
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
          <img src={zoom} alt="" onClick={(e) => e.stopPropagation()} draggable={false} />
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

function Slot({ p, src, style, onZoom }: { p: Project; src?: string; style?: CSSProperties; onZoom: (s: string) => void }) {
  const [wide, setWide] = useState(false)
  return (
    <div className="pop-slot" style={{ background: p.slotColor, ...style }}>
      {src && (
        <button type="button" className="pop-photo" aria-label="View larger" onClick={() => onZoom(src)}>
          <img
            src={src}
            alt=""
            draggable={false}
            className={wide ? 'fit' : undefined}
            onLoad={(e) => setWide(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight > 1.3)}
          />
        </button>
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
  const step = (d: number) => setFrom((f) => Math.min(Math.max(f + d, 0), Math.max(imgs.length - 3, 0)))
  const closeAt = p.gallery ? GALLERY.close : PERSONAL.close
  const barH = p.gallery ? GALLERY.bar : PERSONAL.bar

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
        <div style={cut(p, L.x, L.y, L.w, L.h)} />
        <div className="pop-m-row">
          {[0, 1, 2].map((i) => (
            <Slot key={i} p={p} src={imgs[from + i]} onZoom={onZoom} />
          ))}
        </div>
        {imgs.length > 3 && (
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
      style={{ left: win.x, top: win.y, zIndex: win.z, width: mobile ? 'min(94vw, 560px)' : popWidth(win.id), aspectRatio: `${W} / ${H}` }}
      onPointerDown={onFocus}
    >
      <img className="pop-frame" src={p.frame} alt="" draggable={false} />
      <div className="pop-drag" style={{ height: pct(barH, H) }} {...dragProps} />
      {closeBtn}
      {p.gallery && (
        <>
          {GALLERY.slots.map((s, i) => (
            <Slot key={i} p={p} src={imgs[from + i]} onZoom={onZoom} style={{ left: pct(s.x, W), top: pct(s.y, H), width: pct(s.w, W), height: pct(s.h, H) }} />
          ))}
          <button className="pop-arrow" aria-label="Previous" onClick={() => step(-1)} style={{ left: pct(GALLERY.prev.x, W), top: pct(GALLERY.prev.y, H) }} />
          <button className="pop-arrow" aria-label="Next" onClick={() => step(1)} style={{ left: pct(GALLERY.next.x, W), top: pct(GALLERY.next.y, H) }} />
        </>
      )}
    </div>
  )
}
