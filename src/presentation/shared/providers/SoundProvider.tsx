'use client'

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

export type SoundName = 'tear' | 'camera' | 'plane'

const SOUNDS: Record<SoundName, { src: string; volume: number }> = {
  tear: { src: '/audio/paper-tear.mp3', volume: 0.35 },
  camera: { src: '/audio/camera-flash.mp3', volume: 0.4 },
  plane: { src: '/audio/plane-takeoff.mp3', volume: 0.28 },
}
const MUSIC = { src: '/audio/batida-para-portfolio.mp3', volume: 0.07 }

interface SoundContextValue {
  enabled: boolean
  toggle: () => void
  play: (name: SoundName) => void
}

const SoundContext = createContext<SoundContextValue | null>(null)

/**
 * Som opcional (desligado por padrão). A trilha usa o elemento de áudio nativo,
 * iniciado no próprio toque — mais confiável em navegadores mobile. Os efeitos
 * usam Web Audio e são carregados só quando o visitante liga o som.
 */
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const buffers = useRef<Partial<Record<SoundName, AudioBuffer>>>({})
  const music = useRef<HTMLAudioElement | null>(null)
  const enabledRef = useRef(false)

  const load = useCallback(async (key: SoundName, src: string) => {
    const ctx = ctxRef.current
    if (!ctx || buffers.current[key]) return
    try {
      const res = await fetch(src)
      buffers.current[key] = await ctx.decodeAudioData(await res.arrayBuffer())
    } catch {}
  }, [])

  const startMusic = useCallback(() => {
    if (!enabledRef.current) return
    const audio = music.current ?? new Audio(MUSIC.src)
    audio.loop = true
    audio.volume = MUSIC.volume
    music.current = audio
    // `play()` é disparado de forma síncrona no clique para atender ao Safari/iOS.
    audio.play().catch(() => undefined)
  }, [])

  const stopMusic = useCallback(() => {
    const audio = music.current
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
  }, [])

  const toggle = useCallback(() => {
    const next = !enabledRef.current
    enabledRef.current = next
    setEnabled(next)
    if (next) {
      // o AudioContext precisa nascer dentro do clique (política de autoplay)
      ctxRef.current ??= new AudioContext()
      ctxRef.current.resume()
      Promise.all(
        (Object.keys(SOUNDS) as SoundName[]).map((k) => load(k, SOUNDS[k].src)),
      )
      startMusic()
    } else {
      stopMusic()
    }
  }, [load, startMusic, stopMusic])

  const play = useCallback((name: SoundName) => {
    const ctx = ctxRef.current
    const buffer = buffers.current[name]
    if (!enabledRef.current || !ctx || !buffer) return
    const gain = ctx.createGain()
    gain.gain.value = SOUNDS[name].volume
    const src = ctx.createBufferSource()
    src.buffer = buffer
    src.connect(gain).connect(ctx.destination)
    src.start()
  }, [])

  useEffect(() => {
    const onVisibility = () => {
      const ctx = ctxRef.current
      if (!ctx) return
      if (document.hidden) ctx.suspend()
      else if (enabledRef.current) ctx.resume()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      music.current?.pause()
    }
  }, [])

  const value = useMemo(
    () => ({ enabled, toggle, play }),
    [enabled, toggle, play],
  )
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error('useSound precisa estar dentro de <SoundProvider>')
  return ctx
}
