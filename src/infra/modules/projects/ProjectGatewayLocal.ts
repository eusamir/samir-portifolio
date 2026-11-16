import type { Project } from '@/business/domain/Project'
import { projectsData } from '@/infra/data/projects'

import { ProjectGatewayMapper } from './mappers/ProjectMapper'
import type { ProjectGateway } from './ProjectGateway'

export class ProjectGatewayLocal implements ProjectGateway {
  async getProjects(): Promise<Project[]> {
    return ProjectGatewayMapper.toProjects(projectsData)
  }
}
