# Repository Guidelines

## Project Structure & Module Organization

- Core Nuxt 4 app lives under `app/`: `pages/` defines routes, `components/` holds reusable UI, `layouts/` wraps shared chrome, `assets/` stores global styles (entry: `assets/css/main.css`) and media, and `utils/` is for small helpers.
- Markdown and structured content sit in `content/`; use frontmatter for metadata to keep page templates lean.
- Static files that must be served as-is belong in `public/`.
- Global configuration: `nuxt.config.ts` (modules, prerendering, CSS), `content.config.ts` (content defaults), and linting in `eslint.config.mjs`.

## Build, Test, and Development Commands

- `pnpm install` — install dependencies (postinstall runs `nuxt prepare`).
- `pnpm dev` — start the Nuxt dev server with HMR.
- `pnpm build` — production build.
- `pnpm preview` — preview the production build locally.
- `pnpm lint` / `pnpm lint:fix` — run ESLint (with Nuxt presets) and auto-fix where possible.
- `pnpm typecheck` — run Nuxt/TypeScript type checking.

## Coding Style & Naming Conventions

- TypeScript-first; prefer `<script setup lang="ts">` in Vue SFCs.
- Two-space indentation; keep imports ordered (builtin → external → internal) and avoid trailing commas per `eslint` stylistic rules.
- Components and composables: PascalCase filenames (`HeroBanner.vue`, `useScroll.ts`); pages/layouts: kebab-case (`about.vue`, `default.vue`).
- Keep UI logic in components and data fetching in page-level `async setup` or composables; reuse design tokens from `@nuxt/ui` when possible.

## Content, Assets, and SEO

- Store authored content in `content/` with descriptive slugs; include `title`, `description`, and `date` frontmatter for OG rendering.
- For images, prefer `@nuxt/image` components and place originals under `public/` or `assets/` as appropriate.
- Prerendered routes are defined in `nuxt.config.ts`; add new critical pages there when needed.

## Testing Guidelines

- No automated test suite is present yet; manually verify changes via `pnpm dev`.
- When adding tests, colocate `*.spec.ts` with the feature or under `tests/`, and target rendering/logic at the component level. Ensure type errors stay at zero before merging.

## Commit & Pull Request Guidelines

- Commit messages: short, present-tense imperatives (`Add hero animation`, `Fix nav focus trap`); keep related changes squashed.
- Before opening a PR, run `pnpm lint` and `pnpm typecheck`. Include a concise summary, linked issue (if any), and screenshots/recordings for UI changes.
- Describe any content schema updates and migration steps; note new environment variables or config flags explicitly.

## Others

- 用简体中文


## Skills
A skill is a set of local instructions to follow that is stored in a `SKILL.md` file. Below is the list of skills that can be used. Each entry includes a name, description, and file path so you can open the source for full instructions when using a specific skill.
### Available skills
- skill-creator: Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Codex's capabilities with specialized knowledge, workflows, or tool integrations. (file: $CODEX_HOME/skills/.system/skill-creator/SKILL.md)
- skill-installer: Install Codex skills into $CODEX_HOME/skills from a curated list or a GitHub repo path. Use when a user asks to list installable skills, install a curated skill, or install a skill from another repo (including private repos). (file: $CODEX_HOME/skills/.system/skill-installer/SKILL.md)
### How to use skills
- Discovery: The list above is the skills available in this session (name + description + file path). Skill bodies live on disk at the listed paths.
- Trigger rules: If the user names a skill (with `$SkillName` or plain text) OR the task clearly matches a skill's description shown above, you must use that skill for that turn. Multiple mentions mean use them all. Do not carry skills across turns unless re-mentioned.
- Missing/blocked: If a named skill isn't in the list or the path can't be read, say so briefly and continue with the best fallback.
- How to use a skill (progressive disclosure):
  1) After deciding to use a skill, open its `SKILL.md`. Read only enough to follow the workflow.
  2) When `SKILL.md` references relative paths (e.g., `scripts/foo.py`), resolve them relative to the skill directory listed above first, and only consider other paths if needed.
  3) If `SKILL.md` points to extra folders such as `references/`, load only the specific files needed for the request; don't bulk-load everything.
  4) If `scripts/` exist, prefer running or patching them instead of retyping large code blocks.
  5) If `assets/` or templates exist, reuse them instead of recreating from scratch.
- Coordination and sequencing:
  - If multiple skills apply, choose the minimal set that covers the request and state the order you'll use them.
  - Announce which skill(s) you're using and why (one short line). If you skip an obvious skill, say why.
- Context hygiene:
  - Keep context small: summarize long sections instead of pasting them; only load extra files when needed.
  - Avoid deep reference-chasing: prefer opening only files directly linked from `SKILL.md` unless you're blocked.
  - When variants exist (frameworks, providers, domains), pick only the relevant reference file(s) and note that choice.
- Safety and fallback: If a skill can't be applied cleanly (missing files, unclear instructions), state the issue, pick the next-best approach, and continue.
