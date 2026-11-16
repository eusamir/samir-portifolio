import { StackLayer } from '@/business/domain/StackLayer'

import type { StackLayerDTO } from '../dtos/DTO'

export class StackGatewayMapper {
  static toLayers(data: StackLayerDTO[]): StackLayer[] {
    return [...data]
      .sort((a, b) => a.order - b.order)
      .map((d) => new StackLayer({ title: d.title, items: d.items ?? [] }))
  }
}
