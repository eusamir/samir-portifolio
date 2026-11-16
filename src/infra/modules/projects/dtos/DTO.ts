export interface ProjectDTO {
  name: string
  description: string
  stack: string[]
  url?: string | null
  linkLabel?: string | null
  order: number
}
