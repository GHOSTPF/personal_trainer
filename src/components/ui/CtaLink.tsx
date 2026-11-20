import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'ghost'
  size?: 'md' | 'lg'
  children: ReactNode
  external?: boolean
  icon?: boolean
}

export function CtaLink({ variant = 'primary', size = 'md', external, icon = true, className, children, ...rest }: Props) {
  return (
    <a
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
      className={cn(
        'group/cta inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-300',
        size === 'md' ? 'h-12 px-6 text-sm' : 'h-16 px-8 text-base md:h-20 md:px-12 md:text-lg',
        variant === 'primary'
          ? 'bg-accent text-bg hover:bg-text'
          : 'border border-line text-text hover:border-text',
        className,
      )}
    >
      {children}
      {icon && (
        <ArrowUpRight
          aria-hidden
          className="size-[1.1em] transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
        />
      )}
    </a>
  )
}
