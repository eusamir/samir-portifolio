'use client'

interface ToggleProps {
  pressed: boolean
  onClick: () => void
  label: string
  title: string
}

/** Interruptor em formato de pílula (Visão rápida, Menos movimento). */
export function Toggle({ pressed, onClick, label, title }: ToggleProps) {
  return (
    <button
      className="toggle"
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      title={title}
    >
      <span className="dot" aria-hidden="true" />
      <span>{label}</span>
    </button>
  )
}
