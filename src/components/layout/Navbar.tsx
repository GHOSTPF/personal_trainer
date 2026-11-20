/**
 * Navbar — adaptada do "Resizable Navbar" de Aceternity UI
 * (ui.aceternity.com/components/resizable-navbar). Larga e transparente no topo;
 * ao rolar vira pílula flutuante com blur. A troca de tamanho usa `layout`
 * do Motion (FLIP via transform).
 */
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useLenis } from 'lenis/react'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/data/nav'
import { site } from '@/data/site'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

const spring = { type: 'spring', stiffness: 220, damping: 30 } as const

export function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const lenis = useLenis()
  const closeRef = useRef<HTMLButtonElement>(null)
  const menuBtnRef = useRef<HTMLButtonElement>(null)

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 80))

  const wasOpen = useRef(false)

  useEffect(() => {
    if (open) {
      wasOpen.current = true
      lenis?.stop()
      document.documentElement.style.overflow = 'hidden'
      closeRef.current?.focus()
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }
    if (wasOpen.current) {
      wasOpen.current = false
      lenis?.start()
      document.documentElement.style.overflow = ''
    }
  }, [open, lenis])

  const goTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    menuBtnRef.current?.focus({ preventScroll: true })
    requestAnimationFrame(() => {
      if (lenis) {
        lenis.start()
        lenis.scrollTo(href, { offset: -16 })
      } else document.querySelector(href)?.scrollIntoView()
    })
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-4 md:pt-4">
        <motion.nav
          layout
          transition={spring}
          aria-label="Principal"
          style={{ borderRadius: 999 }}
          className={cn(
            'mx-auto flex items-center justify-between gap-4 border transition-colors duration-500',
            scrolled
              ? 'max-w-4xl border-line bg-surface/70 py-2 pl-5 pr-2 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl'
              : 'max-w-[1440px] border-transparent bg-transparent px-2 py-2 md:px-6',
          )}
        >
          <motion.a layout="position" transition={spring} href="#top" className="h-display shrink-0 text-xl tracking-wide md:text-2xl">
            {site.name}
          </motion.a>

          <motion.ul layout="position" transition={spring} className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-text"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>

          <motion.div layout="position" transition={spring} className="flex items-center gap-2">
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 items-center whitespace-nowrap rounded-full bg-accent px-5 text-sm font-semibold text-bg transition-colors hover:bg-text sm:inline-flex"
            >
              Agendar avaliação
            </a>
            <button
              ref={menuBtnRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex size-10 items-center justify-center rounded-full border border-line lg:hidden"
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </motion.div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[70] flex flex-col bg-bg px-4 pb-8 pt-4"
          >
            <div className="flex items-center justify-between">
              <span className="h-display text-xl">{site.name}</span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="flex size-10 items-center justify-center rounded-full border border-line"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <ul className="mt-auto flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    onClick={(e) => goTo(e, l.href)}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="h-display block text-[clamp(3rem,15vw,6rem)] transition-colors active:text-accent"
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex h-14 items-center justify-center rounded-full bg-accent font-semibold text-bg"
            >
              Agendar avaliação
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
