# Contribution Guide

This guide covers papers, images, relations, and the controlled classification system. The shortest workflow happens entirely in the browser—no repository download, Node.js installation, or npm command is required.

## What automation handles

After you open a pull request, GitHub Actions checks the metadata, taxonomy values, relation endpoints, image paths, tests, and website build. After merge, automation:

1. regenerates the paper table in `README.md`;
2. regenerates `src/generated/content.json`;
3. rebuilds and deploys the website.

Do **not** edit the generated README table or `src/generated/content.json` by hand.

## Browser-only workflow

1. Fork the repository and create a branch in your fork.
2. On the repository page, press `.` to open `github.dev`.
3. Edit or create the files described below.
4. Open the Source Control panel, commit the changes, and create a pull request.
5. Read any validation error shown in the pull request and update the same branch.

The ordinary GitHub **Add file → Create new file** editor also works. `github.dev` is more convenient when a contribution contains several files or images.

## Add a paper

### 1. Choose a stable ID

Use the official method name in lowercase with hyphens:

- `reevo`
- `mcts-ahd`
- `method-name`

Do not add a year. The ID must remain stable when a preprint is later accepted by a venue.

### 2. Create the paper folder

Copy [`content/papers/_template/index.md`](../content/papers/_template/index.md) to:

```text
content/papers/<paper-id>/index.md
```

In `github.dev`, create the folder and file from the Explorer panel, then paste the template content.

### 3. Complete the metadata

The frontmatter at the top of `index.md` is the source of truth.

| Field | What to enter |
|---|---|
| `id` | The folder ID; both values must match. |
| `short_title` | Official acronym or a concise method name, 2–20 characters. |
| `title` | Full paper title. Quote it when it contains `:`. |
| `authors` | One author per YAML list item, in paper order. |
| `year` | Venue year, or expected venue year when confirmed. |
| `date` | First public date in `YYYY-MM-DD`, usually the first arXiv version. |
| `venue` | Venue abbreviation, `arXiv`, or a clear public-report label. |
| `paper_url` | Direct public PDF URL. |
| `code_url` | Optional; delete or comment out when code is unavailable. |
| `institutions` | Existing IDs from `data/institutions.yml`. |
| `primary_dimension` | The paper's main contribution lens. |
| `dimensions` | All directly relevant controlled dimensions. |
| `problems` | Concrete evaluated problems or application settings. |
| `featured` | `true` for a timeline landmark; otherwise `false`. |
| `summary` | One precise sentence describing the artifact, search, and contribution. |

Minimal example:

```yaml
---
id: method-name
short_title: METHOD
title: 'Method Name: Full Paper Title'
authors:
  - First Author
  - Second Author
year: 2026
date: 2026-01-15
venue: arXiv
paper_url: https://arxiv.org/pdf/0000.00000
# code_url: https://github.com/organization/project
institutions:
  - affiliation-pending
primary_dimension: search
dimensions:
  - search
  - feedback
problems:
  - Traveling Salesman Problem
featured: false
summary: The method uses reflective feedback to guide the search for executable routing heuristics.
---
```

### 4. Write the note

Keep the template headings. A useful note answers:

1. Why is the problem worth solving?
2. What artifact does the method design?
3. How are candidates proposed, evaluated, and improved?
4. Which problems and baselines are used?
5. What are the main strengths and limitations?
6. What could be improved?
7. How does the paper connect to existing entries?

Write claims that can be traced to the paper. Use plain Markdown so the same file remains readable on GitHub and on the website.

### 5. Add institutions only when necessary

First reuse an ID from [`data/institutions.yml`](../data/institutions.yml). If an institution is missing, add one record:

```yaml
institution-id:
  name: Full Institution Name
  short_name: Short Name
  initials: ABC
  website: https://example.edu/
  accent: '#315f58'
```

Logos are optional. Initials are the default visual mark, so a missing logo never blocks a paper contribution.

### Optional images

Create:

```text
content/papers/<paper-id>/images/
```

Drag the image into that folder in `github.dev`, then reference it relatively:

```markdown
![Framework overview](./images/framework.png)

*What the figure shows. Source: original paper, Figure 2.*
```

Use descriptive alternative text, include a visible source line, and keep each image below 1 MB when practical. Images and screenshots are optional; do not upload the paper PDF.

## Add a relation

Relations can be added with a paper or in a separate pull request. Edit [`data/relations.yml`](../data/relations.yml) and append one record:

```yaml
- from: earlier-paper-id
  to: later-paper-id
  type: extends
  dimension: feedback
  description: The later paper adds reflective feedback to the earlier evolutionary search loop.
```

Rules:

- For every directed type, `from` is older and `to` is newer.
- `concurrent-work` is undirected but still uses two valid paper IDs.
- Choose one type and the single dimension that best explains this connection.
- Describe the concrete methodological link in one or two sentences.
- Do not add a relation merely because two papers use an LLM or solve the same broad problem.

## Choose the classification

The vocabulary is fixed in [`data/taxonomy.yml`](../data/taxonomy.yml). Contributors select existing IDs; maintainers review proposed vocabulary changes separately.

### Relation types

| ID | Use it when… |
|---|---|
| `concurrent-work` | Independent papers appeared in the same research period and neither builds on the other. |
| `extends` | The later paper preserves the earlier framework and strengthens a core component. |
| `generalizes` | The later paper broadens tasks, distributions, artifacts, or system scale. |
| `adapts` | The later paper transfers a recognizable method to a new domain or design artifact. |
| `contrasts` | The later paper takes a meaningfully different design route on the same question. |
| `evaluated-by` | The later paper explicitly analyzes or stress-tests the earlier method. |

### Dimensions

| ID | Central question |
|---|---|
| `historical` | Is the connection mainly about chronology or concurrent emergence? |
| `design-object` | Does it change what is designed: a function, heuristic, set, policy, or larger program? |
| `search` | Does it change generation, selection, diversity, exploration, or credit assignment? |
| `feedback` | Does it change the scores, reflection, memory, or behavior that guides improvement? |
| `scope` | Does it transfer or scale across instances, tasks, domains, artifacts, or systems? |

For a paper, choose `primary_dimension` by asking which single change best represents its main contribution. Add other values to `dimensions` only when the paper directly contributes to them. For a relation, choose the one dimension that explains why the edge exists.

If no type or dimension fits, open an issue with the two papers, the proposed definition, and at least two examples. Do not define a new value inside the paper entry.

## Update an existing paper

Edit its `content/papers/<paper-id>/index.md`. Keep the ID and folder name unchanged. Typical updates include a new venue, code link, corrected metadata, stronger note, added image, or new relation.

Do not change the first-public `date` when a preprint is accepted later; update `venue` and `year` instead.

## What the checks report

Common validation messages are intentionally direct:

- `frontmatter id must match directory name`: rename the folder or correct `id`.
- `unknown dimension`: select a value from `data/taxonomy.yml`.
- `unknown institution`: reuse or register an institution ID.
- `relation references unknown paper`: correct the `from` or `to` ID.
- `directed relation must run from earlier to later paper`: swap the endpoints.
- `missing image asset`: correct the relative path or upload the image.

Fix the source file and push again to the same pull-request branch; the checks rerun automatically.

## Optional local checks

Local setup is useful for maintainers but is not required for ordinary contributions. Node.js 20.19 or newer is required.

```bash
npm ci
npm run validate
npm test
npm run build
```

Run `npm run dev` only when you want a local website preview. Open `http://localhost:5173`.
