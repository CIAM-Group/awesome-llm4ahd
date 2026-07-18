import { atlas } from '../lib/data'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p><strong>AHD Papers</strong> — a research map for automatic heuristic design.</p>
      <p>{atlas.papers.length} seed papers · {atlas.relations.length} curated relations · Apache-2.0</p>
    </footer>
  )
}
