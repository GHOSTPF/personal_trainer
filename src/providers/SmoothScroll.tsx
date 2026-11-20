import { useRef, type ReactNode } from 'react'
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function ScrollTriggerSync() {
  // lenis.on('scroll', ScrollTrigger.update)
  useLenis(ScrollTrigger.update)
  return null
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const lenisRef = useRef<LenisRef>(null)

  useGSAP(
    () => {
      if (reduced) return
      const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000)
      gsap.ticker.add(update)
      gsap.ticker.lagSmoothing(0)
      return () => gsap.ticker.remove(update)
    },
    { dependencies: [reduced] },
  )

  if (reduced) return <>{children}</>

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.1, anchors: { offset: -16 } }}>
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  )
}
