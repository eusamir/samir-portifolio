import { Project } from '@/business/domain/Project'

import type { ProjectDTO } from '../dtos/DTO'

export class ProjectGatewayMapper {
  static toProjects(data: ProjectDTO[]): Project[] {
    return [...data]
      .sort((a, b) => a.order - b.order)
      .map(
        (d) =>
          new Project({
            name: d.name,
            description: d.description,
            stack: d.stack ?? [],
            url: d.url ?? undefined,
            linkLabel: d.linkLabel ?? undefined,
          }),
      )
  }
}
