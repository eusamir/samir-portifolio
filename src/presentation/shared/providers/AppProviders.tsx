'use client'

import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

import { PreferencesProvider } from '@/presentation/shared/providers/PreferencesProvider'
import { SmoothScrollProvider } from '@/presentation/shared/providers/SmoothScrollProvider'
import { SoundProvider } from '@/presentation/shared/providers/SoundProvider'
import { ZoneObserver } from '@/presentation/shared/providers/ZoneObserver'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <PreferencesProvider>
        <SoundProvider>
          <SmoothScrollProvider>
            <ZoneObserver />
            {children}
          </SmoothScrollProvider>
        </SoundProvider>
      </PreferencesProvider>
    </ThemeProvider>
  )
}
