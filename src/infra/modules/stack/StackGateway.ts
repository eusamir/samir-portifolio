import type { StackLayer } from '@/business/domain/StackLayer'

export interface StackGateway {
  getLayers(): Promise<StackLayer[]>
}
