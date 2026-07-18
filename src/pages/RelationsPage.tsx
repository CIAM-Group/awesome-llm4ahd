import { GitBranch, MousePointer2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FilterBar } from '../components/FilterBar'
import { RelationGraph } from '../components/RelationGraph'
import { atlas, getPaper } from '../lib/data'

export function RelationsPage() {
  const [query, setQuery] = useState('')
  const [dimension, setDimension] = useState('all')
  const [relationType, setRelationType] = useState('all')
  const [selectedPaperId, setSelectedPaperId] = useState('')

  const filteredRelations = useMemo(() => atlas.relations.filter((relation) => {
    const matchesDimension = dimension === 'all' || relation.dimension === dimension
    const matchesType = relationType === 'all' || relation.type === relationType
    const searchable = [relation.description, getPaper(relation.from)?.title, getPaper(relation.to)?.title].join(' ').toLowerCase()
    return matchesDimension && matchesType && (!query.trim() || searchable.includes(query.trim().toLowerCase()))
  }), [dimension, query, relationType])

  const visiblePaperIds = useMemo(() => new Set(filteredRelations.flatMap((relation) => [relation.from, relation.to])), [filteredRelations])
  const visiblePapers = useMemo(() => atlas.papers.filter((paper) => visiblePaperIds.has(paper.id)), [visiblePaperIds])
  const selectedPaper = getPaper(selectedPaperId)

  const dimensionOptions = [{ value: 'all', label: 'All dimensions' }, ...Object.entries(atlas.taxonomy.dimensions).map(([value, item]) => ({ value, label: item.label }))]
  const typeOptions = [{ value: 'all', label: 'All relation types' }, ...Object.entries(atlas.taxonomy.relation_types).map(([value, item]) => ({ value, label: item.label }))]

  return (
    <div className="relations-page page-shell">
      <header className="page-heading">
        <p className="eyebrow">Curated connections</p>
        <h1>Research relations</h1>
        <p>Explore curated links between methods and research ideas.</p>
      </header>

      <FilterBar
        query={query}
        onQueryChange={setQuery}
        placeholder="Search relation descriptions…"
        firstLabel="Dimension"
        firstValue={dimension}
        firstOptions={dimensionOptions}
        onFirstChange={setDimension}
        secondLabel="Type"
        secondValue={relationType}
        secondOptions={typeOptions}
        onSecondChange={setRelationType}
        resultCount={filteredRelations.length}
      />

      {filteredRelations.length > 0 ? (
        <>
          <div className="graph-toolbar">
            <label>
              <MousePointer2 size={15} aria-hidden="true" />
              <span>Keyboard paper focus</span>
              <select value={selectedPaperId} onChange={(event) => setSelectedPaperId(event.target.value)}>
                <option value="">Choose a paper</option>
                {visiblePapers.map((paper) => <option value={paper.id} key={paper.id}>{paper.short_title} — {paper.title}</option>)}
              </select>
            </label>
            {selectedPaper && <Link to={`/papers/${selectedPaper.id}`}>Read {selectedPaper.short_title}</Link>}
          </div>
          <RelationGraph papers={visiblePapers} relations={filteredRelations} selectedPaperId={selectedPaperId} />
          <div className="relation-legend" aria-label="Relation line legend">
            <span><i className="relation-legend__line" />Solid · method relation</span>
            <span><i className="relation-legend__line relation-legend__line--dashed" />Dashed · concurrent work</span>
          </div>
          <section className="relation-register" aria-labelledby="relation-register-title">
            <h2 id="relation-register-title"><GitBranch size={19} aria-hidden="true" />Relation register</h2>
            {filteredRelations.map((relation, index) => {
              const from = getPaper(relation.from)
              const to = getPaper(relation.to)
              return (
                <article key={`${relation.from}-${relation.to}-${index}`}>
                  <span className="relation-register__type">{atlas.taxonomy.relation_types[relation.type]?.label}</span>
                  <h3><Link to={`/papers/${relation.from}`}>{from?.short_title}</Link><span aria-hidden="true">{atlas.taxonomy.relation_types[relation.type]?.direction === 'undirected' ? ' ↔ ' : ' → '}</span><Link to={`/papers/${relation.to}`}>{to?.short_title}</Link></h3>
                  <p>{relation.description}</p>
                </article>
              )
            })}
          </section>
        </>
      ) : (
        <div className="empty-state"><strong>No relations match this view.</strong><p>Try a broader relation type or research dimension.</p></div>
      )}
    </div>
  )
}
