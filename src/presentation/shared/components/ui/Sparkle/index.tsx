import { cn } from '@/presentation/shared/lib/cn'

export function Sparkle({ className }: { className?: string }) {
  return (
    <svg
      className={cn('spark', className)}
      viewBox="-10 -10 20 20"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 -9 C1 -2 2 -1 9 0 C2 1 1 2 0 9 C-1 2 -2 1 -9 0 C-2 -1 -1 -2 0 -9Z" />
    </svg>
  )
}
