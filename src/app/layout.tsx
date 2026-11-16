import './globals.css'

import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import type { ReactNode } from 'react'

import { CommandPalette } from '@/presentation/shared/components/command/CommandPalette'
import { Header } from '@/presentation/shared/components/layout/Header'
import { TraceRail } from '@/presentation/shared/components/layout/TraceRail'
import { siteConfig } from '@/presentation/shared/config/site'
import { AppProviders } from '@/presentation/shared/providers/AppProviders'

/** Fontes locais (servidas pelo próprio domínio, sem requisição externa). */
const archivo = localFont({
  src: './fonts/Archivo.ttf',
  variable: '--font-sans',
  weight: '100 900',
  display: 'swap',
})
const martian = localFont({
  src: './fonts/MartianMono.ttf',
  variable: '--font-mono',
  weight: '100 800',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Samir Andrade · Engenharia de software e arquitetura de soluções',
    template: '%s · Samir Andrade',
  },
  description: siteConfig.description,
  openGraph: {
    title: 'Samir Andrade · Engenharia de software e arquitetura de soluções',
    description: 'Cinco anos de sistemas, lidos como um trace distribuído.',
    type: 'website',
    locale: 'pt_BR',
    url: siteConfig.url,
  },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F2FF' },
    { media: '(prefers-color-scheme: dark)', color: '#160F2B' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${archivo.variable} ${martian.variable}`}
    >
      <body data-zone="a">
        <AppProviders>
          <a className="skip" href="#conteudo">
            Pular para o conteúdo
          </a>
          <Header />
          <TraceRail />
          <main id="conteudo">{children}</main>
          <CommandPalette />
        </AppProviders>
      </body>
    </html>
  )
}
