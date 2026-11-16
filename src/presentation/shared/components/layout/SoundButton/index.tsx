'use client'

import { SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react'

import { useSound } from '@/presentation/shared/providers/SoundProvider'

/** Liga e desliga a trilha e os efeitos. Com `label`, mostra o texto ao lado do ícone. */
export function SoundButton({ label = false }: { label?: boolean }) {
  const { enabled, toggle } = useSound()
  const Icon = enabled ? SpeakerHigh : SpeakerSlash

  return (
    <button
      className={label ? 'toggle' : 'toggle icon-btn'}
      type="button"
      aria-pressed={enabled}
      aria-label={label ? undefined : enabled ? 'Desligar som' : 'Ligar som'}
      title="Som: trilha e efeitos"
      onClick={toggle}
    >
      <Icon size={18} aria-hidden="true" />
      {label && <span>{enabled ? 'Som ligado' : 'Som desligado'}</span>}
    </button>
  )
}
