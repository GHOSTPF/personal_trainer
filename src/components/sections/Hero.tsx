import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import { site } from '@/data/site'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { MOTION_OK } from '@/lib/utils'
import { Media } from '@/components/ui/Media'
import { CtaLink } from '@/components/ui/CtaLink'
import { Magnet } from '@/components/ui/Magnet'

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { hero } = site

  useGSAP(
    () => {
      if (!ready) return
      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        // Título revelado por letra, com máscara por linha
        SplitText.create('.hero-title', {
          type: 'lines,chars',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.chars, { yPercent: 115, duration: 1.1, ease: 'expo.out', stagger: 0.035 }),
        })
        gsap.from('.hero-fade', { opacity: 0, y: 24, duration: 0.9, stagger: 0.08, delay: 0.35 })
        gsap.from('.hero-media-wrap', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.2, ease: 'expo.out', delay: 0.1 })

        // Zoom-out suave da foto/vídeo no scroll
        gsap.fromTo(
          '.hero-media',
          { scale: 1.18 },
          { scale: 1, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } },
        )
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.from('.hero-title, .hero-fade, .hero-media-wrap', { opacity: 0, duration: 0.6, ease: 'power1.out' })
      })
    },
    { scope: ref, dependencies: [ready] },
  )

  return (
    <section
      id="hero"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col justify-end pb-10 pt-28 md:pb-14 lg:pt-32"
      style={{ visibility: ready ? 'visible' : 'hidden' }}
    >
      <div className="container-x grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="hero-fade mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2 font-mono text-[11px] tracking-widest text-muted uppercase">
            <span className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-accent motion-safe:animate-ping" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            CREF {site.cref} · +{site.students} alunos · Presencial & online
          </p>

          <h1 id="hero-title" className="hero-title h-display whitespace-nowrap text-[clamp(3.75rem,min(13vw,17svh),13rem)]">
            {hero.lines.map((line, i) => (
              <span key={line} className={i === hero.lines.length - 1 ? 'block text-accent' : 'block'}>
                {line}
              </span>
            ))}
          </h1>

          <p className="hero-fade mt-6 max-w-xl text-base text-muted md:text-lg">{hero.subtitle}</p>

          <div className="hero-fade mt-8 flex flex-wrap items-center gap-3">
            <Magnet>
              <CtaLink href={buildWhatsAppLink()} external>
                {hero.primaryCta}
              </CtaLink>
            </Magnet>
            <CtaLink href="#resultados" variant="ghost" icon={false}>
              {hero.secondaryCta}
            </CtaLink>
          </div>
        </div>

        <div className="hero-media-wrap relative aspect-[4/5] max-h-[78svh] w-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface lg:col-span-5">
          <div className="hero-media h-full w-full will-change-transform">
            {hero.video ? (
              <video
                className="h-full w-full object-cover"
                src={hero.video}
                poster={hero.videoPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={hero.imageAlt}
              />
            ) : (
              <Media src={hero.image} alt={hero.imageAlt} priority width={1200} height={1500} />
            )}
          </div>
        </div>
      </div>

      <a
        href="#numeros"
        className="hero-fade container-x mt-10 hidden items-center gap-3 font-mono text-[11px] tracking-widest text-muted uppercase md:flex"
      >
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-accent motion-safe:animate-scrollcue" />
        </span>
        Role para baixo
      </a>
    </section>
  )
}
