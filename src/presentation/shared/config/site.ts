export const siteConfig = {
  name: 'Samir Andrade',
  description:
    'Samir Andrade, engenheiro de software no time de Arquitetura de Soluções do Grupo Mateus. Sistemas distribuídos, microsserviços, mensageria e interfaces, de São Luís, MA.',
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000'),
  nav: [
    { label: 'Trajetória', href: '#trajetoria' },
    { label: 'Casos', href: '#casos' },
    { label: 'Contato', href: '#contato' },
  ],
} as const

/** Itens da busca (Ctrl/⌘ K): seções, projetos e ações */
export type SearchAction =
  | 'copy-email'
  | 'toggle-theme'
  | 'toggle-quick'
  | 'toggle-motion'
  | 'toggle-sound'

export type SearchItem =
  | { kind: 'seção' | 'projeto'; label: string; href: string }
  | { kind: 'ação'; label: string; action: SearchAction }
  | { kind: 'link'; label: string; url: string }

export const searchItems: SearchItem[] = [
  { kind: 'seção', label: 'Início', href: '#inicio' },
  { kind: 'seção', label: 'Manifesto', href: '#manifesto' },
  { kind: 'seção', label: 'Trajetória', href: '#trajetoria' },
  { kind: 'projeto', label: 'Moura Fácil e Moura Ya', href: '#caso-moura' },
  { kind: 'projeto', label: 'Rural Track', href: '#caso-rural-track' },
  { kind: 'projeto', label: 'Isis Andrade', href: '#caso-isis' },
  { kind: 'projeto', label: 'Oxyspaces', href: '#outros' },
  { kind: 'projeto', label: 'Oxyplano', href: '#outros' },
  { kind: 'seção', label: 'Mais projetos', href: '#outros' },
  { kind: 'seção', label: 'Bastidores', href: '#bastidores' },
  { kind: 'seção', label: 'Stack e formação', href: '#stack' },
  { kind: 'seção', label: 'Contato', href: '#contato' },
  { kind: 'ação', label: 'Copiar e-mail', action: 'copy-email' },
  {
    kind: 'ação',
    label: 'Alternar tema claro ou escuro',
    action: 'toggle-theme',
  },
  {
    kind: 'ação',
    label: 'Ligar ou desligar a visão rápida',
    action: 'toggle-quick',
  },
  {
    kind: 'ação',
    label: 'Ligar ou desligar menos movimento',
    action: 'toggle-motion',
  },
  { kind: 'ação', label: 'Ligar ou desligar o som', action: 'toggle-sound' },
  {
    kind: 'link',
    label: 'Abrir LinkedIn',
    url: 'https://www.linkedin.com/in/samir-andrade/',
  },
  { kind: 'link', label: 'Abrir GitHub', url: 'https://github.com/eusamir' },
]
