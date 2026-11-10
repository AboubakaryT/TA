import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

/** Figma design pixels -> CSS length. 1 design px = 100cqw / 10511 (see index.css). */
export const u = (n: number) => `calc(var(--u) * ${n})`
const len = (v: number | string) => (typeof v === 'number' ? u(v) : v)

type BoxProps = {
  l: number
  t: number
  w?: number
  h?: number
  r?: number
  bg?: string
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/** Absolutely positioned box, measured in Figma design pixels. */
export function Box({ l, t, w, h, r, bg, className = '', style, children }: BoxProps) {
  return (
    <div
      className={`abs ${className}`}
      style={{
        left: u(l),
        top: u(t),
        width: w === undefined ? undefined : u(w),
        height: h === undefined ? undefined : u(h),
        borderRadius: r === undefined ? undefined : u(r),
        background: bg,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/** Text positioned at a Figma coordinate. `size` is the Figma font size in design px. */
export function Txt({
  l,
  t,
  w,
  h,
  size,
  rot,
  className = '',
  style,
  children,
  as: Tag = 'p',
}: {
  l: number
  t: number
  w?: number
  h?: number
  size: number
  /** Figma rotation in degrees (counter-clockwise positive), pivoting on the top-left corner */
  rot?: number
  className?: string
  style?: CSSProperties
  children: ReactNode
  as?: 'p' | 'div' | 'a' | 'span'
}) {
  const Comp = Tag as 'p'
  return (
    <Comp
      className={`abs ${className}`}
      style={{
        margin: 0,
        left: u(l),
        top: u(t),
        width: w === undefined ? undefined : u(w),
        height: h === undefined ? undefined : u(h),
        fontSize: u(size),
        ...(rot ? { transform: `rotate(${-rot}deg)`, transformOrigin: '0 0' } : null),
        ...style,
      }}
    >
      {children}
    </Comp>
  )
}

/** Image that shows a dashed placeholder until its file exists in /public/assets. */
export function Art({
  src,
  alt = '',
  cover = false,
  style,
}: {
  src: string
  alt?: string
  cover?: boolean
  style?: CSSProperties
}) {
  const [failed, setFailed] = useState(false)
  if (failed) return <span className="art-missing" style={style} title={`missing: ${src}`} />
  return (
    <img
      className={`art-img${cover ? ' art-cover' : ''}`}
      src={src}
      alt={alt}
      style={style}
      onError={() => setFailed(true)}
      draggable={false}
    />
  )
}

/** Image filling a Figma box. */
export function Picture({
  l,
  t,
  w,
  h,
  src,
  cover = false,
  alt = '',
  style,
}: {
  l: number
  t: number
  w: number
  h: number
  src: string
  cover?: boolean
  alt?: string
  style?: CSSProperties
}) {
  return (
    <Box l={l} t={t} w={w} h={h} style={style}>
      <Art src={src} cover={cover} alt={alt} />
    </Box>
  )
}

type Inset = [number | string, number | string, number | string, number | string]

/**
 * A rotated graphic, laid out exactly like Figma's export:
 * an outer box (l,t,w,h) that centres an inner element of width `iw` (and optional height `ih`)
 * rotated by `deg`. When `inset` is set the image sits in that inset of the inner box
 * (used for strokes/arrows whose SVG bounds extend past the layer box).
 */
export function Rot({
  l,
  t,
  w,
  h,
  deg,
  iw,
  ih = 0,
  inset,
  src,
  cover = false,
  alt = '',
}: {
  l: number
  t: number
  w: number
  h: number
  deg: number
  iw: number
  ih?: number
  inset?: Inset
  src: string
  cover?: boolean
  alt?: string
}) {
  return (
    <div
      className="rot-outer"
      style={{ left: u(l), top: u(t), width: u(w), height: u(h) }}
    >
      <div
        style={{
          flex: 'none',
          position: 'relative',
          width: u(iw),
          height: u(ih),
          transform: `rotate(${deg}deg)`,
        }}
      >
        {inset ? (
          <div
            style={{
              position: 'absolute',
              top: len(inset[0]),
              right: len(inset[1]),
              bottom: len(inset[2]),
              left: len(inset[3]),
            }}
          >
            <Art src={src} cover={cover} alt={alt} />
          </div>
        ) : (
          <Art src={src} cover={cover} alt={alt} />
        )}
      </div>
    </div>
  )
}

/** Un-rotated graphic whose SVG bounds extend past its Figma box by percentage insets. */
export function Inset({
  l,
  t,
  w,
  h,
  inset,
  src,
}: {
  l: number
  t: number
  w: number
  h: number
  inset: Inset
  src: string
}) {
  return (
    <Box l={l} t={t} w={w} h={h}>
      <div
        style={{
          position: 'absolute',
          top: len(inset[0]),
          right: len(inset[1]),
          bottom: len(inset[2]),
          left: len(inset[3]),
        }}
      >
        <Art src={src} />
      </div>
    </Box>
  )
}

/**
 * One Figma frame (`width` x `height` design px) shown as a browser-window page.
 * `bg` is the flat background export (no text, no folder tab). `top` is the design y where the
 * window body begins; everything above it is replaced by the tab stack in <Deck />.
 */
export function Section({
  id,
  width,
  height,
  top,
  bg,
  children,
}: {
  id?: string
  width: number
  height: number
  top: number
  bg?: string
  children?: ReactNode
}) {
  return (
    <section id={id} className="frame" style={{ ['--u' as string]: `calc(100cqw / ${width})` }}>
      <div className="stage" style={{ height: `calc(var(--u) * ${height - top})` }}>
        <div className="shift" style={{ top: `calc(var(--u) * ${-top})`, height: u(height) }}>
          {bg && <img className="bg" src={bg} alt="" draggable={false} />}
          {children}
        </div>
      </div>
    </section>
  )
}

/** Redraws the lock + "tashawna.com" in a URL bar whose baked lock was exported detached. `y` = design y of the pill's top edge. */
export function UrlLock({ y, bar }: { y: number; bar: string }) {
  return (
    <>
      <Box l={5300} t={y - 98} w={500} h={96} bg={bar} />
      <Box l={5380} t={y + 22} w={1140} h={180} bg="#fff" />
      <svg
        className="abs"
        viewBox="0 0 24 24"
        style={{ left: u(5405), top: u(y + 32), width: u(150), height: u(150) }}
        fill="#000"
      >
        <path d="M7 10V7.5a5 5 0 0 1 10 0V10h.5A1.5 1.5 0 0 1 19 11.5v8a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19.5v-8A1.5 1.5 0 0 1 6.5 10H7Zm2 0h6V7.5a3 3 0 0 0-6 0V10Z" />
      </svg>
      <Txt l={5620} t={y + 22} size={170} className="fr fr-regular nowrap" style={{ lineHeight: u(180) }}>
        tashawna.com
      </Txt>
    </>
  )
}
