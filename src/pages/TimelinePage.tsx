import { Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { FilterBar } from '../components/FilterBar'
import { TimelineYear } from '../components/TimelineYear'
import { atlas } from '../lib/data'
import { groupPapersByTimelineYear, relationPeer, relationTouches } from '../lib/timeline'

export function TimelinePage() {
  const [query, setQuery] = useState('')
  const [dimension, setDimension] = useState('all')
  const [activePaperId, setActivePaperId] = useState<string | null>(null)
  const normalizedQuery = query.trim().toLowerCase()

  const filteredPapers = useMemo(() => atlas.papers.filter((paper) => {
    const matchesDimension = dimension === 'all' || paper.dimensions.includes(dimension)
    const searchable = [paper.short_title, paper.title, paper.summary, paper.venue, ...paper.authors, ...paper.problems].join(' ').toLowerCase()
    return matchesDimension && (!normalizedQuery || searchable.includes(normalizedQuery))
  }), [dimension, normalizedQuery])

  const groups = useMemo(() => groupPapersByTimelineYear(filteredPapers), [filteredPapers])
  const relatedPaperIds = useMemo(() => {
    if (!activePaperId) return new Set<string>()
    return new Set(atlas.relations.filter((relation) => relationTouches(relation, activePaperId)).map((relation) => relationPeer(relation, activePaperId)))
  }, [activePaperId])
  const years = groupPapersByTimelineYear(atlas.papers).map((group) => group.year)
  const latestYear = years.at(-1)

  const dimensionOptions = [
    { value: 'all', label: 'All dimensions' },
    ...Object.entries(atlas.taxonomy.dimensions).map(([value, definition]) => ({ value, label: definition.label })),
  ]

  return (
    <div className="timeline-page">
      <section className="atlas-intro">
        <div className="atlas-intro__copy">
          <p className="eyebrow">Automatic heuristic design</p>
          <h1>Follow the ideas,<br />not just the citations.</h1>
          <p className="atlas-intro__lede">Track how LLMs design, search, and improve algorithms.</p>
        </div>
        <div className="atlas-intro__facts" aria-label="Atlas statistics">
          <div><strong>{atlas.papers.length}</strong><span>curated papers</span></div>
          <div><strong>{atlas.relations.length}</strong><span>typed relations</span></div>
          <div><strong>{Object.keys(atlas.taxonomy.dimensions).length}</strong><span>research dimensions</span></div>
        </div>
      </section>

      <section className="timeline-workbench" aria-label="Research timeline">
        <div className="timeline-toolbar">
          <FilterBar
            query={query}
            onQueryChange={setQuery}
            placeholder="Search papers, authors, problems…"
            firstLabel="Dimension"
            firstValue={dimension}
            firstOptions={dimensionOptions}
            onFirstChange={setDimension}
            resultCount={filteredPapers.length}
          />
          <p className="timeline-toolbar__hint"><Sparkles size={14} aria-hidden="true" />Hover a paper to reveal its local lineage.</p>
        </div>

        <div className="timeline-layout">
          <aside className="year-index" aria-label="Jump to year">
            <span>Year</span>
            {years.map((year) => <a href={`#year-${year}`} key={year}>{year}</a>)}
            {latestYear && <a className="year-index__latest" href={`#year-${latestYear}`}>Latest</a>}
          </aside>
          <div className="timeline-map">
            {groups.length > 0 ? groups.map((group, index) => (
              <TimelineYear
                group={group}
                index={index}
                activePaperId={activePaperId}
                relatedPaperIds={relatedPaperIds}
                onActivate={setActivePaperId}
                key={group.year}
              />
            )) : (
              <div className="empty-state">
                <strong>No papers match this view.</strong>
                <p>Clear the search or choose another research dimension.</p>
                <button type="button" onClick={() => { setQuery(''); setDimension('all') }}>Reset filters</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
