/**
 * Magnet — adaptado de React Bits (reactbits.dev/animations/magnet).
 * Usa springs do Motion (transform only) e desliga no touch / reduced motion.
 */
import { useRef, type ReactNode, type PointerEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

type Props = { children: ReactNode; strength?: number; padding?: number; className?: string }

export function Magnet({ children, strength = 0.35, padding = 40, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const reduced = useReducedMotion()
  const disabled = isMobile || reduced
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 })

  const onMove = (e: PointerEvent) => {
    if (disabled || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ padding, margin: -padding }}
      className={cn('inline-block', className)}
    >
      <motion.div style={{ x: sx, y: sy }}>{children}</motion.div>
    </div>
  )
}
