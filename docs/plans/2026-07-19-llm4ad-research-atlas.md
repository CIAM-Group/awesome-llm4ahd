# AHD Papers Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the first GitHub repository and GitHub Pages release of a paper-first LLM automatic algorithm design research atlas.

**Architecture:** Use a Vite 8 React static application on Node 20.19 or newer. A build-time content pipeline validates Markdown/YAML, sanitizes rendered notes, copies colocated paper images, generates browser-ready JSON, and keeps the README synchronized. React renders the vertical timeline, canvas relation graph, index, and detail routes from the generated data.

**Tech Stack:** React 18, TypeScript, Vite 8, React Router, react-force-graph-2d, Zod, gray-matter, YAML, Marked, sanitize-html, Vitest, GitHub Actions.

---

### Task 1: Repository and content pipeline

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `scripts/build-content.mjs`
- Create: `scripts/validate-content.mjs`
- Create: `src/generated/content.json`

**Steps:**
1. Define Node-20-compatible pinned dependencies and scripts.
2. Implement Markdown and YAML loading with Zod validation.
3. Sanitize generated HTML and rewrite/copy relative image assets.
4. Reject unknown taxonomy values and broken relation endpoints.
5. Run `npm run content` and expect a valid generated JSON bundle.

### Task 2: Curated seed content

**Files:**
- Create: `content/papers/*/index.md`
- Create: `content/papers/*/images/`
- Create: `data/taxonomy.yml`
- Create: `data/institutions.yml`
- Create: `data/relations.yml`

**Steps:**
1. Add the nine agreed seed papers with verified metadata and stable IDs.
2. Add controlled relation and dimension definitions with contributor guidance.
3. Encode the AEL-FunSearch symmetric concurrent relation and omit EoH-FunSearch.
4. Add conservative, evidence-aligned relations among later papers.
5. Add institution registry entries with initials fallback.
6. Add and attribute representative paper images.
7. Run `npm run validate` and expect no schema or reference errors.

### Task 3: Application shell and design system

**Files:**
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles/global.css`
- Create: `src/components/SiteHeader.tsx`
- Create: `src/components/SiteFooter.tsx`

**Steps:**
1. Create an accessible router-aware application shell.
2. Implement scholarly typography, colors, spacing, focus states, and responsive rules.
3. Add Timeline, Relations, and Papers navigation with icons and active states.
4. Verify keyboard navigation and reduced-motion behavior.

### Task 4: Vertical research timeline

**Files:**
- Create: `src/pages/TimelinePage.tsx`
- Create: `src/components/TimelineYear.tsx`
- Create: `src/components/PaperNode.tsx`
- Create: `src/lib/timeline.ts`
- Test: `src/lib/timeline.test.ts`

**Steps:**
1. Write tests for chronological grouping and dense-year landmark aggregation.
2. Run `npm test` and verify the initial failure.
3. Implement year grouping and stable paper ordering.
4. Render year-local Bezier segments and alternating desktop lanes.
5. Add landmark labels, institution marks, local relation focus, and year navigation.
6. Run `npm test` and expect the timeline tests to pass.

### Task 5: Relation graph, index, and paper details

**Files:**
- Create: `src/pages/RelationsPage.tsx`
- Create: `src/components/RelationGraph.tsx`
- Create: `src/pages/PapersPage.tsx`
- Create: `src/pages/PaperDetailPage.tsx`
- Create: `src/components/InstitutionMark.tsx`
- Create: `src/components/FilterBar.tsx`

**Steps:**
1. Build a responsive force-directed graph with deterministic starting positions.
2. Render concurrent links without arrows and direct all other arrows from older to newer papers.
3. Add relation/dimension filters, search, click navigation, and an accessible paper selector.
4. Build a searchable, filterable paper table with an explicit empty state.
5. Render sanitized Markdown, metadata, resources, images, and related papers.
6. Verify desktop and mobile layouts without overlaps.

### Task 6: Repository documentation and deployment

**Files:**
- Create: `README.md`
- Create: `CONTRIBUTING.md`
- Create: `content/papers/_template/index.md`
- Create: `.github/workflows/deploy-pages.yml`
- Create: `.github/ISSUE_TEMPLATE/add-paper.yml`
- Modify: `.gitignore`

**Steps:**
1. Document scope, taxonomy, seed collection, local development, and contribution workflow.
2. Provide a complete paper-note template including relative image syntax.
3. Add a structured paper-submission issue form.
4. Add validation/build and GitHub Pages deployment workflow.
5. Ensure Vite uses the repository base path in Actions.

### Task 7: Verification and handoff

**Files:**
- Create: `tests/visual-smoke.mjs`
- Create: `artifacts/screenshots/` (ignored)

**Steps:**
1. Run `npm test`, `npm run typecheck`, `npm run validate`, and `npm run build`.
2. Start the production preview and run browser smoke checks for every route.
3. Capture and inspect desktop and mobile screenshots of Timeline, Relations, Papers, and one detail page.
4. Check canvas pixels to ensure the relation graph is nonblank.
5. Fix any overflow, collision, contrast, or interaction issues and repeat verification.
6. Start the local development server and report its URL.
