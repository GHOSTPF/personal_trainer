import { useState, type ImgHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string
  alt: string
  /** Hero: carrega com prioridade */
  priority?: boolean
  wrapperClassName?: string
}

/**
 * Imagem real de public/images. Enquanto o arquivo não existir, mostra um
 * bloco cinza com o nome do arquivo esperado no centro.
 */
export function Media({ src, alt, priority, className, wrapperClassName, width = 1200, height = 1500, ...rest }: Props) {
  const [failed, setFailed] = useState(false)
  const file = src.split('/').slice(-2).join('/')

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          'flex h-full w-full items-center justify-center bg-[#1c1c1c] p-4 text-center font-mono text-xs text-muted',
          wrapperClassName,
          className,
        )}
      >
        <span className="rounded-full border border-line bg-bg/60 px-3 py-1">{file}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
      className={cn('h-full w-full object-cover', className)}
      {...rest}
    />
  )
}
