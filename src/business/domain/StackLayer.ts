export interface StackLayerProps {
  title: string
  items: string[]
}

export class StackLayer {
  constructor(public readonly props: StackLayerProps) {}
}
