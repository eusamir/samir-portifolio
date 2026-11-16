'use client'

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { useMediaQuery } from '@/presentation/shared/hooks/useMediaQuery'

interface Preferences {
  /** Visão rápida: mostra só os resumos e desliga as cenas fixas */
  quick: boolean
  /** Menos movimento: desliga animações e cenas fixas */
  reduceMotion: boolean
  /** Cenas fixas desligadas (visão rápida, menos movimento ou tela estreita) */
  isStatic: boolean
  toggleQuick: () => void
  toggleReduceMotion: () => void
}

const PreferencesContext = createContext<Preferences | null>(null)

const read = (key: string) => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}
const write = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value)
  } catch {}
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const systemReduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const narrow = useMediaQuery('(max-width: 760px)')
  const [quick, setQuick] = useState(false)
  const [reduceOverride, setReduceOverride] = useState<boolean | null>(null)

  useEffect(() => {
    setQuick(read('sa-quick') === '1')
    const stored = read('sa-reduce')
    if (stored !== null) setReduceOverride(stored === '1')
  }, [])

  const reduceMotion = reduceOverride ?? systemReduce
  const isStatic = quick || reduceMotion || narrow

  useEffect(() => {
    const html = document.documentElement
    html.classList.toggle('quick', quick)
    html.classList.toggle('reduce', reduceMotion)
    html.classList.toggle('static', isStatic)
  }, [quick, reduceMotion, isStatic])

  const toggleQuick = useCallback(() => {
    setQuick((q) => {
      write('sa-quick', q ? '0' : '1')
      return !q
    })
  }, [])

  const toggleReduceMotion = useCallback(() => {
    setReduceOverride(() => {
      const next = !reduceMotion
      write('sa-reduce', next ? '1' : '0')
      return next
    })
  }, [reduceMotion])

  const value = useMemo(
    () => ({ quick, reduceMotion, isStatic, toggleQuick, toggleReduceMotion }),
    [quick, reduceMotion, isStatic, toggleQuick, toggleReduceMotion],
  )

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences(): Preferences {
  const ctx = useContext(PreferencesContext)
  if (!ctx)
    throw new Error(
      'usePreferences precisa estar dentro de <PreferencesProvider>',
    )
  return ctx
}
