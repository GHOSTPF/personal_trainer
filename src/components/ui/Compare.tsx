/**
 * Compare (antes/depois) — adaptado de Aceternity UI (ui.aceternity.com/components/compare).
 * Arrastável com mouse/toque (pointer events) e operável por teclado (role="slider").
 * Revelação com clip-path; handle movido com transform.
 */
import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { Media } from './Media'

type Props = { before: string; after: string; beforeAlt: string; afterAlt: string; label: string }

export function Compare({ before, after, beforeAlt, afterAlt, label }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const [pos, setPos] = useState(50)

  const setFromClientX = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    setFromClientX(e.clientX)
  }
  const onMove = (e: PointerEvent) => dragging.current && setFromClientX(e.clientX)
  const onUp = () => (dragging.current = false)

  const onKey = (e: KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 5
    const map: Record<string, number> = {
      ArrowLeft: pos - step,
      ArrowDown: pos - step,
      ArrowRight: pos + step,
      ArrowUp: pos + step,
      Home: 0,
      End: 100,
    }
    if (e.key in map) {
      e.preventDefault()
      setPos(Math.min(100, Math.max(0, map[e.key])))
    }
  }

  return (
    <div
      ref={ref}
      data-cursor="ARRASTE"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      className="relative aspect-[4/5] w-full select-none overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface touch-pan-y"
    >
      {/* Depois (fundo) */}
      <div className="absolute inset-0">
        <Media src={after} alt={afterAlt} draggable={false} />
      </div>
      {/* Antes (por cima, recortado) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Media src={before} alt={beforeAlt} draggable={false} />
      </div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-bg/70 px-3 py-1 font-mono text-[11px] tracking-widest backdrop-blur">
        ANTES
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-accent px-3 py-1 font-mono text-[11px] tracking-widest text-bg">
        DEPOIS
      </span>

      {/* Handle */}
      <div className="pointer-events-none absolute inset-0" style={{ transform: `translateX(${pos}%)` }}>
        <div className="absolute inset-y-0 left-0 w-0.5 -translate-x-1/2 bg-accent" />
        <button
          type="button"
          role="slider"
          aria-label={`Comparar antes e depois — ${label}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% antes`}
          onKeyDown={onKey}
          className="pointer-events-auto absolute left-0 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-bg shadow-[0_0_0_6px_rgba(198,255,61,0.2)]"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
