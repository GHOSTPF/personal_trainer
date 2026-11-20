import { Asterisk } from 'lucide-react'
import { stats } from '@/data/stats'
import { Marquee } from '@/components/ui/Marquee'
import { CountUp } from '@/components/ui/CountUp'

export default function Stats() {
  return (
    <section id="numeros" aria-label="Números" className="border-y border-line py-8 md:py-12">
      {/* Versão acessível (o marquee é decorativo/repetido) */}
      <ul className="sr-only">
        {stats.map((s) => (
          <li key={s.label}>
            {s.prefix}
            {s.value}
            {s.suffix} {s.label}
          </li>
        ))}
      </ul>
      <Marquee aria-hidden duration="45s" gap="3rem" repeat={4}>
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-12">
            <div className="flex items-baseline gap-4">
              <span className="h-display whitespace-nowrap text-[clamp(3.5rem,8vw,7rem)] tabular-nums">
                {s.prefix}
                <CountUp to={s.value} />
                <span className="text-accent">{s.suffix}</span>
              </span>
              <span className="max-w-[9rem] font-mono text-xs leading-snug tracking-wider text-muted uppercase">{s.label}</span>
            </div>
            <Asterisk aria-hidden className="size-10 shrink-0 text-accent-2 motion-safe:animate-spin-slow" />
          </div>
        ))}
      </Marquee>
    </section>
  )
}
