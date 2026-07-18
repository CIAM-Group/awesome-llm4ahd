import fs from 'node:fs/promises'
import { buildContent } from './build-content.mjs'

const startMarker = '<!-- PAPER_TABLE:START -->'
const endMarker = '<!-- PAPER_TABLE:END -->'
const data = await buildContent({ write: false })
const readme = await fs.readFile('README.md', 'utf8')

const rows = data.papers.map((paper) => {
  const resources = [`[Paper](${paper.paper_url})`]
  if (paper.code_url) resources.push(`[Code](${paper.code_url})`)
  return `| [${paper.short_title}](content/papers/${paper.id}/index.md) | ${paper.date.slice(0, 7)} | ${paper.venue} ${paper.year} | ${data.taxonomy.dimensions[paper.primary_dimension].label} | ${resources.join(' · ')} |`
}).join('\n')

const table = [
  startMarker,
  '| Paper | First public | Venue | Primary lens | Resources |',
  '|---|---:|---|---|---|',
  rows,
  endMarker,
].join('\n')

if (!readme.includes(startMarker) || !readme.includes(endMarker)) {
  throw new Error('README paper-table markers are missing')
}

const withTable = `${readme.slice(0, readme.indexOf(startMarker))}${table}${readme.slice(readme.indexOf(endMarker) + endMarker.length)}`
const output = withTable
  .replace(/curated_papers-\d+-176b63/, `curated_papers-${data.papers.length}-176b63`)
  .replace(/typed_relations-\d+-285da8/, `typed_relations-${data.relations.length}-285da8`)
await fs.writeFile('README.md', output)
console.log(`Updated README with ${data.papers.length} papers.`)
