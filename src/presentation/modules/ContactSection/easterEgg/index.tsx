'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

/**
 * Espaço da surpresa da bolinha do logo. Defina `EASTER_EGG_SRC` com uma imagem que você
 * tenha direito de usar; sem ela, aparece um espaço reservado.
 */
const EASTER_EGG_SRC = '/images/gifs/jake.gif'

export function EasterEgg({ trigger }: { trigger: number }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!trigger) return
    setVisible(true)
    const t = window.setTimeout(() => setVisible(false), 3400)
    return () => window.clearTimeout(t)
  }, [trigger])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={trigger}
          className="egg"
          aria-hidden="true"
          initial={{ x: '120%', rotate: 8 }}
          animate={{ x: '18%', rotate: 0 }}
          exit={{ x: '120%', rotate: 10 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          {EASTER_EGG_SRC ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="egg-media" src={EASTER_EGG_SRC} alt="" />
          ) : (
            <span className="egg-ph">[sua imagem aqui]</span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
