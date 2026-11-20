import { Star } from 'lucide-react'
import { testimonials, testimonialsIntro, type Testimonial } from '@/data/testimonials'
import { Marquee } from '@/components/ui/Marquee'
import { Media } from '@/components/ui/Media'
import { SectionHeading } from '@/components/ui/SectionHeading'

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex w-[300px] shrink-0 flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 md:w-[380px] md:p-7">
      <div className="flex gap-1 text-accent" aria-label="5 de 5 estrelas" role="img">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-4 fill-current" aria-hidden />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-base leading-relaxed md:text-lg">“{t.text}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <div className="size-11 shrink-0 overflow-hidden rounded-full border border-line">
          <Media src={t.avatar} alt={`Foto de ${t.name}`} width={88} height={88} className="text-[0px]" />
        </div>
        <div>
          <p className="font-semibold">{t.name}</p>
          <p className="text-sm text-muted">{t.time}</p>
        </div>
      </figcaption>
    </figure>
  )
}

export default function Testimonials() {
  const half = Math.ceil(testimonials.length / 2)
  const rowA = testimonials.slice(0, half)
  const rowB = testimonials.slice(half)

  return (
    <section id="depoimentos" aria-labelledby="depoimentos-title" className="py-24 md:py-40">
      <div className="container-x">
        <SectionHeading id="depoimentos-title" eyebrow={testimonialsIntro.eyebrow} title={testimonialsIntro.title} />
      </div>

      {/* Lista acessível única; os marquees são visuais */}
      <ul className="sr-only">
        {testimonials.map((t) => (
          <li key={t.name}>
            {t.name}, {t.time}: {t.text}
          </li>
        ))}
      </ul>

      <div aria-hidden className="relative flex flex-col gap-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <Marquee pauseOnHover duration="60s" gap="1rem" repeat={3}>
          {rowA.map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </Marquee>
        <Marquee pauseOnHover reverse duration="60s" gap="1rem" repeat={3}>
          {(rowB.length ? rowB : rowA).map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
