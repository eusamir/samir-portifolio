import { makePageGateway } from '@/infra/factories/makePageGateway'
import { HeadSticker } from '@/presentation/shared/components/ui/Heads'

import { ProjectList } from './projectList'

export async function ProjectsSection() {
  const { projects: projectsGateway } = makePageGateway()
  const projects = await projectsGateway.getProjects()

  if (!projects.length) return null

  return (
    <section
      className="case"
      id="outros"
      data-zone="a"
      aria-labelledby="h-outros"
    >
      <div className="wrap mini">
        <div>
          <h3 id="h-outros">Mais projetos</h3>
          <p className="muted mini-intro">
            Sistemas no ar, da reserva de salas ao marketplace acadêmico.
          </p>
          <HeadSticker
            name="side-surprise"
            seed={28}
            rotate={3}
            flip
            className="rip-peek"
          />
        </div>
        <ProjectList projects={projects.map((p) => p.props)} />
      </div>
    </section>
  )
}
