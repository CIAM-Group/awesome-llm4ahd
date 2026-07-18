import { ArrowUpRight, GitBranch } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatMonthYear } from '../lib/data'
import type { Paper } from '../types'
import { InstitutionMark } from './InstitutionMark'

interface PaperNodeProps {
  paper: Paper
  side: 'left' | 'right'
  relatedCount: number
  focused: boolean
  dimmed: boolean
  onActivate: (id: string | null) => void
}

export function PaperNode({ paper, side, relatedCount, focused, dimmed, onActivate }: PaperNodeProps) {
  const classes = ['paper-node', `paper-node--${side}`]
  if (focused) classes.push('is-focused')
  if (dimmed) classes.push('is-dimmed')

  return (
    <div className={`timeline-paper timeline-paper--${side}`}>
      <Link
        to={`/papers/${paper.id}`}
        className={classes.join(' ')}
        onMouseEnter={() => onActivate(paper.id)}
        onMouseLeave={() => onActivate(null)}
        onFocus={() => onActivate(paper.id)}
        onBlur={() => onActivate(null)}
      >
        <span className="paper-node__topline">
          <InstitutionMark ids={paper.institutions} compact />
          <span>{formatMonthYear(paper.date)}</span>
        </span>
        <strong className="paper-node__short-title">{paper.short_title}</strong>
        <span className="paper-node__title">{paper.title}</span>
        <span className="paper-node__footer">
          <span>{paper.venue}</span>
          <span className="paper-node__relations"><GitBranch size={13} aria-hidden="true" />{relatedCount}</span>
        </span>
        <ArrowUpRight className="paper-node__arrow" size={17} aria-hidden="true" />
      </Link>
    </div>
  )
}
