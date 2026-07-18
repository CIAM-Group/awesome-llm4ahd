import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import matter from 'gray-matter'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'
import { parse } from 'yaml'
import { z } from 'zod'

const root = process.cwd()
const contentRoot = path.join(root, 'content', 'papers')
const dataRoot = path.join(root, 'data')
const generatedRoot = path.join(root, 'src', 'generated')
const publicRoot = path.join(root, 'public', 'paper-assets')

const relationTypeSchema = z.object({
  label: z.string().min(1),
  description: z.string().min(1),
  use_when: z.string().min(1),
  avoid_when: z.string().min(1),
  direction: z.enum(['directed', 'undirected']),
})

const dimensionSchema = z.object({
  label: z.string().min(1),
  description: z.string().min(1),
  prompt: z.string().min(1),
})

export const paperSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  short_title: z.string().min(2).max(20),
  title: z.string().min(5),
  authors: z.array(z.string().min(1)).min(1),
  year: z.number().int().min(1900).max(2100),
  date: z.preprocess(
    (value) => value instanceof Date ? value.toISOString().slice(0, 10) : value,
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  ),
  venue: z.string().min(1),
  paper_url: z.string().url(),
  code_url: z.string().url().optional(),
  institutions: z.array(z.string().min(1)).min(1),
  primary_dimension: z.string().min(1),
  dimensions: z.array(z.string().min(1)).min(1),
  problems: z.array(z.string().min(1)).min(1),
  featured: z.boolean(),
  summary: z.string().min(20),
})

const relationSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  type: z.string().min(1),
  dimension: z.string().min(1),
  description: z.string().min(20),
})

const institutionSchema = z.object({
  name: z.string().min(1),
  short_name: z.string().min(1),
  initials: z.string().min(1).max(5),
  website: z.string().url().optional(),
  logo: z.string().optional(),
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
})

async function readYaml(fileName) {
  return parse(await fs.readFile(path.join(dataRoot, fileName), 'utf8'))
}

async function listPaperFiles() {
  const entries = await fs.readdir(contentRoot, { withFileTypes: true })
  return entries
    .filter((entry) => entry.isDirectory() && entry.name !== '_template')
    .map((entry) => path.join(contentRoot, entry.name, 'index.md'))
}

function toErrorMessage(error) {
  if (error instanceof z.ZodError) {
    return error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ')
  }
  return error instanceof Error ? error.message : String(error)
}

function sanitize(markdownHtml) {
  return sanitizeHtml(markdownHtml, {
    allowedTags: [
      'a', 'blockquote', 'br', 'code', 'em', 'h1', 'h2', 'h3', 'h4', 'hr',
      'img', 'li', 'ol', 'p', 'pre', 'strong', 'table', 'tbody', 'td', 'th',
      'thead', 'tr', 'ul', 'figure', 'figcaption',
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'loading', 'width', 'height'],
      '*': ['class'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
  })
}

async function transformImages(tokens, paperId, paperDirectory, write) {
  const copyJobs = []
  marked.walkTokens(tokens, (token) => {
    if (token.type !== 'image' || typeof token.href !== 'string') return
    if (!token.href.startsWith('./images/')) return

    const relativeImage = path.normalize(token.href.slice(2))
    if (!relativeImage.startsWith(`images${path.sep}`) || relativeImage.includes(`..${path.sep}`)) {
      throw new Error(`${paperId}: image path must stay inside ./images/`)
    }
    const source = path.join(paperDirectory, relativeImage)
    const destinationRelative = path.join(paperId, relativeImage)
    const destination = path.join(publicRoot, destinationRelative)
    copyJobs.push(
      fs.access(source).catch(() => {
        throw new Error(`${paperId}: missing image asset ${token.href}`)
      }),
      write ? fs.mkdir(path.dirname(destination), { recursive: true }).then(() => fs.copyFile(source, destination)) : Promise.resolve(),
    )
    token.href = `paper-assets/${destinationRelative.split(path.sep).join('/')}`
  })
  await Promise.all(copyJobs)
}

export async function buildContent({ write = true } = {}) {
  const [taxonomy, institutions, relationsRaw] = await Promise.all([
    readYaml('taxonomy.yml'),
    readYaml('institutions.yml'),
    readYaml('relations.yml'),
  ])

  const relationTypes = z.record(relationTypeSchema).parse(taxonomy.relation_types)
  const dimensions = z.record(dimensionSchema).parse(taxonomy.dimensions)
  const institutionMap = z.record(institutionSchema).parse(institutions)
  const relations = z.array(relationSchema).parse(relationsRaw.relations)
  const paperFiles = await listPaperFiles()
  const papers = []
  const ids = new Set()
  const shortTitles = new Set()

  if (write) await fs.rm(publicRoot, { recursive: true, force: true })

  for (const paperFile of paperFiles) {
    const paperDirectory = path.dirname(paperFile)
    const paperId = path.basename(paperDirectory)
    const source = await fs.readFile(paperFile, 'utf8')
    const parsed = matter(source)
    let metadata
    try {
      metadata = paperSchema.parse(parsed.data)
    } catch (error) {
      throw new Error(`${paperId}: ${toErrorMessage(error)}`)
    }
    if (metadata.id !== paperId) throw new Error(`${paperId}: frontmatter id must match directory name`)
    if (ids.has(metadata.id)) throw new Error(`duplicate paper id: ${metadata.id}`)
    if (shortTitles.has(metadata.short_title.toLowerCase())) throw new Error(`duplicate short title: ${metadata.short_title}`)
    ids.add(metadata.id)
    shortTitles.add(metadata.short_title.toLowerCase())
    if (!institutionMap || metadata.institutions.some((id) => !institutionMap[id])) {
      throw new Error(`${paperId}: unknown institution in ${metadata.institutions.join(', ')}`)
    }
    if (!dimensions[metadata.primary_dimension]) throw new Error(`${paperId}: unknown primary dimension ${metadata.primary_dimension}`)
    if (metadata.dimensions.some((dimension) => !dimensions[dimension])) {
      throw new Error(`${paperId}: unknown dimension in ${metadata.dimensions.join(', ')}`)
    }

    const tokens = marked.lexer(parsed.content)
    await transformImages(tokens, metadata.id, paperDirectory, write)
    const bodyHtml = sanitize(marked.parser(tokens))
    papers.push({ ...metadata, body_html: bodyHtml })
  }

  const papersById = new Map(papers.map((paper) => [paper.id, paper]))
  for (const relation of relations) {
    if (!ids.has(relation.from) || !ids.has(relation.to)) {
      throw new Error(`relation references unknown paper: ${relation.from} -> ${relation.to}`)
    }
    if (!relationTypes[relation.type]) throw new Error(`unknown relation type: ${relation.type}`)
    if (!dimensions[relation.dimension]) throw new Error(`unknown relation dimension: ${relation.dimension}`)
    if (relationTypes[relation.type].direction === 'directed') {
      const fromPaper = papersById.get(relation.from)
      const toPaper = papersById.get(relation.to)
      if (fromPaper.date > toPaper.date) {
        throw new Error(`directed relation must run from earlier to later paper: ${relation.from} -> ${relation.to}`)
      }
    }
  }

  const generated = {
    version: 1,
    taxonomy: { relation_types: relationTypes, dimensions },
    institutions: institutionMap,
    relations,
    papers: papers.sort((a, b) => a.date.localeCompare(b.date) || a.short_title.localeCompare(b.short_title)),
  }
  if (write) {
    await fs.mkdir(generatedRoot, { recursive: true })
    await fs.writeFile(path.join(generatedRoot, 'content.json'), `${JSON.stringify(generated, null, 2)}\n`)
  }
  return generated
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const result = await buildContent()
    console.log(`Validated ${result.papers.length} papers, ${result.relations.length} relations, and ${Object.keys(result.institutions).length} institutions.`)
  } catch (error) {
    console.error(toErrorMessage(error))
    process.exitCode = 1
  }
}
