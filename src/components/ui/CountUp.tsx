/**
 * CountUp — adaptado de React Bits (reactbits.dev/text-animations/count-up).
 * Mola do Motion que conta quando o número entra na tela.
 */
import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'motion/react'

type Props = {
  to: number
  from?: number
  duration?: number
  className?: string
  separator?: string
}

export function CountUp({ to, from = 0, duration = 2, className, separator = '.' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(from)
  const damping = 20 + 40 * (1 / duration)
  const stiffness = 100 * (1 / duration)
  const spring = useSpring(motionValue, { damping, stiffness })
  const inView = useInView(ref, { once: true, margin: '0px' })

  const format = (n: number) =>
    Math.round(n)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, separator)

  useEffect(() => {
    if (ref.current) ref.current.textContent = format(from)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from])

  useEffect(() => {
    if (inView) motionValue.set(to)
  }, [inView, motionValue, to])

  useEffect(
    () =>
      spring.on('change', (v) => {
        if (ref.current) ref.current.textContent = format(v)
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [spring],
  )

  return <span ref={ref} className={className} />
}
