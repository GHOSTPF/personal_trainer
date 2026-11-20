import { motion } from 'motion/react'
import { instagramPhotos } from '@/data/testimonials'
import { site } from '@/data/site'
import { InstagramIcon } from '@/components/ui/BrandIcons'
import { CtaLink } from '@/components/ui/CtaLink'
import { Media } from '@/components/ui/Media'
import { SectionHeading } from '@/components/ui/SectionHeading'

export default function Instagram() {
  const profile = `https://instagram.com/${site.instagram}`

  return (
    <section id="instagram" aria-labelledby="instagram-title" className="container-x py-24 md:py-32">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="instagram-title"
          eyebrow="Instagram"
          title={`@${site.instagram}`}
          titleClassName="text-[clamp(2.25rem,7vw,6.5rem)] break-words"
          className="mb-0 min-w-0 md:mb-0"
        />
        <CtaLink href={profile} external variant="ghost" className="shrink-0 self-start whitespace-nowrap lg:self-auto">
          Seguir @{site.instagram}
        </CtaLink>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-3 md:gap-4">
        {instagramPhotos.map((p, i) => (
          <motion.li
            key={p.src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.a
              href={profile}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="VER"
              initial="rest"
              whileHover="hover"
              whileFocus="hover"
              aria-label={`${p.alt} — abrir Instagram`}
              className="relative block aspect-square overflow-hidden rounded-2xl border border-line bg-surface md:rounded-3xl"
            >
              <motion.div variants={{ rest: { scale: 1 }, hover: { scale: 1.07 } }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="h-full w-full">
                <Media src={p.src} alt={p.alt} width={800} height={800} />
              </motion.div>
              <motion.div
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                className="absolute inset-0 flex items-center justify-center bg-bg/50"
              >
                <InstagramIcon className="size-9 text-accent" />
              </motion.div>
            </motion.a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
