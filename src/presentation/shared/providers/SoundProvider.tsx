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
 * Som opcional (desligado por padrão). Usa Web Audio: os arquivos só são baixados
 * quando o visitante liga o som, e a trilha toca em loop, bem baixa, com fade.
 */
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const buffers = useRef<Partial<Record<SoundName | 'music', AudioBuffer>>>({})
  const music = useRef<{ src: AudioBufferSourceNode; gain: GainNode } | null>(
    null,
  )
  const enabledRef = useRef(false)

  const load = useCallback(async (key: SoundName | 'music', src: string) => {
    const ctx = ctxRef.current
    if (!ctx || buffers.current[key]) return
    try {
      const res = await fetch(src)
      buffers.current[key] = await ctx.decodeAudioData(await res.arrayBuffer())
    } catch {}
  }, [])

  const startMusic = useCallback(() => {
    const ctx = ctxRef.current
    const buffer = buffers.current.music
    if (!ctx || !buffer || music.current || !enabledRef.current) return
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(MUSIC.volume, ctx.currentTime + 2)
    const src = ctx.createBufferSource()
    src.buffer = buffer
    src.loop = true
    src.connect(gain).connect(ctx.destination)
    src.start()
    music.current = { src, gain }
  }, [])

  const stopMusic = useCallback(() => {
    const ctx = ctxRef.current
    const m = music.current
    if (!ctx || !m) return
    music.current = null
    m.gain.gain.cancelScheduledValues(ctx.currentTime)
    m.gain.gain.setValueAtTime(m.gain.gain.value, ctx.currentTime)
    m.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6)
    setTimeout(() => m.src.stop(), 700)
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
      load('music', MUSIC.src).then(startMusic)
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
    return () => document.removeEventListener('visibilitychange', onVisibility)
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
