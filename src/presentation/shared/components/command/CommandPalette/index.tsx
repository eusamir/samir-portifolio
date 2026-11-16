'use client'

import { Command } from 'cmdk'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useState } from 'react'

import {
  type SearchAction,
  searchItems,
} from '@/presentation/shared/config/site'
import { usePreferences } from '@/presentation/shared/providers/PreferencesProvider'
import { useSound } from '@/presentation/shared/providers/SoundProvider'
import {
  COPY_EMAIL_EVENT,
  SEARCH_OPEN_EVENT,
} from '@/presentation/shared/components/command/searchEvents'

/** Busca com Ctrl/⌘ K ou "/". Teclado, filtro e acessibilidade vêm do cmdk. */
export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const { toggleQuick, toggleReduceMotion } = usePreferences()
  const { toggle: toggleSound } = useSound()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /INPUT|TEXTAREA|SELECT/.test(
        (document.activeElement as HTMLElement | null)?.tagName ?? '',
      )
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === '/' && !typing) {
        e.preventDefault()
        setOpen(true)
      }
    }
    const onOpen = () => setOpen(true)
    addEventListener('keydown', onKey)
    addEventListener(SEARCH_OPEN_EVENT, onOpen)
    return () => {
      removeEventListener('keydown', onKey)
      removeEventListener(SEARCH_OPEN_EVENT, onOpen)
    }
  }, [])

  const runAction = useCallback(
    (action: SearchAction) => {
      const actions: Record<SearchAction, () => void> = {
        'copy-email': () => dispatchEvent(new Event(COPY_EMAIL_EVENT)),
        'toggle-theme': () =>
          setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
        'toggle-quick': toggleQuick,
        'toggle-motion': toggleReduceMotion,
        'toggle-sound': toggleSound,
      }
      actions[action]()
    },
    [resolvedTheme, setTheme, toggleQuick, toggleReduceMotion, toggleSound],
  )

  const select = (index: number) => {
    const item = searchItems[index]
    if (!item) return
    setOpen(false)
    setTimeout(() => {
      if (item.kind === 'ação') runAction(item.action)
      else if (item.kind === 'link') window.open(item.url, '_blank', 'noopener')
      else
        document
          .querySelector(item.href)
          ?.scrollIntoView({ behavior: 'smooth' })
    }, 60)
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Busca"
      className="cmdk"
      overlayClassName="cmdk-scrim"
    >
      <Command.Input
        placeholder="Para onde vamos? Tente “moura” ou “tema”"
        className="cmdk-input"
      />
      <Command.List className="cmdk-list">
        <Command.Empty className="cmdk-empty">
          <Image src="/images/heads/wow.webp" alt="" width={48} height={67} />
          <span>Nada encontrado. Tente outra palavra.</span>
        </Command.Empty>
        {searchItems.map((item, i) => (
          <Command.Item
            key={`${item.label}-${i}`}
            value={`${item.label} ${item.kind}`}
            onSelect={() => select(i)}
            className="cmdk-item"
          >
            <span>{item.label}</span>
            <span className="k">{item.kind}</span>
          </Command.Item>
        ))}
      </Command.List>
      <p className="cmdk-foot mono">↑ ↓ navegar Enter abrir Esc fechar</p>
    </Command.Dialog>
  )
}
