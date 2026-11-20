import { useEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'
import { gsap, useGSAP } from '@/lib/gsap'

/** Contador 0→100 + barra; depois a tela "abre" (clip-path). Total ≈ 1.75s. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const lenis = useLenis()
  const lenisRef = useRef(lenis)
  lenisRef.current = lenis
  const done = useRef(false)

  // trava o scroll enquanto carrega (o Lenis pode inicializar depois do primeiro render)
  useEffect(() => {
    if (!done.current) lenis?.stop()
  }, [lenis])

  useGSAP(
    () => {
      const counter = { v: 0 }
      gsap
        .timeline({
          onComplete: () => {
            done.current = true
            lenisRef.current?.start()
            onDone()
          },
        })
        .to(counter, {
          v: 100,
          duration: 1.15,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (countRef.current) countRef.current.textContent = String(Math.round(counter.v))
          },
        })
        .to('.pl-bar', { scaleX: 1, duration: 1.15, ease: 'power2.inOut' }, 0)
        .to('.pl-inner', { yPercent: -30, opacity: 0, duration: 0.45, ease: 'power3.in' }, '+=0.05')
        .to(ref.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.6, ease: 'expo.inOut' }, '-=0.25')
    },
    { scope: ref },
  )

  return (
    <div
      ref={ref}
      role="status"
      aria-label="Carregando"
      className="fixed inset-0 z-[100] flex flex-col justify-end bg-bg p-4 md:p-10"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      <div className="pl-inner">
        <div className="h-display flex items-end leading-none text-text">
          <span ref={countRef} className="tabular-nums text-[clamp(7rem,28vw,22rem)]">
            0
          </span>
          <span className="mb-[0.15em] text-[clamp(2.5rem,8vw,6rem)] text-accent">%</span>
        </div>
        <div className="mt-4 h-[3px] w-full overflow-hidden bg-line">
          <div className="pl-bar h-full w-full origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </div>
  )
}
