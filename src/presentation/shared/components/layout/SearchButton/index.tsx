'use client'

import { MagnifyingGlass } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

import { openSearch } from '@/presentation/shared/components/command/searchEvents'

/** Abre a busca; mostra o atalho do sistema (⌘ K no Mac, Ctrl K nos demais). */
export function SearchButton({
  showShortcut = true,
}: {
  showShortcut?: boolean
}) {
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.userAgent))
  }, [])

  return (
    <button
      className="toggle kbd-btn"
      type="button"
      aria-haspopup="dialog"
      aria-label="Abrir busca"
      title="Buscar no portfólio"
      onClick={openSearch}
    >
      <MagnifyingGlass size={16} aria-hidden="true" />
      {showShortcut && (
        <span className="mono kbd">{isMac ? '⌘ K' : 'Ctrl K'}</span>
      )}
    </button>
  )
}
