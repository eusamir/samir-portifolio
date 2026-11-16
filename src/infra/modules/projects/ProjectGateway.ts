import type { Project } from '@/business/domain/Project'

export interface ProjectGateway {
  getProjects(): Promise<Project[]>
}
