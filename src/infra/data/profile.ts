import type { ProfileDTO } from '@/infra/modules/profile/dtos/DTO'

export const profileData: ProfileDTO = {
  name: 'Samir Andrade',
  role: 'Engenheiro de software.',
  location: 'São Luís, MA',
  email: 'samirandradee@gmail.com',
  socials: [
    {
      label: 'linkedin',
      value: 'in/samir-andrade',
      url: 'https://www.linkedin.com/in/samir-andrade/',
    },
    { label: 'github', value: 'eusamir', url: 'https://github.com/eusamir' },
  ],
  manifesto:
    'Eu desenho e construo sistemas distribuídos. Do contrato da API ao botão que o cliente toca, cada parte precisa continuar de pé em produção, todos os dias, para pessoas reais.',
  manifestoHighlights: ['sistemas', 'distribuídos.', 'produção,'],
  flight: {
    text: 'Nasci em Ovar, Portugal, e hoje moro em São Luís, no Brasil. Antes de qualquer sistema, a primeira rota foi essa.',
    origin: { label: 'Ovar, Portugal', country: 'PT' },
    destination: { label: 'São Luís, Brasil', country: 'BR' },
  },
  traceStart: '2021-01',
}
