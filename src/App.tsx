import { lazy, Suspense, useEffect, useState } from 'react'
import { ScrollTrigger, useGSAP } from '@/lib/gsap'
import { SmoothScroll } from '@/providers/SmoothScroll'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Preloader } from '@/components/layout/Preloader'
import { Navbar } from '@/components/layout/Navbar'
import { Cursor } from '@/components/layout/Cursor'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { Hero } from '@/components/sections/Hero'

// Seções abaixo da dobra — carregadas sob demanda
const Stats = lazy(() => import('@/components/sections/Stats'))
const About = lazy(() => import('@/components/sections/About'))
const Method = lazy(() => import('@/components/sections/Method'))
const Services = lazy(() => import('@/components/sections/Services'))
const Plans = lazy(() => import('@/components/sections/Plans'))
const Results = lazy(() => import('@/components/sections/Results'))
const Quiz = lazy(() => import('@/components/sections/Quiz'))
const Testimonials = lazy(() => import('@/components/sections/Testimonials'))
const Instagram = lazy(() => import('@/components/sections/Instagram'))
const Faq = lazy(() => import('@/components/sections/Faq'))
const FinalCta = lazy(() => import('@/components/sections/FinalCta'))
const Footer = lazy(() => import('@/components/layout/Footer'))

const PRELOADER_KEY = 'pt-preloader-seen'

function shouldShowPreloader() {
  try {
    return !window.sessionStorage.getItem(PRELOADER_KEY)
  } catch {
    return true
  }
}

/** Recalcula todos os ScrollTriggers depois que as seções lazy montam e as fontes carregam. */
function RefreshScrollTriggers() {
  useGSAP(() => {
    ScrollTrigger.sort()
    ScrollTrigger.refresh()
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  })
  return null
}

export default function App() {
  const reduced = useReducedMotion()
  const [showPreloader] = useState(() => !reduced && shouldShowPreloader())
  const [ready, setReady] = useState(!showPreloader)

  useEffect(() => {
    if (!ready) return
    try {
      window.sessionStorage.setItem(PRELOADER_KEY, '1')
    } catch {
      /* storage indisponível */
    }
  }, [ready])

  return (
    <SmoothScroll>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
      >
        Pular para o conteúdo
      </a>

      {showPreloader && !ready && <Preloader onDone={() => setReady(true)} />}
      <ScrollProgress />
      <Cursor />
      <Navbar />

      <main id="conteudo">
        <div id="top" />
        <Hero ready={ready} />
        <Suspense fallback={<div className="min-h-screen" />}>
          <Stats />
          <About />
          <Method />
          <Services />
          <Plans />
          <Results />
          <Quiz />
          <Testimonials />
          <Instagram />
          <Faq />
          <FinalCta />
          <Footer />
          <RefreshScrollTriggers />
        </Suspense>
      </main>

      <WhatsAppFloat />
    </SmoothScroll>
  )
}
