'use client'

import { type CSSProperties, useMemo, useRef, useState } from 'react'

import type { TraceSpanProps } from '@/business/domain/TraceSpan'
import { cn } from '@/presentation/shared/lib/cn'
import { gsap, ScrollTrigger, useGSAP } from '@/presentation/shared/lib/gsap'
import { formatDecimalYear, nowDecimal } from '@/presentation/shared/lib/time'
import { usePreferences } from '@/presentation/shared/providers/PreferencesProvider'

import {
  AXIS_END,
  AXIS_START,
  axisPosition,
  scrubTime,
  spanProgress,
} from './timeline'

export type WaterfallSpan = TraceSpanProps & {
  startDecimal: number
  endDecimal: number | null
}

interface WaterfallRow extends WaterfallSpan {
  /** Fim efetivo no eixo (ano decimal); spans abertos vão até hoje */
  endAt: number
  open: boolean
  isMilestone: boolean
}

const YEARS = Array.from({ length: 7 }, (_, k) => AXIS_START + k)
const TICKS = YEARS.slice(1)

/**
 * Waterfall da carreira. O ScrollTrigger escreve o instante da linha do tempo
 * direto nas variáveis CSS das barras (sem re-renderizar a cada quadro); o
 * React só atualiza quando o span ativo muda.
 */
export function TraceWaterfall({
  spans,
  traceStart,
}: {
  spans: WaterfallSpan[]
  traceStart: number
}) {
  const pin = useRef<HTMLDivElement>(null)
  const chart = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLLIElement | null)[]>([])
  const scrubLabel = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState(0)
  const { isStatic } = usePreferences()
  const now = useMemo(() => nowDecimal(), [])

  const rows: WaterfallRow[] = useMemo(
    () =>
      spans.map((span) => {
        const isMilestone = span.kind === 'milestone'
        const endAt = isMilestone
          ? span.startDecimal
          : (span.endDecimal ?? Math.max(now, span.startDecimal + 0.02))
        return {
          ...span,
          endAt,
          isMilestone,
          open: span.endDecimal === null && !isMilestone,
        }
      }),
    [spans, now],
  )

  useGSAP(
    () => {
      const paint = (time: number) => {
        gsap.set(chart.current, {
          '--t': Math.min(1, Math.max(0, axisPosition(time))),
        })
        rows.forEach((row, i) => {
          gsap.set(rowRefs.current[i] ?? null, {
            '--w': spanProgress(
              row.startDecimal,
              row.endAt,
              time,
              row.isMilestone,
            ),
            '--ow': time >= row.endAt - 0.001 ? 1 : 0,
          })
        })
        if (scrubLabel.current) {
          scrubLabel.current.textContent = formatDecimalYear(
            Math.min(time, 2026.999),
          )
        }
      }

      if (isStatic) {
        paint(AXIS_END)
        return
      }

      paint(AXIS_START)
      const starts = rows.map((row) => row.startDecimal)
      let current = 0

      ScrollTrigger.create({
        trigger: pin.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: ({ progress }) => {
          const { time, index } = scrubTime(progress, starts)
          paint(time)
          if (index !== current) {
            current = index
            setActive(index)
          }
        },
      })
    },
    { scope: pin, dependencies: [isStatic, rows], revertOnUpdate: true },
  )

  return (
    <div
      className="pin wf-pin"
      ref={pin}
      style={{ '--steps': rows.length } as CSSProperties}
    >
      <div className="pin-stage">
        <div className="wrap wf-grid">
          <div>
            <div className="trace-meta mono" aria-hidden="true">
              <span>
                trace <b>samir-andrade</b>
              </span>
              <span>
                spans <b>{rows.length}</b>
              </span>
              <span>
                início <b>{formatDecimalYear(traceStart)}</b>
              </span>
              <span>
                status <b>em execução</b>
              </span>
            </div>

            <div className="wf" ref={chart}>
              <div className="wf-axis mono" aria-hidden="true">
                {YEARS.map((year) => (
                  <span
                    key={year}
                    style={{ left: `${axisPosition(year) * 100}%` }}
                  >
                    {year}
                  </span>
                ))}
              </div>

              <ol className="wf-rows" aria-label="Linha do tempo profissional">
                {rows.map((row, i) => (
                  <li
                    key={row.id}
                    ref={(el) => {
                      rowRefs.current[i] = el
                    }}
                    className={cn(
                      'wf-row',
                      row.kind === 'parallel' && 'child',
                      !isStatic && i > active && 'dim',
                    )}
                    style={
                      {
                        '--s': axisPosition(row.startDecimal),
                        '--e': axisPosition(row.endAt),
                      } as CSSProperties
                    }
                  >
                    <div className="wf-lbl">
                      <strong>{row.role}</strong>
                      <span>{row.organization}</span>
                    </div>
                    <div className="wf-track">
                      {TICKS.map((year) => (
                        <div
                          key={year}
                          className="wf-tick"
                          style={{ left: `${axisPosition(year) * 100}%` }}
                        />
                      ))}
                      {row.isMilestone ? (
                        <div className="wf-ms" />
                      ) : (
                        <>
                          <div className="wf-bar">
                            <div className="wf-fill" />
                          </div>
                          {row.open && row.kind === 'job' && (
                            <>
                              <div className="wf-open" />
                              <div className="wf-head" />
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ol>

              <div className="wf-scrub" aria-hidden="true">
                <span className="mono" ref={scrubLabel} />
              </div>
            </div>
          </div>

          <div className="wf-panel" aria-live="polite">
            {rows.map((row, i) => (
              <article
                key={row.id}
                className={cn('wf-detail', (isStatic || i === active) && 'on')}
              >
                <span className="when mono">{row.periodLabel}</span>
                <h3>{row.title}</h3>
                <p>{row.description}</p>
                {row.tags.length > 0 && (
                  <ul className="tags mono">
                    {row.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
