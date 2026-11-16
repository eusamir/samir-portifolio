import type { ProjectDTO } from '@/infra/modules/projects/dtos/DTO'

export const projectsData: ProjectDTO[] = [
  {
    order: 1,
    name: 'Oxyspaces',
    description:
      'Reserva de espaços e recursos do Grupo Ceuma, com regras de conflito na disponibilidade e relatórios com filtros dinâmicos.',
    stack: ['Next.js', 'Spring Boot', 'TypeScript', 'Criteria API'],
    url: 'https://oxyspaces.oxygeni.com.br/',
    linkLabel: 'Ver site',
  },
  {
    order: 2,
    name: 'Oxyplano',
    description:
      'Planos de aula com envio automatizado ao TOTVS, numa API modular orientada a DDD e protegida por circuit breaker.',
    stack: ['Spring Boot', 'Spring Security', 'Resilience4j', 'OpenAPI'],
    url: 'https://eplano.grupoceuma.com.br/signin',
    linkLabel: 'Ver site',
  },
  {
    order: 3,
    name: 'OxyEdu',
    description:
      'Plataforma de cursos, eventos e lives, com catálogo, inscrições e SEO otimizado.',
    stack: ['React', 'Tailwind CSS', 'Strapi'],
  },
  {
    order: 4,
    name: 'MarketPlace Ceuma',
    description:
      'Busca e comparação de cursos de graduação e pós-graduação da Universidade Ceuma.',
    stack: ['Next.js', 'React'],
    url: 'https://ceuma.grupoceuma.com.br',
    linkLabel: 'Ver site',
  },
  {
    order: 5,
    name: 'Oxygeni',
    description:
      'Site institucional da empresa de tecnologia educacional do grupo.',
    stack: ['Next.js', 'Hygraph'],
    url: 'https://oxygeni.com.br/',
    linkLabel: 'Ver site',
  },
  {
    order: 6,
    name: 'Vet-Shop',
    description:
      'Gestão de petshops com API REST e agendamento de serviços veterinários.',
    stack: ['Spring Boot', 'REST'],
    url: 'https://github.com/eusamir/vet-shop',
    linkLabel: 'GitHub',
  },
]
