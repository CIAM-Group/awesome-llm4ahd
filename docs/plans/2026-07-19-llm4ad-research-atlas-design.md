# AHD Papers Design

## Product Positioning

AHD Papers is a paper-first, living map of large-language-model-driven automatic algorithm design. It must remain useful in plain GitHub Markdown while offering a richer static website for chronology, relationships, filtering, and paper-level reading notes.

The first release uses English as the primary public language for international discoverability. The content model remains compatible with future translated notes.

## Initial Scope

The first release contains nine seed papers:

1. AEL
2. FunSearch
3. EoH
4. ReEvo
5. MCTS-AHD
6. HSEvo
7. EoH-S
8. MLES
9. AlphaEvolve

arXiv and white papers are valid entries, with their venue recorded directly. Software without an accompanying paper is not included in the paper collection.

## Information Architecture

The website exposes three primary views:

- **Timeline**: the default vertical research map, beginning with the 2023 origins and extending downward.
- **Relations**: a free-form interactive graph for exploring typed paper relationships.
- **Papers**: a dense, searchable index for direct retrieval and comparison.

Each paper also has a standalone detail page rendered from its Markdown note.

## Timeline Interaction

The homepage uses a vertical cubic Bezier spine. Each year is an independent layout region, so future years can be appended without repositioning old content. On desktop, papers alternate on either side of the spine; on mobile, the spine moves to the left and papers occupy a single readable column.

The overview retains every paper as a point but only labels curator-selected landmark papers. A year with excessive entries shows landmarks plus aggregated dimension counts until the reader expands it. Institution logos are optional; missing logos fall back to compact institutional initials.

The timeline does not render every relationship by default. Selecting a paper highlights only its local, curated relationships. The complete graph belongs in the Relations view.

## Data Model

Each paper is a GitHub-readable Markdown file with YAML frontmatter. The file contains stable identity, bibliographic metadata, an official short title, institutions, research dimensions, problems, one direct paper PDF URL, optional code, and a curated summary. Standard relative Markdown images are supported from a colocated `images/` folder.

Relationships are stored separately from paper notes. A relation has:

- `from`: earlier paper ID
- `to`: later paper ID
- `type`: a controlled semantic relation
- `dimension`: the research aspect in which the relation applies
- `description`: concise human-authored justification

Directed arrows always follow time from older to newer work. The AEL-FunSearch relation is `concurrent-work`, is rendered without an arrow, and records their late-2023 public dates. No EoH-FunSearch relation is created in the initial dataset.

Both relation types and dimensions are machine-readable dictionaries with labels, descriptions, usage guidance, counterexamples, and directionality where applicable. Contributors may only select defined values. New values require maintainer review.

Institutions are maintained once in a central registry. Papers reference institution IDs. Logos are optional; the website displays registered fallback initials when a logo is absent.

## Visual Direction

The interface follows a scholarly-cartography aesthetic: cool paper white, dense black-green ink, serif editorial titles, compact sans-serif controls, hairline rules, and restrained categorical accents. The timeline is the main visual asset and working surface, not a marketing hero.

The design avoids decorative cards, oversized headlines, generic gradients, and permanently visible edge tangles. Motion is limited to a composed page entrance, path drawing, hover focus, graph settling, and reduced-motion-safe transitions.

## Contribution Flow

Students add or update a paper note, select controlled taxonomy values, add images beside the note when useful, and optionally propose relations. Validation rejects duplicate IDs, invalid taxonomy values, broken relation endpoints, missing image assets, and malformed metadata.

Institution logos are never required for paper submission. A missing institution is registered with its standard name and fallback initials; an official logo may be added once later.

## Operational Constraints

- The site is statically generated and deploys to GitHub Pages.
- No server, database, account, or secret is required.
- README and website content share the same Markdown source.
- Direct routes must work on GitHub Pages through a static fallback.
- Desktop and mobile layouts target WCAG AA contrast and keyboard-accessible alternatives for canvas interactions.
