import { useRef } from 'react'
import { motion } from 'motion/react'
import { Award } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { site } from '@/data/site'
import { DESKTOP, MOTION_OK } from '@/lib/utils'
import { Media } from '@/components/ui/Media'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const { about } = site

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ motion: MOTION_OK, desktop: DESKTOP }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean }
        if (!motion) return
        // Revelação por máscara ao entrar
        gsap.from('.about-photo', {
          clipPath: 'inset(15% 15% 15% 15% round 28px)',
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.about-photo', start: 'top 85%' },
        })
        // Parallax (reduzido no mobile)
        const amount = desktop ? 12 : 5
        gsap.fromTo(
          '.about-photo-inner',
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: 'none',
            scrollTrigger: { trigger: '.about-photo', start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    },
    { scope: ref },
  )

  return (
    <section id="sobre" ref={ref} aria-labelledby="sobre-title" className="container-x py-24 md:py-40">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="about-photo relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface lg:sticky lg:top-28">
            <div className="about-photo-inner absolute -inset-y-[14%] inset-x-0">
              <Media src={about.image} alt={about.imageAlt} width={1200} height={1600} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionHeading id="sobre-title" eyebrow={about.eyebrow} title={about.title} className="mb-10 md:mb-12" />

          <ScrollReveal className="text-2xl leading-snug font-medium md:text-4xl md:leading-tight">{about.story}</ScrollReveal>

          <ul className="mt-12 flex flex-wrap gap-2" aria-label="Formações e certificações">
            {about.certifications.map((c, i) => (
              <motion.li
                key={c}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm"
              >
                <Award className="size-4 text-accent" aria-hidden />
                {c}
              </motion.li>
            ))}
          </ul>

          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 border-l-2 border-accent pl-6"
          >
            <p className="h-display text-[clamp(2rem,4.5vw,3.75rem)] text-accent">“{about.quote}”</p>
            <footer className="mt-3 font-mono text-xs tracking-widest text-muted uppercase">— {site.name}</footer>
          </motion.blockquote>
        </div>
      </div>
    </section>
  )
}
