import type { Paper, Relation, TimelineGroup } from '../types'
import { paperYear } from './data'

export function groupPapersByTimelineYear(papers: Paper[]): TimelineGroup[] {
  const grouped = new Map<number, Paper[]>()
  for (const paper of papers) {
    const year = paperYear(paper)
    grouped.set(year, [...(grouped.get(year) ?? []), paper])
  }

  return [...grouped.entries()]
    .sort(([first], [second]) => first - second)
    .map(([year, yearPapers]) => {
      const ordered = [...yearPapers].sort((first, second) => first.date.localeCompare(second.date) || first.short_title.localeCompare(second.short_title))
      const featured = ordered.filter((paper) => paper.featured)
      const targetSize = featured.length >= 6 ? featured.length : Math.max(8, featured.length + 2)
      const featuredIds = new Set(featured.map((paper) => paper.id))
      const visible = [
        ...featured,
        ...ordered.filter((paper) => !featuredIds.has(paper.id)).slice(0, Math.max(0, targetSize - featured.length)),
      ].sort((first, second) => first.date.localeCompare(second.date) || first.short_title.localeCompare(second.short_title))
      const visibleIds = new Set(visible.map((paper) => paper.id))
      return { year, papers: visible, featured, hiddenCount: ordered.filter((paper) => !visibleIds.has(paper.id)).length }
    })
}

export function relationTouches(relation: Relation, id: string): boolean {
  return relation.from === id || relation.to === id
}

export function relationPeer(relation: Relation, id: string): string {
  return relation.from === id ? relation.to : relation.from
}
