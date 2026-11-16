# Portfólio · Samir Andrade

Portfólio em Next.js 15 (App Router), React 19 e TypeScript. A carreira é contada como um **trace distribuído**, com estética de colagem estilo zine.

```bash
npm install
npm run dev        # desenvolvimento (Turbopack)
npm run build      # build de produção
npm start          # servidor de produção
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

## Arquitetura

Mesma separação do projeto `isis-portfolio`: **domínio**, **infraestrutura** e **apresentação**, organizados por feature.

```
src/
├── app/                          # rotas do App Router (layout, página, 404, robots, sitemap, fontes)
├── business/domain/              # entidades: classes com `props` somente leitura
├── infra/
│   ├── modules/<feature>/        # trajectory, cases, projects, backstage, stack, profile
│   │   ├── XGateway.ts               interface (contrato)
│   │   ├── XGatewayLocal.ts          implementação com o conteúdo local
│   │   ├── dtos/DTO.ts               formato dos dados de entrada
│   │   └── mappers/XMapper.ts        classe XGatewayMapper: DTO -> entidade
│   ├── data/                     # o conteúdo do site, no formato dos DTOs
│   └── factories/makePageGateway.ts
└── presentation/
    ├── modules/<Section>/        # HeroSection, ManifestoSection, TrajectorySection, CasesSection,
    │   ├── index.tsx             #   ProjectsSection, BackstageSection, StackSection, ContactSection
    │   └── <subComponent>/index.tsx   (ex.: CasesSection/screensShowcase, BackstageSection/flightMap)
    ├── shared/
    │   ├── components/layout/<Componente>/index.tsx   (Header, HeaderLogo, HeaderControls, MobileMenu,
    │   │                                                SearchButton, SoundButton, ThemeButton, Toggle, TraceRail)
    │   ├── components/ui/<Componente>/index.tsx       (Logo, TornPaper, RipSticker, Sparkle, Heads)
    │   ├── components/command/CommandPalette/index.tsx
    │   ├── providers/  hooks/  lib/  config/
    └── styles/                   # CSS por responsabilidade
```

### Convenções (as mesmas do `isis-portfolio`)

- **Cada seção é um Server Component assíncrono** que chama `makePageGateway()` e busca só o que usa; o `page.tsx` apenas compõe as seções.
- **Uma pasta por componente**, com `index.tsx`. Seções e componentes compartilhados em PascalCase; subcomponentes de uma seção em camelCase.
- **Imports:** relativos dentro do mesmo módulo (`./mappers/...`, `./screensShowcase`) e com o alias `@/` entre camadas.
- **Lint e formatação:** `@rocketseat/eslint-config/next` com Prettier (`npm run lint:fix`).
- **Lógica fora da marcação:** constantes, funções puras e hooks ficam ao lado do componente (ex.: `flightMap/constants.ts`, `flightMap/useFlightAnimation.ts`, `traceWaterfall/timeline.ts`, `nameLens/blueprint.ts`, `glyphField/glyphs.ts`). Utilitários comuns em `shared/lib` (`math.ts`, `time.ts`, `seeded.ts`).

Features no domínio/infra: `trajectory`, `cases`, `projects`, `backstage`, `stack`, `profile`.

### Conteúdo

Todo o conteúdo fica em `src/infra/data` e todas as imagens em `public/images`. Para editar um texto, um projeto ou uma foto, mude o arquivo correspondente e publique de novo.

Os gateways continuam existindo mesmo sem CMS: as seções dependem só das interfaces. Se um dia o conteúdo vier de uma API ou CMS, basta criar outra implementação do gateway e trocar em `makePageGateway()`, sem tocar na apresentação.

## SSR e cliente

A regra: **tudo que é conteúdo nasce no servidor; só a interação vira ilha de cliente.**

| Parte | Onde roda | Por quê |
|---|---|---|
| Seções (`<Section>/index.tsx`) | Servidor (no build) | Cada uma busca seus dados no gateway; a página inteira é gerada como HTML estático |
| Textos, títulos, resumos, listas, stack | Servidor | Indexável, zero JavaScript |
| `RansomTitle`, `TornPaper` | Servidor | Sorteio determinístico por seed: mesmo HTML no SSR e no cliente, sem erro de hidratação |
| `HeroStage`, `NameLens`, `GlyphField`, `Portal` | Cliente | Ponteiro, ScrollTrigger e canvas de SVG |
| `ManifestoReveal` | Cliente | SplitText sobre um texto que já veio do servidor (aprimoramento progressivo) |
| `TraceWaterfall`, `ScreensShowcase`, `PhonesShowcase`, `FramesShowcase`, `HorizontalGallery` | Cliente | Cenas guiadas pelo scroll |
| `RipSticker` | Cliente (mínimo) | Só detecta a entrada na tela e toca o som; a animação é CSS |
| `FlightMap`, `CopyEmail`, `FootLogo`, `ProjectList`, `CommandPalette` | Cliente | Interação |

Componentes de servidor passam para o cliente apenas dados serializáveis (`entity.props`), nunca instâncias de classe.

## Bibliotecas e onde cada uma atua

| Biblioteca | Onde |
|---|---|
| **GSAP ScrollTrigger** | Cena do hero (nome, portal, faixas), manifesto, linha do tempo, galeria do Moura, leque de celulares, molduras da Isis, galeria horizontal dos Bastidores, trilho lateral e troca de cores por seção |
| **GSAP SplitText** | Manifesto acendendo palavra por palavra |
| **GSAP MotionPathPlugin** | Voo de Ovar a São Luís, com `ease: steps()` para o stop-motion |
| **GSAP DrawSVGPlugin** | Rastro do voo e logo do rodapé se desenhando |
| **GSAP timelines** | Faixas de letras em loop infinito; o `timeScale` acelera no mergulho do hero |
| **Lenis** | Rolagem suave, sincronizada com o ticker do GSAP (`autoRaf: false`) |
| **Motion** | Prévia dos projetos seguindo o cursor, reação de copiar e-mail, surpresa do logo |
| **cmdk** | Busca com Ctrl/⌘ K e `/` |
| **next-themes** | Tema claro/escuro sem piscar |
| `@phosphor-icons/react` | Ícones do cabeçalho |
| `next/font/local`, `next/image` | Fontes e imagens locais otimizadas |

Regra de convivência: **GSAP para tudo que depende do scroll ou de uma linha do tempo, Motion para estados de componente.**

Nas cenas guiadas pelo scroll, o ScrollTrigger escreve direto em variáveis CSS e no DOM; o React só re-renderiza quando algo discreto muda (o span ativo, o passo da galeria). Isso mantém a rolagem a 60 quadros por segundo.

**Feito sem biblioteca, de propósito:**

- **Recortes em stop-motion** (piscar, peixe, câmera, papel rasgando): CSS com `steps()`. É a ferramenta mais leve para trocar quadros, e roda fora da thread principal.
- **Lente do nome:** rastro com física própria seguindo o ponteiro; não existe equivalente pronto.

## Acessibilidade e preferências

- **Menos movimento:** respeita `prefers-reduced-motion` e pode ser ligado no cabeçalho. Desliga cenas fixas, a rolagem suave e as animações.
- **Visão rápida:** mostra só os resumos dos casos.
- **Som:** desligado por padrão. Os arquivos só são baixados quando o visitante liga.
- **Telas estreitas:** as cenas fixas viram layout estático.
- **Cabeçalho responsivo:** acima de 1180 px, links e controles completos; abaixo disso, logo, busca e um menu lateral com as seções e as preferências (fecha com Esc, clique fora ou ao escolher uma seção, e trava a rolagem enquanto está aberto).
- Link para pular ao conteúdo, foco visível, `aria-live` nas mudanças de estado.

## Assets

- `public/images/heads`: recortes em P&B com retícula (piscar, expressões)
- `public/images/collage`: câmera, peixe (3 quadros) e avião
- `public/images/prints`: telas do Moura Fácil, Moura Ya, Rural Track e site da Isis
- `public/images/photos`: Bastidores
- `public/audio`: efeitos e a trilha autoral "batida para portfolio"

## Publicar na Vercel

1. Suba o projeto para um repositório no GitHub.
2. Na Vercel, **Add New → Project** e importe o repositório. O framework (Next.js) é detectado sozinho; não precisa mudar comando de build nem pasta de saída.
3. Variável de ambiente opcional: `NEXT_PUBLIC_SITE_URL` com o domínio final (por exemplo, quando você ligar um domínio próprio). Sem ela, o site usa o domínio de produção do projeto na Vercel.
4. **Deploy.** Cada push na `main` publica em produção, e cada pull request ganha uma URL de pré-visualização.

O que já está configurado para a Vercel:

- A página é estática: sai do build como HTML e é servida pela CDN, sem função de servidor por visita.
- `next/image` otimiza as imagens locais na primeira requisição e a Vercel guarda o resultado em cache.
- `/images` e `/audio` têm cache de um ano (`immutable`) em `next.config.ts`. Ao trocar uma imagem, troque também o nome do arquivo.
- `robots.txt` e `sitemap.xml` são gerados por `src/app/robots.ts` e `src/app/sitemap.ts`.

## Antes de publicar

- [ ] Trocar o link da Play Store em `src/infra/data/cases.ts` pela página real do app
- [ ] Confirmar os termos de uso dos efeitos sonoros (CuteStockFootage, Blob Sound, Sound Tudo) e, se pedirem, creditar no rodapé
- [ ] Definir a imagem da surpresa em `src/presentation/modules/Contact/EasterEgg.tsx` (`EASTER_EGG_SRC`) ou remover o efeito
- [ ] Confirmar legendas dos Bastidores e as autorizações (fotos com outras pessoas, telas do Grupo Moura)
- [ ] Criar a imagem de Open Graph (`src/app/opengraph-image.png`, 1200 × 630)
