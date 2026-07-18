# Contributing to Awesome LLM4AHD

Contributions should make the collection more accurate, easier to navigate, or clearer to read.

## Fastest workflow

You do not need Node.js or npm. Use the GitHub web editor or press `.` on the repository page to open `github.dev`, edit the content, and open a pull request. GitHub Actions will validate the files, regenerate the paper index, and deploy the website after merge.

See the [step-by-step contribution guide](docs/CONTRIBUTION_GUIDE.md) for:

- [adding a paper](docs/CONTRIBUTION_GUIDE.md#add-a-paper);
- [adding an image](docs/CONTRIBUTION_GUIDE.md#optional-images);
- [adding a relation](docs/CONTRIBUTION_GUIDE.md#add-a-relation);
- [choosing relation types and dimensions](docs/CONTRIBUTION_GUIDE.md#choose-the-classification).

## Scope

An entry must have a public paper, preprint, or technical report and use a large language model in automatic algorithm design, heuristic design, program search, optimization modeling, or a closely related discovery loop.

- Peer-reviewed papers and arXiv papers are both welcome.
- Software without an accompanying paper is not a paper entry.
- Link `paper_url` directly to the public PDF.
- Reuse controlled values from [`data/taxonomy.yml`](data/taxonomy.yml).
- Reuse institution IDs from [`data/institutions.yml`](data/institutions.yml) whenever possible.

## Content standard

Paper notes should cover motivation, core method, contributions, problems and evaluation, strengths and limitations, improvement opportunities, and connections to other work. Keep claims factual and distinguish the first-public date from the venue year.

Images are optional. When used, place them in the paper's `images/` directory, add useful alternative text, and cite the source visibly. Do not commit paper PDFs.

## Relations

Directed relations always run from the older paper (`from`) to the newer paper (`to`). `concurrent-work` is undirected. Every relation needs a specific explanation; “both use LLMs” is not sufficient.

Contributors must not invent new relation types or dimensions inside a paper pull request. If the controlled vocabulary does not fit, open an issue with two concrete examples for maintainer review.

## Pull request checklist

- [ ] Paper metadata and links are verified.
- [ ] The paper ID is stable and has no year suffix.
- [ ] Existing taxonomy and institution IDs are reused.
- [ ] Images, if present, are local and attributed.
- [ ] Relations point from older to newer work and include a clear explanation.
- [ ] Automated checks pass.

Local checks are optional; commands are provided in the [contribution guide](docs/CONTRIBUTION_GUIDE.md#optional-local-checks).
