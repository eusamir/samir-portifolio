import type { CaseStudy } from '@/business/domain/CaseStudy'
import { casesData } from '@/infra/data/cases'

import type { CaseStudyGateway } from './CaseStudyGateway'
import { CaseStudyGatewayMapper } from './mappers/CaseStudyMapper'

export class CaseStudyGatewayLocal implements CaseStudyGateway {
  async getCaseStudies(): Promise<CaseStudy[]> {
    return CaseStudyGatewayMapper.toCaseStudies(casesData)
  }
}
