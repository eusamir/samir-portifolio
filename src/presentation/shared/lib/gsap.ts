'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

/** Registro único dos plugins do GSAP (todos gratuitos desde a 3.13). */
gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  SplitText,
  DrawSVGPlugin,
  MotionPathPlugin,
)

export {
  DrawSVGPlugin,
  gsap,
  MotionPathPlugin,
  ScrollTrigger,
  SplitText,
  useGSAP,
}
