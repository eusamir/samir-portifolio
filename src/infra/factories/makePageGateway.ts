import 'server-only'

import { BackstageGatewayLocal } from '../modules/backstage/BackstageGatewayLocal'
import { CaseStudyGatewayLocal } from '../modules/cases/CaseStudyGatewayLocal'
import { ProfileGatewayLocal } from '../modules/profile/ProfileGatewayLocal'
import { ProjectGatewayLocal } from '../modules/projects/ProjectGatewayLocal'
import { StackGatewayLocal } from '../modules/stack/StackGatewayLocal'
import { TrajectoryGatewayLocal } from '../modules/trajectory/TrajectoryGatewayLocal'

/**
 * Monta os gateways da página a partir do conteúdo local (src/infra/data).
 * As seções dependem só das interfaces dos gateways: se um dia o conteúdo
 * vier de uma API ou CMS, basta criar outra implementação e trocar aqui.
 */
export function makePageGateway() {
  return {
    profile: new ProfileGatewayLocal(),
    trajectory: new TrajectoryGatewayLocal(),
    cases: new CaseStudyGatewayLocal(),
    projects: new ProjectGatewayLocal(),
    backstage: new BackstageGatewayLocal(),
    stack: new StackGatewayLocal(),
  }
}
