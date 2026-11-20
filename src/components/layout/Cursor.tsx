import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { FINE_POINTER } from '@/lib/utils'

/** Cursor custom (só desktop com mouse). Cresce sobre links e mostra o texto de [data-cursor]. */
export function Cursor() {
  const fine = useMediaQuery(FINE_POINTER)
  const wide = useMediaQuery('(min-width: 1024px)')
  const reduced = useReducedMotion()
  const enabled = fine && wide && !reduced

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 })
  const [state, setState] = useState<{ hover: boolean; label: string | null }>({ hover: false, label: null })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const over = (e: PointerEvent) => {
      const t = e.target as Element | null
      const labelled = t?.closest<HTMLElement>('[data-cursor]')
      const interactive = t?.closest('a, button, [role="slider"], input, label')
      setState({ hover: !!(labelled || interactive), label: labelled?.dataset.cursor ?? null })
    }
    const leave = () => setVisible(false)

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => {
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.removeEventListener('pointerleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const scale = state.label ? 1 : state.hover ? 0.55 : 0.18

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[90]"
      animate={{ opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent"
        animate={{ scale }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <AnimatePresence>
          {state.label && (
            <motion.span
              key={state.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-mono text-xs font-medium tracking-widest text-bg"
            >
              {state.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
