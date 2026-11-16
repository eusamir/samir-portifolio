'use client'

import { Moon, Sun } from '@phosphor-icons/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

/** Alterna entre tema claro e escuro. Com `label`, mostra o texto ao lado do ícone. */
export function ThemeButton({ label = false }: { label?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const dark = mounted && resolvedTheme === 'dark'
  const Icon = dark ? Moon : Sun
  const next = dark ? 'claro' : 'escuro'

  return (
    <button
      className={label ? 'toggle' : 'toggle icon-btn'}
      type="button"
      aria-label={label ? undefined : `Mudar para o tema ${next}`}
      title={`Tema ${next}`}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
    >
      <Icon size={18} aria-hidden="true" />
      {label && <span>Tema {dark ? 'escuro' : 'claro'}</span>}
    </button>
  )
}
