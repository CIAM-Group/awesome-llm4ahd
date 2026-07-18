export type RelationDirection = 'directed' | 'undirected'

export interface RelationTypeDefinition {
  label: string
  description: string
  use_when: string
  avoid_when: string
  direction: RelationDirection
}

export interface DimensionDefinition {
  label: string
  description: string
  prompt: string
}

export interface Institution {
  name: string
  short_name: string
  initials: string
  website?: string
  logo?: string
  accent: string
}

export interface Paper {
  id: string
  short_title: string
  title: string
  authors: string[]
  year: number
  date: string
  venue: string
  paper_url: string
  code_url?: string
  institutions: string[]
  primary_dimension: string
  dimensions: string[]
  problems: string[]
  featured: boolean
  summary: string
  body_html: string
}

export interface Relation {
  from: string
  to: string
  type: string
  dimension: string
  description: string
}

export interface AtlasData {
  version: number
  taxonomy: {
    relation_types: Record<string, RelationTypeDefinition>
    dimensions: Record<string, DimensionDefinition>
  }
  institutions: Record<string, Institution>
  relations: Relation[]
  papers: Paper[]
}

export interface TimelineGroup {
  year: number
  papers: Paper[]
  featured: Paper[]
  hiddenCount: number
}
