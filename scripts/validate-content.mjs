import { buildContent } from './build-content.mjs'

try {
  const result = await buildContent({ write: false })
  console.log(`Content valid: ${result.papers.length} papers, ${result.relations.length} relations.`)
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
}
