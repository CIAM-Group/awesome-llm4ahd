import { Layers3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getRelationsForPaper } from '../lib/data'
import type { TimelineGroup } from '../types'
import { PaperNode } from './PaperNode'

interface TimelineYearProps {
  group: TimelineGroup
  index: number
  activePaperId: string | null
  relatedPaperIds: Set<string>
  onActivate: (id: string | null) => void
}

export function TimelineYear({ group, index, activePaperId, relatedPaperIds, onActivate }: TimelineYearProps) {
  const path = index % 2 === 0
    ? 'M 50 0 C 80 25, 20 72, 50 100'
    : 'M 50 0 C 20 26, 80 74, 50 100'

  return (
    <section className="timeline-year" id={`year-${group.year}`} aria-labelledby={`year-title-${group.year}`}>
      <svg className="timeline-year__spine" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d={path} pathLength="1" />
      </svg>
      <div className="timeline-year__marker">
        <span>{group.year}</span>
        <small>{group.papers.length + group.hiddenCount} paper{group.papers.length + group.hiddenCount === 1 ? '' : 's'}</small>
      </div>
      <h2 className="sr-only" id={`year-title-${group.year}`}>{group.year} papers</h2>
      <div className="timeline-year__papers">
        {group.papers.map((paper, paperIndex) => {
          const side = paperIndex % 2 === index % 2 ? 'left' : 'right'
          const isActive = activePaperId === paper.id
          const isRelated = relatedPaperIds.has(paper.id)
          return (
            <PaperNode
              key={paper.id}
              paper={paper}
              side={side}
              relatedCount={getRelationsForPaper(paper.id).length}
              focused={isActive || (!!activePaperId && isRelated)}
              dimmed={!!activePaperId && !isActive && !isRelated}
              onActivate={onActivate}
            />
          )
        })}
      </div>
      {group.hiddenCount > 0 && (
        <Link className="timeline-cluster" to={`/papers?year=${group.year}`}>
          <Layers3 size={16} aria-hidden="true" />
          Explore {group.hiddenCount} more papers from {group.year}
        </Link>
      )}
    </section>
  )
}
