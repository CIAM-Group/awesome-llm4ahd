import fs from 'node:fs/promises'
import { buildContent } from './build-content.mjs'

const startMarker = '<!-- PAPER_TABLE:START -->'
const endMarker = '<!-- PAPER_TABLE:END -->'
const data = await buildContent({ write: false })
const readme = await fs.readFile('README.md', 'utf8')

function escapeCell(value) {
  return String(value).replaceAll('|', '\\|').replaceAll('\n', ' ')
}

const rows = data.papers.map((paper) => {
  const resources = [`[Note](content/papers/${paper.id}/index.md)`]
  if (paper.code_url) resources.push(`[Code](${paper.code_url})`)
  const shownProblems = paper.problems.slice(0, 3).map((problem) => `\`${escapeCell(problem)}\``)
  if (paper.problems.length > 3) shownProblems.push(`+${paper.problems.length - 3}`)
  const paperLabel = `**${escapeCell(paper.short_title)}** — ${escapeCell(paper.title)}`
  return `| ${paper.date.slice(0, 7).replace('-', '.')} | [${paperLabel}](${paper.paper_url}) | ${escapeCell(paper.venue)} ${paper.year} | ${shownProblems.join(', ')} | ${data.taxonomy.dimensions[paper.primary_dimension].label} | ${resources.join(' · ')} |`
}).join('\n')

const table = [
  startMarker,
  '| Month | Paper | Venue | Problems | Focus | Resources |',
  '|:---:|---|:---:|---|:---:|:---:|',
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
