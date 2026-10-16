import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import Lenis from 'lenis'

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

export function Magnetic({ children }: { children: ReactNode }) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 18 })
  const springY = useSpring(y, { stiffness: 180, damping: 18 })
  const reduced = useReducedMotion()
  function move(e: MouseEvent<HTMLDivElement>) {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.18)
    y.set((e.clientY - r.top - r.height / 2) * 0.18)
  }
  return <motion.div className="magnetic" style={{ x: springX, y: springY }} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0) }}>{children}</motion.div>
}

export function Tilt({ children }: { children: ReactNode }) {
  const rx = useMotionValue(0), ry = useMotionValue(0)
  const glare = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const rotateX = useSpring(rx, { stiffness: 180, damping: 24 })
  const rotateY = useSpring(ry, { stiffness: 180, damping: 24 })
  function move(e: MouseEvent<HTMLDivElement>) {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
    rx.set((0.5 - y) * 7); ry.set((x - 0.5) * 7)
    glare.current?.style.setProperty('--glare-x', `${x * 100}%`)
    glare.current?.style.setProperty('--glare-y', `${y * 100}%`)
  }
  return <motion.div className="tilt" style={{ rotateX, rotateY, transformPerspective: 1000 }} onMouseMove={move} onMouseLeave={() => { rx.set(0); ry.set(0) }}>{children}<div ref={glare} className="card-glare" /></motion.div>
}

export function GlobalMotion() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const ring = useRef<HTMLDivElement>(null), dot = useRef<HTMLDivElement>(null)
  const [cursorState, setCursorState] = useState('')
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ duration: 1.1, anchors: true, smoothWheel: true })
    let frame = 0
    const loop = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(loop) }
    frame = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(frame); lenis.destroy() }
  }, [reduced])
  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return
    let tx = -100, ty = -100, x = -100, y = -100, frame = 0
    const move = (e: globalThis.MouseEvent) => {
      tx = e.clientX; ty = e.clientY
      if (dot.current) dot.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
      const target = e.target instanceof Element ? e.target : null
      setCursorState(target?.closest('[data-project]') ? 'view' : target?.closest('a,button,input,textarea') ? 'active' : '')
    }
    const loop = () => { x += (tx - x) * 0.17; y += (ty - y) * 0.17; if (ring.current) ring.current.style.transform = `translate3d(${x}px, ${y}px, 0)`; frame = requestAnimationFrame(loop) }
    window.addEventListener('mousemove', move); frame = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(frame) }
  }, [reduced])
  return <><motion.div className="scroll-progress" style={{ scaleX }} />{!reduced && <><div ref={dot} className="cursor-dot" /><div ref={ring} className={`cursor-ring ${cursorState}`}><span>{cursorState === 'view' ? 'View' : ''}</span></div></>}</>
}