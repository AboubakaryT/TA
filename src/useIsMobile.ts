import { useEffect, useState } from 'react'

const Q = '(max-width: 760px)'

export function useIsMobile() {
  const [m, setM] = useState(() => window.matchMedia(Q).matches)
  useEffect(() => {
    const mq = window.matchMedia(Q)
    const on = () => setM(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return m
}
