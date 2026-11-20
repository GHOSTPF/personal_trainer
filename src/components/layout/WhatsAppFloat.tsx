import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ScrollTrigger, useGSAP } from '@/lib/gsap'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { WhatsAppIcon } from '@/components/ui/BrandIcons'

/** Botão flutuante do WhatsApp — aparece depois do hero. */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false)

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'bottom 60%',
      onEnter: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
    })
  })

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar no WhatsApp"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="fixed bottom-4 right-4 z-40 flex size-14 items-center justify-center rounded-full bg-accent text-bg shadow-[0_10px_30px_rgba(198,255,61,0.3)] md:bottom-6 md:right-6 md:size-16"
        >
          <span aria-hidden className="absolute inset-0 rounded-full bg-accent opacity-60 motion-safe:animate-ping [animation-duration:2.4s]" />
          <WhatsAppIcon className="relative size-7" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
