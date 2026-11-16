'use client'

import { usePreferences } from '@/presentation/shared/providers/PreferencesProvider'

import { SearchButton } from '../SearchButton'
import { SoundButton } from '../SoundButton'
import { ThemeButton } from '../ThemeButton'
import { Toggle } from '../Toggle'

/** Controles do cabeçalho no desktop. No celular, eles vão para o MobileMenu. */
export function HeaderControls() {
  const { quick, reduceMotion, toggleQuick, toggleReduceMotion } =
    usePreferences()

  return (
    <div className="toggles desktop-controls">
      <Toggle
        pressed={quick}
        onClick={toggleQuick}
        label="Visão rápida"
        title="Mostra só o resumo de cada caso"
      />
      <Toggle
        pressed={reduceMotion}
        onClick={toggleReduceMotion}
        label="Menos movimento"
        title="Desliga animações e cenas fixas"
      />
      <SearchButton />
      <SoundButton />
      <ThemeButton />
    </div>
  )
}
