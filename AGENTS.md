# Repository Guidelines

## Project Structure & Module Organization

This is a React 19 and TypeScript portfolio built with Vite. `src/main.tsx` mounts `src/App.tsx`, which composes the Home, Experience, and Projects sections.

- `src/home/`, `src/experience/`, and `src/projects/` contain section components, styles, and section-specific animation logic.
- `src/components/` holds shared controls and ASCII rendering; `src/hooks/` handles language, theme, and header behavior.
- `src/i18n/` defines English/Spanish labels, types, and ASCII titles. Experience translations live in `src/experience/content.ts`.
- `public/` contains SVGs, photographs, ASCII image pairs, and downloadable PDFs in `public/Cv/`. `src/assets/` contains imported assets. `dist/` is generated output.

## Build, Test, and Development Commands

Use Bun and retain `bun.lock` when changing dependencies.

- `bun install`: install dependencies.
- `bun run dev`: start Vite with hot module replacement.
- `bun run build`: run TypeScript project checks and generate `dist/`.
- `bun run lint`: run ESLint, including TypeScript, React Hooks, and React Refresh rules.
- `bun run preview`: serve the production build locally after building.

## Coding Style & Naming Conventions

Use two-space indentation, single quotes, and no statement-ending semicolons in TypeScript. Use `import type` for type-only imports. Keep component names in PascalCase, functions and variables in camelCase, and feature directories and hook filenames in kebab-case, such as `use-language.ts`.

Follow the existing `component.tsx` and `component.module.css` pairing. Reuse theme variables such as `--bg`, `--fg`, and `--acc`; update both locales when adding visible text. ESLint is configured in `eslint.config.js`; no dedicated formatter is configured.

## Testing Guidelines

There is currently no automated test framework, test script, or coverage threshold. Run build and lint for code changes, and report any toolchain failures explicitly. If adding automated tests, document the runner and command and use descriptive `*.test.ts` or `*.test.tsx` filenames.

Review UI changes in both languages and themes at 360, 768, 1024, and 1440 px. Check keyboard access, reduced motion, scroll animations, and image interactions. Canvas effects must clean up animation frames, observers, and listeners.

## Commit & Pull Request Guidelines

Follow the history's concise English imperative messages, such as `Add animated projects section`. Keep commits focused. Pull requests should explain the resulting behavior, link relevant issues, list validation results or blockers, and include screenshots for visible changes.
