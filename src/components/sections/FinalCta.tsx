import { lazy, Suspense } from 'react'
import { site } from '@/data/site'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ScrollVelocity } from '@/components/ui/ScrollVelocity'
import { Magnet } from '@/components/ui/Magnet'
import { CtaLink } from '@/components/ui/CtaLink'
import { WhatsAppIcon } from '@/components/ui/BrandIcons'

const Aurora = lazy(() => import('@/components/ui/Aurora'))

export default function FinalCta() {
  const isMobile = useIsMobile()
  const reduced = useReducedMotion()
  const { finalCta } = site

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden border-t border-line py-24"
    >
      {/* Fundo: Aurora (WebGL) só no desktop sem reduced motion; gradiente estático no resto */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40">
        {!isMobile && !reduced ? (
          <Suspense fallback={null}>
            <Aurora className="h-full w-full" />
          </Suspense>
        ) : (
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_50%_0%,rgba(198,255,61,0.35),transparent_60%)]" />
        )}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />

      <h2 id="contato-title" className="sr-only">
        {finalCta.title}
      </h2>
      <div aria-hidden className="relative">
        <ScrollVelocity baseVelocity={50} className="h-display pr-[0.3em] text-[clamp(5rem,18vw,17rem)]">
          {finalCta.title} <span className="text-accent">✦</span>
        </ScrollVelocity>
        <ScrollVelocity baseVelocity={-50} className="h-display text-outline pr-[0.3em] text-[clamp(5rem,18vw,17rem)]">
          {finalCta.title} <span>✦</span>
        </ScrollVelocity>
      </div>

      <div className="container-x relative mt-12 flex flex-col items-center text-center">
        <p className="max-w-xl text-lg text-muted md:text-xl">{finalCta.text}</p>
        <div className="mt-10">
          <Magnet strength={0.4} padding={60}>
            <CtaLink href={buildWhatsAppLink()} external size="lg" icon={false}>
              <WhatsAppIcon className="size-6" />
              {finalCta.button}
            </CtaLink>
          </Magnet>
        </div>
      </div>
    </section>
  )
}
