'use client'

import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import { COPY_EMAIL_EVENT } from '@/presentation/shared/components/command/searchEvents'
import { Sparkle } from '@/presentation/shared/components/ui/Sparkle'
import { TornPaper } from '@/presentation/shared/components/ui/TornPaper'
import { usePreferences } from '@/presentation/shared/providers/PreferencesProvider'

/** Copia o e-mail e mostra uma reação de "UAU" com estrelinhas (Motion cuida da entrada e saída). */
export function CopyEmail({ email }: { email: string }) {
  const [shown, setShown] = useState(0)
  const [message, setMessage] = useState('')
  const timer = useRef<number | undefined>(undefined)
  const { reduceMotion } = usePreferences()

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email)
      setMessage('E-mail copiado.')
      setShown((n) => n + 1)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => {
        setShown(0)
        setMessage('')
      }, 3200)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }, [email])

  useEffect(() => {
    const onCopy = () => {
      copy()
    }
    addEventListener(COPY_EMAIL_EVENT, onCopy)
    return () => {
      removeEventListener(COPY_EMAIL_EVENT, onCopy)
      window.clearTimeout(timer.current)
    }
  }, [copy])

  return (
    <>
      <button type="button" onClick={copy}>
        <span className="k mono">e-mail</span>
        {email}
      </button>
      <p className="copied mono" aria-live="polite">
        {message}
      </p>
      <AnimatePresence>
        {shown > 0 && (
          <motion.div
            key={shown}
            className="wow"
            aria-hidden="true"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 30, scale: 0.8, rotate: -14 }
            }
            animate={{ opacity: 1, y: 0, scale: 1, rotate: -6 }}
            exit={{ opacity: 0, y: -12, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
          >
            <figure className="rip rip-wow in">
              <TornPaper seed={77} className="rip-paper" />
              <span className="rip-head">
                <Image
                  src="/images/heads/wow.webp"
                  alt=""
                  width={300}
                  height={420}
                  sizes="160px"
                />
              </span>
              {['sp1', 'sp2', 'sp3', 'sp4', 'sp5'].map((c) => (
                <Sparkle key={c} className={`spark-twinkle ${c}`} />
              ))}
              <span className="rip-tags">
                <b className="t-amb">e-mail copiado!</b>
              </span>
              <i className="tape" />
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
