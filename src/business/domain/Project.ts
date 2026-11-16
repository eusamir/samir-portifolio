export interface ProjectProps {
  name: string
  description: string
  stack: string[]
  url?: string
  linkLabel?: string
}

export class Project {
  constructor(public readonly props: ProjectProps) {}
}
