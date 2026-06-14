# AGENTS.md

## Cursor Cloud specific instructions

This is a single static website built with **Eleventy (11ty) v0.12** (no backend, no database). Package manager is **Yarn** (`yarn.lock`).

### Run / build / serve
- Dev server: `yarn dev` (Eleventy `--serve`). Serves `_site/` at `http://localhost:8080` (Browsersync UI on `:3001`) with hot reload.
- Production build: `yarn build` → outputs to `_site/`.
- There are no automated tests; `yarn test` is a placeholder that intentionally exits 1.

### Non-obvious gotchas
- Eleventy input dir is `src/` only. `init.md` lives at the repo root and is **not** part of the build (root files outside `src/` are ignored).
- Available layouts are in `src/_includes/layouts/`: `base.njk`, `top.njk`, `works.njk`. There is **no `blog.njk`**, even though `.eleventy.js` registers a `blog` layout alias and `init.md` references `layouts/blog.njk`. New content should use `layout: layouts/works.njk` (works entries are the supported content type) or `layouts/base.njk`.
- The Google Fonts and Twitter-embed Eleventy plugins fetch remote data at build time, so builds expect network access.
- Eleventy 0.12 is old but runs fine on the installed Node (v22).
