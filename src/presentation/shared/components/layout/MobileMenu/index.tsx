'use client'

import { List, X } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'

import { siteConfig } from '@/presentation/shared/config/site'
import { usePreferences } from '@/presentation/shared/providers/PreferencesProvider'
import { useSmoothScroll } from '@/presentation/shared/providers/SmoothScrollProvider'

import { SoundButton } from '../SoundButton'
import { ThemeButton } from '../ThemeButton'
import { Toggle } from '../Toggle'

/**
 * Menu do celular: botão no cabeçalho e um painel lateral com as seções e os
 * controles (visão rápida, menos movimento, som e tema). Fecha com Esc, com
 * clique fora ou ao escolher uma seção; o foco volta para o botão.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const trigger = useRef<HTMLButtonElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)
  const { quick, reduceMotion, toggleQuick, toggleReduceMotion } =
    usePreferences()
  const { lock, unlock } = useSmoothScroll()

  const close = useCallback(() => {
    setOpen(false)
    trigger.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return
    lock()
    firstLink.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    addEventListener('keydown', onKey)
    return () => {
      unlock()
      removeEventListener('keydown', onKey)
    }
  }, [open, lock, unlock, close])

  const goTo = (href: string) => {
    setOpen(false)
    requestAnimationFrame(() =>
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }),
    )
  }

  return (
    <>
      <button
        ref={trigger}
        className="toggle icon-btn menu-btn"
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          <X size={20} aria-hidden="true" />
        ) : (
          <List size={20} aria-hidden="true" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="menu-scrim"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              id={panelId}
              className="menu-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              data-lenis-prevent
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 38 }}
            >
              <nav aria-label="Seções">
                <ul className="menu-links">
                  {siteConfig.nav.map((item, i) => (
                    <li key={item.href}>
                      <a
                        ref={i === 0 ? firstLink : undefined}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          goTo(item.href)
                        }}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="menu-settings">
                <p className="mono menu-label">Preferências</p>
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
                <SoundButton label />
                <ThemeButton label />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
