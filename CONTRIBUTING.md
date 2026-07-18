# Contributing to AHD Papers

Thank you for helping build a reliable map of LLM-driven automatic algorithm design. Contributions should optimize for research clarity, not collection size.

## What belongs here

An entry must have a public paper, preprint, or white paper and must use a large language model in an automatic algorithm-design, heuristic-design, program-search, optimization-modeling, or closely related discovery loop.

- Peer-reviewed papers, arXiv preprints, and public white papers are welcome.
- Software without an accompanying paper is not added as a paper entry.

## Add or update a paper

1. Copy `content/papers/_template/` to `content/papers/<paper-id>/`.
2. Use a stable ID without a year suffix and complete every required frontmatter field.
3. Write the note using the required sections.
4. Select existing institution IDs from `data/institutions.yml`.
5. Select taxonomy IDs from `data/taxonomy.yml`.
6. Optionally add one or more relations in `data/relations.yml`.
7. Run `npm run validate`, `npm run readme`, `npm test`, and `npm run build`.

## Short titles

`short_title` is a text field, not an uploaded asset. Prefer the official acronym and keep it between 2 and 20 characters. If a paper has no official acronym, propose a concise title and explain it in the pull request.

## Institutions and logos

Institution logos are optional. A paper must never be blocked because a logo is missing.

1. Reuse an existing institution ID whenever possible.
2. For a new institution, add its standard name, short name, initials, website, and accent color.
3. Leave `logo` empty unless you have a stable, appropriate local asset.
4. A logo is stored once in the institution registry, never once per paper.

The site renders `initials` when no logo exists. Paper rows display at most two marks and summarize additional affiliations.

## Images in paper notes

Use standard relative Markdown so the image works on GitHub and on the website:

```markdown
![Descriptive alternative text](./images/framework.png)

*What the figure shows. Source: original paper, Figure 2.*
```

- Put images inside the paper's `images/` directory.
- Include useful alternative text and a visible source line.
- Prefer a redrawn original explanation when a screenshot is not necessary.
- Do not commit paper PDFs.
- Keep individual images below 1 MB when practical.

Use one `paper_url` that links directly to the public PDF. The website displays it as **Paper**.

## Relations

Relations are independent records in `data/relations.yml`:

```yaml
- from: earlier-paper-id
  to: later-paper-id
  type: extends
  dimension: feedback
  description: The later paper adds a reflective feedback channel to the earlier search loop.
```

For directed types, `from` is always the earlier paper and `to` is the later paper, so arrows follow time. `concurrent-work` is undirected and uses a dashed line.

Do not invent new `type` or `dimension` values inside a paper PR. If no existing value is correct, open an issue proposing a new taxonomy entry with at least two concrete examples. Maintainers update the controlled vocabulary.

Avoid vague relations such as “both use LLMs.” A relation should identify the affected research dimension and explain the specific design connection.

## Writing standard

Every note should cover:

1. Why the research problem matters.
2. The core method and design object.
3. Main contributions.
4. Problems and evaluation setting.
5. Strengths and limitations.
6. Concrete improvement opportunities.
7. Connections to other papers in the atlas.

English is the primary public language in the first release. Keep claims factual, distinguish first-public dates from venue years, and do not infer priority from citation counts.

## Pull request checklist

- [ ] The ID is stable and matches the directory name.
- [ ] Title, authors, date, venue, and URLs are verified.
- [ ] Taxonomy and institution values already exist.
- [ ] Images are local, attributed, and reasonably compressed.
- [ ] Every relationship has a specific human-written explanation.
- [ ] `npm run validate` passes.
- [ ] `npm run readme` has been run.
- [ ] `npm test` and `npm run build` pass.
