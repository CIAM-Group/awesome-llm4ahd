import generated from '../generated/content.json'
import type { AtlasData, Paper, Relation } from '../types'

export const atlas = generated as AtlasData
export const paperById = new Map(atlas.papers.map((paper) => [paper.id, paper]))

export function getPaper(id: string): Paper | undefined {
  return paperById.get(id)
}

export function getRelationsForPaper(id: string): Relation[] {
  return atlas.relations.filter((relation) => relation.from === id || relation.to === id)
}

export function assetUrl(relativePath: string): string {
  const base = import.meta.env.BASE_URL
  return `${base}${relativePath.replace(/^\//, '')}`
}

export function routePath(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${base}${path.startsWith('/') ? path : `/${path}`}` || '/'
}

export function formatMonthYear(value: string): string {
  return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(`${value}T12:00:00`))
}

export function paperYear(paper: Paper): number {
  return Number(paper.date.slice(0, 4))
}
