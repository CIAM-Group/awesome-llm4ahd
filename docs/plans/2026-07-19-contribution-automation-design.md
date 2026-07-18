# Contribution Automation Design

## Goal

Make paper and relation contributions possible entirely through GitHub's web editor while keeping generated repository files and the deployed website synchronized.

## Public information structure

The README leads with scope and the paper table. It avoids comparisons with other repositories and priority statements. The interactive atlas, contribution entry points, citation, and license follow the collection itself.

The paper table is generated from Markdown metadata and shows first-public month, paper, venue, problems, main focus, note, and code. Paper titles link directly to PDFs.

## Contribution flow

Contributors create or edit Markdown and YAML through GitHub or `github.dev`, then open a pull request. They do not edit generated files and do not need Node.js.

Pull-request checks validate content, run tests, and build the site. After merge, a dedicated workflow regenerates `README.md` and `src/generated/content.json` and commits only when either file changed. The Pages workflow independently builds the original content push, so the website does not depend on the generated-file commit triggering another workflow.

## Guidance and errors

One detailed guide covers paper metadata, optional images, institutions, relations, fixed relation types, fixed dimensions, common validation errors, and optional local checks. `CONTRIBUTING.md` remains a short policy and navigation page.

The build validator continues to enforce stable IDs, known taxonomy and institution values, valid relation endpoints, older-to-newer directed edges, and existing image assets.
