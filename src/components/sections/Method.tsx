import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { methodIntro, methodSteps } from '@/data/method'
import { DESKTOP, MOTION_OK } from '@/lib/utils'

/**
 * Seção pinada: no desktop vira scroll horizontal (pin + scrub).
 * No mobile / reduced motion é uma lista vertical simples.
 */
export default function Method() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const track = ref.current!.querySelector<HTMLElement>('.method-track')!

      mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
        const distance = () => track.scrollWidth - window.innerWidth
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.method-pin',
              start: 'top top',
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .to(track, { x: () => -distance(), ease: 'none' }, 0)
          .fromTo('.method-progress', { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0)
      })

      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        gsap.fromTo(
          '.method-progress',
          { scaleX: 0 },
          { scaleX: 1, ease: 'none', scrollTrigger: { trigger: track, start: 'top 70%', end: 'bottom 70%', scrub: true } },
        )
        gsap.utils.toArray<HTMLElement>('.method-card').forEach((card) => {
          gsap.from(card, { opacity: 0, y: 40, duration: 0.8, scrollTrigger: { trigger: card, start: 'top 85%' } })
        })
      })
    },
    { scope: ref },
  )

  return (
    <section id="metodo" ref={ref} aria-labelledby="metodo-title" className="relative">
      <div className="method-pin flex flex-col justify-center overflow-hidden py-24 lg:h-[100svh] lg:pb-6 lg:pt-24">
        <div className="container-x mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="inline-block size-1.5 rounded-full bg-accent" />
              {methodIntro.eyebrow}
            </p>
            <h2 id="metodo-title" className="h-display text-[clamp(3rem,min(8vw,13svh),7.5rem)]">
              {methodIntro.title}
            </h2>
          </div>
          <div className="sticky top-20 z-10 w-full lg:static lg:w-80" aria-hidden>
            <div className="h-1 w-full overflow-hidden rounded-full bg-line">
              <div className="method-progress h-full w-full origin-left bg-accent" />
            </div>
          </div>
        </div>

        <ol className="method-track container-x flex flex-col gap-4 lg:w-max lg:max-w-none lg:flex-row lg:gap-6 lg:pr-[10vw]">
          {methodSteps.map((step, i) => {
            const Icon = step.icon
            return (
              <li
                key={step.title}
                className="method-card relative flex flex-col justify-between overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface p-6 md:p-10 lg:h-[52svh] lg:w-[min(42vw,640px)]"
              >
                <span aria-hidden className="h-display text-outline pointer-events-none absolute -right-2 -top-4 text-[clamp(8rem,16vw,15rem)] leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex size-14 items-center justify-center rounded-2xl bg-accent text-bg">
                  <Icon className="size-7" aria-hidden />
                </div>
                <div className="relative mt-16 lg:mt-0">
                  <p className="mb-3 font-mono text-xs tracking-widest text-accent uppercase">
                    Etapa {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="h-display text-[clamp(2rem,2.6vw,2.75rem)]">{step.title}</h3>
                  <p className="mt-4 max-w-md text-muted md:text-lg">{step.text}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
