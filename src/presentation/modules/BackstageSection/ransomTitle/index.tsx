import type { CSSProperties } from 'react'

const STYLES = [
  {
    bg: '#141414',
    fg: '#F5F2FF',
    ff: 'var(--font-sans)',
    fw: 800,
    fs: 'normal',
    w: 125,
  },
  {
    bg: '#F4F1EA',
    fg: '#141414',
    ff: 'Georgia, serif',
    fw: 700,
    fs: 'italic',
    w: 100,
  },
  {
    bg: '#7C4DFF',
    fg: '#fff',
    ff: 'var(--font-mono)',
    fw: 600,
    fs: 'normal',
    w: 100,
  },
  {
    bg: '#FFB547',
    fg: '#141414',
    ff: 'var(--font-sans)',
    fw: 900,
    fs: 'normal',
    w: 70,
  },
  {
    bg: '#FFFFFF',
    fg: '#141414',
    ff: "'Times New Roman', serif",
    fw: 700,
    fs: 'normal',
    w: 100,
  },
  {
    bg: '#CDBDFF',
    fg: '#17121F',
    ff: 'var(--font-sans)',
    fw: 300,
    fs: 'normal',
    w: 112,
  },
  {
    bg: 'transparent',
    fg: 'currentColor',
    ff: 'var(--font-sans)',
    fw: 800,
    fs: 'normal',
    w: 118,
  },
] as const

/**
 * Título em letras recortadas de revista. Componente de servidor: o sorteio é determinístico,
 * então o HTML sai pronto e nenhum JavaScript vai para o navegador.
 */
export function RansomTitle({
  id,
  children,
}: {
  id: string
  children: string
}) {
  let k = 7
  return (
    <h2 id={id} className="ransom" aria-label={children}>
      {children.split(' ').map((word, wi) => (
        <span key={wi} className="rw" aria-hidden="true">
          {[...word].map((ch, ci) => {
            k = (k * 31 + 17) % 101
            const st = STYLES[k % STYLES.length]!
            const style = {
              background: st.bg,
              color: st.fg,
              fontFamily: st.ff,
              fontWeight: st.fw,
              fontStyle: st.fs,
              fontVariationSettings: `"wdth" ${st.w}`,
              fontSize: `${(0.86 + (k % 4) * 0.08).toFixed(2)}em`,
              '--lr': `${((k % 9) - 4) * 1.4}deg`,
              '--ly': `${((k % 5) - 2) * 0.03}em`,
            } as CSSProperties
            return (
              <span key={ci} className="rl" style={style}>
                {ch}
              </span>
            )
          })}
        </span>
      ))}
    </h2>
  )
}
