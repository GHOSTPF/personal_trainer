/**
 * ScrollReveal — adaptado de React Bits (reactbits.dev/text-animations/scroll-reveal).
 * As palavras "acendem" (opacidade) conforme o scroll, via GSAP scrub.
 */
import { useMemo, useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MOTION_OK, cn } from '@/lib/utils'

type Props = { children: string; className?: string; baseOpacity?: number }

export function ScrollReveal({ children, className, baseOpacity = 0.15 }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)
  const words = useMemo(() => children.split(/(\s+)/), [children])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          '.sr-word',
          { opacity: baseOpacity },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.05,
            scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'bottom 45%', scrub: true },
          },
        )
      })
    },
    { scope: ref },
  )

  return (
    <p ref={ref} className={cn(className)}>
      {words.map((w, i) =>
        /^\s+$/.test(w) ? (
          w
        ) : (
          <span key={i} className="sr-word inline-block">
            {w}
          </span>
        ),
      )}
    </p>
  )
}
