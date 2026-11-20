import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const DESKTOP = '(min-width: 1024px)'
export const FINE_POINTER = '(hover: hover) and (pointer: fine)'
