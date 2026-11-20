import { useMediaQuery } from './useMediaQuery'

/** "Mobile" = tela < 1024px ou sem ponteiro fino (touch). */
export function useIsMobile() {
  const narrow = useMediaQuery('(max-width: 1023px)')
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)')
  return narrow || !fine
}
