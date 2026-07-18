import { ArrowLeft, Code2, ExternalLink, FileText, GitBranch } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { InstitutionMark } from '../components/InstitutionMark'
import { assetUrl, atlas, formatMonthYear, getPaper, getRelationsForPaper, routePath } from '../lib/data'

export function PaperDetailPage() {
  const { id } = useParams()
  const paper = id ? getPaper(id) : undefined
  if (!paper) return <Navigate to="/papers" replace />

  const bodyHtml = paper.body_html
    .split('src="paper-assets/').join(`src="${assetUrl('paper-assets/')}`)
    .split('href="/relations/"').join(`href="${routePath('/relations/')}"`)
  const relations = getRelationsForPaper(paper.id)

  return (
    <div className="paper-detail page-shell">
      <Link className="back-link" to="/papers"><ArrowLeft size={15} aria-hidden="true" />Back to paper index</Link>
      <header className="paper-detail__header">
        <div>
          <p className="eyebrow">{paper.short_title} · first public {formatMonthYear(paper.date)}</p>
          <h1>{paper.title}</h1>
          <p className="paper-detail__authors">{paper.authors.join(' · ')}</p>
        </div>
        <InstitutionMark ids={paper.institutions} />
      </header>

      <div className="paper-detail__layout">
        <aside className="paper-metadata">
          <dl>
            <div><dt>Venue</dt><dd>{paper.venue} ({paper.year})</dd></div>
            <div><dt>Primary lens</dt><dd>{atlas.taxonomy.dimensions[paper.primary_dimension]?.label}</dd></div>
            <div><dt>Problems</dt><dd>{paper.problems.join(' · ')}</dd></div>
          </dl>
          <div className="paper-metadata__links">
            <a href={paper.paper_url} target="_blank" rel="noreferrer"><FileText size={15} />Paper<ExternalLink size={13} /></a>
            {paper.code_url && <a href={paper.code_url} target="_blank" rel="noreferrer"><Code2 size={15} />Code<ExternalLink size={13} /></a>}
          </div>
          <div className="paper-metadata__dimensions">
            <span>Research dimensions</span>
            {paper.dimensions.map((dimension) => <small key={dimension}>{atlas.taxonomy.dimensions[dimension]?.label}</small>)}
          </div>
        </aside>
        <article className="paper-note" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      </div>

      {relations.length > 0 && (
        <section className="paper-relations" aria-labelledby="paper-relations-title">
          <h2 id="paper-relations-title"><GitBranch size={20} aria-hidden="true" />Connected work</h2>
          <div>
            {relations.map((relation, index) => {
              const peerId = relation.from === paper.id ? relation.to : relation.from
              const peer = getPaper(peerId)
              return (
                <article key={`${relation.from}-${relation.to}-${index}`}>
                  <span>{atlas.taxonomy.relation_types[relation.type]?.label} · {atlas.taxonomy.dimensions[relation.dimension]?.label}</span>
                  <h3><Link to={`/papers/${peerId}`}>{peer?.short_title}: {peer?.title}</Link></h3>
                  <p>{relation.description}</p>
                </article>
              )
            })}
          </div>
          <Link className="paper-relations__all" to="/relations">Open the full relation graph <ExternalLink size={14} /></Link>
        </section>
      )}
    </div>
  )
}
