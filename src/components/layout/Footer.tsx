import { useRef } from 'react'
import { Clock, Mail, MapPin } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { navLinks } from '@/data/nav'
import { site } from '@/data/site'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { MOTION_OK } from '@/lib/utils'
import { InstagramIcon, WhatsAppIcon } from '@/components/ui/BrandIcons'

export default function Footer() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from('.footer-name', {
          yPercent: 100,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
        })
      })
    },
    { scope: ref },
  )

  const year = new Date().getFullYear()
  const linkCls = 'text-muted transition-colors hover:text-text'

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line pt-16 md:pt-24">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="h-display text-4xl md:text-5xl">{site.name}</p>
          <p className="mt-3 max-w-sm text-muted">
            Personal trainer · CREF {site.cref}
            <br />
            Presencial em {site.city} – {site.state} e consultoria online.
          </p>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-3">
          <p className="eyebrow mb-4">Navegação</p>
          <ul className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkCls}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="eyebrow mb-4">Contato</p>
          <ul className="space-y-3">
            <li>
              <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className={`${linkCls} inline-flex items-center gap-3`}>
                <WhatsAppIcon className="size-5" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer" className={`${linkCls} inline-flex items-center gap-3`}>
                <InstagramIcon className="size-5" /> @{site.instagram}
              </a>
            </li>
            {site.email && <li>
              <a href={`mailto:${site.email}`} className={`${linkCls} inline-flex items-center gap-3`}>
                <Mail className="size-5" aria-hidden /> {site.email}
              </a>
            </li>}
            <li className="inline-flex items-center gap-3 text-muted">
              <Clock className="size-5" aria-hidden /> {site.hours}
            </li>
            <li className="inline-flex items-center gap-3 text-muted">
              <MapPin className="size-5" aria-hidden /> {site.city} – {site.state}
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x mt-16 flex flex-col gap-2 border-t border-line py-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {site.name} · CREF {site.cref}
        </p>
        <a href={site.credit.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
          {site.credit.label}
        </a>
      </div>

      {/* Nome gigante ocupando a largura toda */}
      <div aria-hidden className="overflow-hidden px-2">
        <svg className="footer-name block w-full" viewBox="0 0 1000 150" preserveAspectRatio="xMidYMax meet">
          <text
            x="0"
            y="147"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fill="var(--color-accent)"
            style={{ fontFamily: 'var(--font-display)', fontSize: 200, textTransform: 'uppercase' }}
          >
            {site.name}
          </text>
        </svg>
      </div>
    </footer>
  )
}
