import { CaseStudy } from '@/business/domain/CaseStudy'

import type { CaseStudyDTO } from '../dtos/DTO'

export class CaseStudyGatewayMapper {
  static toCaseStudies(data: CaseStudyDTO[]): CaseStudy[] {
    return [...data]
      .sort((a, b) => a.order - b.order)
      .map((caseStudy) => new CaseStudy(caseStudy))
  }
}
