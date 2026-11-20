import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

/** Barra de progresso de leitura no topo (2px, verde-volt). */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.to(ref.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    })
  })

  return <div ref={ref} aria-hidden className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left scale-x-0 bg-accent" />
}
