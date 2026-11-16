import type { CaseStudyDTO } from '@/infra/modules/cases/dtos/DTO'

export const casesData: CaseStudyDTO[] = [
  {
    order: 1,
    slug: 'moura',
    railLabel: 'moura',
    tone: 'dark',
    kicker: 'TDS Company para o Grupo Moura, 2025 a 2026',
    title: 'Bateria nova na porta do cliente em até 50 minutos',
    summary: [
      {
        label: 'Problema',
        text: 'Sistemas críticos que atendem clientes no Brasil e na Argentina precisavam continuar evoluindo sem interromper a operação.',
      },
      {
        label: 'Meu papel',
        text: 'Engenharia full-stack na evolução contínua da plataforma, do back-end à interface, com a operação sempre no ar.',
      },
      {
        label: 'Resultado',
        text: 'Novas funcionalidades entregues em produção com a cobertura de testes mantida acima de 80%.',
      },
    ],
    notice:
      'Arquitetura, módulos e detalhes internos ficam fora deste portfólio por contrato. O que aparece aqui é público.',
    stack: 'Java 17, Spring Boot, Angular e React.',
    products: {
      title: 'Onde esse trabalho encontra o cliente',
      intro:
        'A plataforma sustenta canais digitais de venda e serviço da Moura. Dois deles são públicos e mostram o tamanho do problema: o mesmo fluxo atendendo dois países, dois idiomas e centenas de cidades, com um técnico batendo na porta do cliente em até 50 minutos.',
      items: [
        {
          flag: 'Brasil, pt-BR',
          name: 'Moura Fácil',
          url: 'https://mourafacil.moura.com.br/',
          description:
            'Delivery oficial de baterias da Moura, criado em 2017. O cliente informa cidade, modelo e ano do veículo; o sistema indica a bateria certa e um técnico entrega, testa e instala no local. O pagamento só acontece depois da instalação, e a bateria usada volta para reciclagem.',
        },
        {
          flag: 'Argentina, es-AR',
          name: 'Moura Ya',
          url: 'https://mouraya.moura.com.ar/',
          description:
            'A mesma operação do outro lado da fronteira, servida pela fábrica de Pilar. Pedido por site, telefone ou WhatsApp, entrega, teste e instalação sem custo e pagamento no momento da instalação.',
        },
      ],
      facts: [
        {
          value: '50 min',
          label: 'prazo máximo para entregar, testar e instalar',
        },
        { value: '600+', label: 'cidades atendidas no Brasil e na Argentina' },
        {
          value: '2 países',
          label: 'dois idiomas e duas marcas no mesmo fluxo',
        },
        {
          value: 'R$ 0',
          label:
            'cobrados quando o teste mostra que o problema não é a bateria',
        },
      ],
    },
    showcase: {
      type: 'screens',
      steps: [
        {
          title: 'Página inicial',
          text: 'A promessa logo de cara: bateria entregue, testada e instalada em até 50 minutos, com parcelamento e pagamento na entrega.',
          url: 'mourafacil.moura.com.br',
          image: {
            src: '/images/prints/moura-facil-home.webp',
            alt: 'Página inicial do Moura Fácil',
          },
        },
        {
          title: 'Bateria indicada e pedido',
          text: 'A partir da cidade e do veículo, o site indica a bateria certa, com preço, garantia e entrega grátis. O cliente agenda sem pagar antecipado.',
          url: 'mourafacil.moura.com.br',
          image: {
            src: '/images/prints/moura-facil-pedido.webp',
            alt: 'Pedido no Moura Fácil com a bateria indicada e pagamento na entrega',
          },
        },
        {
          title: 'Dúvidas respondidas',
          text: 'Perguntas frequentes sobre o serviço e o fluxo de compra, inclusive o que acontece quando o problema não é a bateria.',
          url: 'mourafacil.moura.com.br/faq',
          image: {
            src: '/images/prints/moura-facil-faq.webp',
            alt: 'Perguntas frequentes do Moura Fácil',
          },
        },
        {
          title: 'Moura Ya, na Argentina',
          text: 'A mesma jornada em espanhol, com outra marca, outras cidades e atendimento também por WhatsApp.',
          url: 'mouraya.moura.com.ar',
          image: {
            src: '/images/prints/moura-ya-home.webp',
            alt: 'Página inicial do Moura Ya, em espanhol',
          },
        },
        {
          title: 'Pedido em espanhol',
          text: 'O mesmo pedido em pesos, com cuotas, agendamento e pagamento na entrega.',
          url: 'mouraya.moura.com.ar',
          image: {
            src: '/images/prints/moura-ya-pedido.webp',
            alt: 'Pedido no Moura Ya, em pesos e com parcelamento',
          },
        },
      ],
    },
  },
  {
    order: 2,
    slug: 'rural-track',
    railLabel: 'rural track',
    tone: 'light',
    sticker: 'fish',
    kicker: 'Freela, app Android publicado na Play Store',
    title: 'A produção de um viveiro de peixes, no bolso do produtor',
    summary: [
      {
        label: 'Problema',
        text: 'Produtores precisavam planejar e acompanhar a produção dos viveiros de onde o trabalho acontece: na beira do tanque.',
      },
      {
        label: 'Decisão',
        text: 'App em React Native com Expo Router e back-end em Spring Boot com Java 17, integrado a APIs externas para coletar e analisar dados em tempo real.',
      },
      {
        label: 'Resultado',
        text: 'App publicado na Play Store com controle de lotes, produtividade, indicadores operacionais e relatórios.',
      },
    ],
    stack: 'React Native, Expo Router, Spring Boot e Java 17.',
    // troque pela URL da página do app na Play Store
    link: {
      label: 'Ver o Rural Track na Play Store',
      url: 'https://play.google.com/store/search?q=rural%20track&c=apps',
    },
    showcase: {
      type: 'phones',
      screens: [
        {
          title: 'Tanques',
          text: 'Estrutura, volume, aeração e população de cada tanque.',
          image: {
            src: '/images/prints/rural-tanques.webp',
            alt: 'Tela de tanque do Rural Track',
          },
        },
        {
          title: 'Dashboards',
          text: 'População por espécie, biometrias e estoque num só lugar.',
          image: {
            src: '/images/prints/rural-dashboards.webp',
            alt: 'Dashboard do Rural Track',
          },
        },
        {
          title: 'Biometrias',
          text: 'Comprimento, peso e observações de cada amostra.',
          image: {
            src: '/images/prints/rural-biometrias.webp',
            alt: 'Tela de biometria do Rural Track',
          },
        },
      ],
    },
  },
  {
    order: 3,
    slug: 'isis',
    railLabel: 'isis',
    tone: 'dark',
    sticker: 'camera',
    kicker: 'Freela, 2025',
    title: 'Um portfólio de atriz, do comp card ao palco',
    summary: [
      {
        label: 'Problema',
        text: 'Uma atriz precisava reunir ficha, fotos, currículo e trabalhos de palco num só endereço, pronto para mandar a produtores e agências.',
      },
      {
        label: 'Decisão',
        text: 'Next.js com imagens otimizadas e todo o conteúdo no Hygraph: galeria, currículo em PDF, palco e redes sociais.',
      },
      {
        label: 'Resultado',
        text: 'Um comp card digital: as medidas da ficha de elenco abrem o site, seguidas de galeria, currículo e palco.',
      },
    ],
    stack: 'Next.js, Hygraph e next/image.',
    link: {
      label: 'Ver o site da Isis',
      url: 'https://isis-andrade.vercel.app/',
    },
    showcase: {
      type: 'frames',
      url: 'isis-andrade.vercel.app',
      desktop: {
        src: '/images/prints/isis-home.webp',
        alt: 'Abertura do site da atriz Isis Andrade',
      },
      mobile: {
        src: '/images/prints/isis-mobile.webp',
        alt: 'Site da Isis Andrade no celular',
      },
      strip: [
        {
          src: '/images/prints/isis-gallery.webp',
          alt: 'Galeria de fotos do site',
          caption: 'Gallery',
        },
        {
          src: '/images/prints/isis-curriculo.webp',
          alt: 'Currículo com o showreel',
          caption: 'Curriculum Vitae',
        },
        {
          src: '/images/prints/isis-on-stage.webp',
          alt: 'Seção On stage',
          caption: 'On stage',
        },
      ],
    },
  },
]
