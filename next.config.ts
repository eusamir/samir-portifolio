import type { NextConfig } from 'next'

const immutable = [
  { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // todas as imagens são locais (public/images); o next/image otimiza e a Vercel guarda em cache
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      // arquivos estáticos que não mudam de conteúdo sem mudar de nome
      { source: '/images/:path*', headers: immutable },
      { source: '/audio/:path*', headers: immutable },
    ]
  },
}

export default nextConfig
