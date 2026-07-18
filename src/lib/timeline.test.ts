import { describe, expect, it } from 'vitest'
import { groupPapersByTimelineYear } from './timeline'
import type { Paper } from '../types'

function paper(id: string, date: string, featured = false): Paper {
  return {
    id,
    short_title: id,
    title: id,
    authors: ['Author'],
    year: Number(date.slice(0, 4)),
    date,
    venue: 'arXiv',
    paper_url: 'https://example.com/paper',
    institutions: ['demo'],
    primary_dimension: 'search',
    dimensions: ['search'],
    problems: ['Demo'],
    featured,
    summary: 'A test paper summary.',
    body_html: '<p>Test</p>',
  }
}

describe('groupPapersByTimelineYear', () => {
  it('uses the public date year and preserves chronological ordering', () => {
    const groups = groupPapersByTimelineYear([
      paper('later', '2024-03-01'),
      paper('origin', '2023-11-26'),
      paper('earlier', '2024-01-04'),
    ])
    expect(groups.map((group) => group.year)).toEqual([2023, 2024])
    expect(groups[1].papers.map((entry) => entry.id)).toEqual(['earlier', 'later'])
  })

  it('keeps a compact overview for dense years', () => {
    const papers = Array.from({ length: 12 }, (_, index) => paper(`paper-${index}`, `2025-01-${String(index + 1).padStart(2, '0')}`, index === 10))
    const [group] = groupPapersByTimelineYear(papers)
    expect(group.papers.length).toBe(8)
    expect(group.papers.some((entry) => entry.id === 'paper-10')).toBe(true)
    expect(group.hiddenCount).toBe(4)
  })
})
