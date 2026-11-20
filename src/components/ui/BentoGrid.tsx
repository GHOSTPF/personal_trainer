/**
 * BentoGrid — adaptado de Magic UI (magicui.design/docs/components/bento-grid).
 */
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export function BentoGrid({ className, children, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn('grid w-full auto-rows-[18rem] grid-cols-1 gap-4 md:grid-cols-2 lg:auto-rows-[20rem] lg:grid-cols-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export const bentoSize = {
  large: 'md:col-span-2 lg:col-span-2 lg:row-span-2',
  tall: 'lg:row-span-2',
  wide: 'md:col-span-2 lg:col-span-2',
  small: '',
} as const
