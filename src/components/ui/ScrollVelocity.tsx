/**
 * ScrollVelocity — adaptado de React Bits (reactbits.dev/text-animations/scroll-velocity).
 * O texto corre continuamente e acelera conforme a velocidade do scroll.
 */
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

const wrap = (min: number, max: number, v: number) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

type Props = { children: ReactNode; baseVelocity?: number; copies?: number; className?: string }

export function ScrollVelocity({ children, baseVelocity = 60, copies = 6, className }: Props) {
  const reduced = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })
  const copyRef = useRef<HTMLSpanElement>(null)
  const [copyWidth, setCopyWidth] = useState(0)
  const direction = useRef(1)

  useLayoutEffect(() => {
    const el = copyRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setCopyWidth(el.offsetWidth))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const x = useTransform(baseX, (v) => (copyWidth ? `${wrap(-copyWidth, 0, v)}px` : '0px'))

  useAnimationFrame((_, delta) => {
    if (reduced) return
    let moveBy = direction.current * -baseVelocity * (delta / 1000)
    const vf = velocityFactor.get()
    if (vf < 0) direction.current = -1
    else if (vf > 0) direction.current = 1
    moveBy += direction.current * moveBy * vf
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="relative overflow-hidden">
      <motion.div style={{ x }} className="flex whitespace-nowrap">
        {Array.from({ length: copies }).map((_, i) => (
          <span key={i} ref={i === 0 ? copyRef : undefined} aria-hidden={i > 0 || undefined} className={cn('shrink-0', className)}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
