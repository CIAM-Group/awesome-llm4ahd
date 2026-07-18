import { ArrowUpRight, Code2, FileText } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FilterBar } from '../components/FilterBar'
import { InstitutionMark } from '../components/InstitutionMark'
import { atlas, paperYear } from '../lib/data'

export function PapersPage() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [year, setYear] = useState(searchParams.get('year') ?? 'all')
  const [dimension, setDimension] = useState('all')

  const papers = useMemo(() => atlas.papers.filter((paper) => {
    const searchable = [paper.short_title, paper.title, paper.summary, paper.venue, ...paper.authors, ...paper.problems].join(' ').toLowerCase()
    return (year === 'all' || paperYear(paper) === Number(year))
      && (dimension === 'all' || paper.dimensions.includes(dimension))
      && (!query.trim() || searchable.includes(query.trim().toLowerCase()))
  }), [dimension, query, year])

  const years = [...new Set(atlas.papers.map(paperYear))].sort((first, second) => first - second)
  const yearOptions = [{ value: 'all', label: 'All public years' }, ...years.map((item) => ({ value: String(item), label: String(item) }))]
  const dimensionOptions = [{ value: 'all', label: 'All dimensions' }, ...Object.entries(atlas.taxonomy.dimensions).map(([value, item]) => ({ value, label: item.label }))]

  return (
    <div className="papers-page page-shell">
      <header className="page-heading">
        <p className="eyebrow">Curated research notes</p>
        <h1>Paper index</h1>
        <p>Search papers by year, topic, author, or venue.</p>
      </header>
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        placeholder="Search title, author, venue, or problem…"
        firstLabel="Public year"
        firstValue={year}
        firstOptions={yearOptions}
        onFirstChange={setYear}
        secondLabel="Dimension"
        secondValue={dimension}
        secondOptions={dimensionOptions}
        onSecondChange={setDimension}
        resultCount={papers.length}
      />
      {papers.length > 0 ? (
        <div className="paper-table-wrap">
          <table className="paper-table">
            <thead><tr><th>Paper</th><th>Institution</th><th>Public</th><th>Venue</th><th>Primary lens</th><th><span className="sr-only">Resources</span></th></tr></thead>
            <tbody>
              {papers.map((paper) => (
                <tr key={paper.id}>
                  <td><Link to={`/papers/${paper.id}`}><strong>{paper.short_title}</strong><span>{paper.title}</span></Link></td>
                  <td><InstitutionMark ids={paper.institutions} compact /></td>
                  <td>{paper.date.slice(0, 7)}</td>
                  <td>{paper.venue}</td>
                  <td>{atlas.taxonomy.dimensions[paper.primary_dimension]?.label}</td>
                  <td>
                    <span className="paper-table__resources">
                      <a href={paper.paper_url} target="_blank" rel="noreferrer" aria-label={`Open ${paper.short_title} paper`}><FileText size={14} />Paper</a>
                      {paper.code_url && <a href={paper.code_url} target="_blank" rel="noreferrer" aria-label={`Open ${paper.short_title} code`}><Code2 size={14} />Code</a>}
                      <Link to={`/papers/${paper.id}`} aria-label={`Read ${paper.short_title} note`}><ArrowUpRight size={14} />Note</Link>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state"><strong>No papers match this view.</strong><p>Try clearing the search or using a broader filter.</p></div>
      )}
    </div>
  )
}
