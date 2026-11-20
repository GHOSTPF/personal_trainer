/**
 * CardSpotlight — adaptado de Aceternity UI (ui.aceternity.com/components/card-spotlight)
 * + tilt 3D leve. O spotlight segue o mouse com um radial-gradient (CSS vars),
 * o tilt usa springs do Motion. Ambos desligados no touch / reduced motion.
 */
import { useRef, type ReactNode, type PointerEvent } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

type Props = { children: ReactNode; className?: string; radius?: number; color?: string; tilt?: number }

export function CardSpotlight({ children, className, radius = 320, color = 'rgba(198,255,61,0.16)', tilt = 6 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const reduced = useReducedMotion()
  const disabled = isMobile || reduced
  const mx = useMotionValue(-999)
  const my = useMotionValue(-999)
  const rx = useSpring(0, { stiffness: 150, damping: 18 })
  const ry = useSpring(0, { stiffness: 150, damping: 18 })
  const bg = useMotionTemplate`radial-gradient(${radius}px circle at ${mx}px ${my}px, ${color}, transparent 80%)`

  const onMove = (e: PointerEvent) => {
    if (disabled || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    mx.set(x)
    my.set(y)
    ry.set((x / r.width - 0.5) * tilt)
    rx.set(-(y / r.height - 0.5) * tilt)
  }
  const onLeave = () => {
    mx.set(-999)
    my.set(-999)
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={cn('group relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface', className)}
    >
      {children}
      {!disabled && (
        <motion.div aria-hidden style={{ background: bg }} className="pointer-events-none absolute inset-0 z-10" />
      )}
    </motion.div>
  )
}
