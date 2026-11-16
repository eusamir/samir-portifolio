import type { CaseStudy } from '@/business/domain/CaseStudy'

export interface CaseStudyGateway {
  getCaseStudies(): Promise<CaseStudy[]>
}
