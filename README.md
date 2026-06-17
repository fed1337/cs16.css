# cs16.css

Extended CSS library based on Counter Strike 1.6 UI and originally developed by [ekmas](https://github.com/ekmas).

## Installation


## Project structure

```
ArialPixel.ttf
index.html          # preview page
package.json
scripts/build-css.mjs
src/
  cs16.css          # source (edit this)
  index.css         # preview page layout only
dist/
  cs16.min.css      # built library (do not edit)
  index.html        # preview page
  index.css         # sample layout
```

## Development

```bash
pnpm install
pnpm build  # build dist/cs16.min.css + dist preview files
pnpm dev            # dev preview at http://localhost:5173 (uses src/)
pnpm preview        # production preview at http://localhost:4173 (serves dist/)
```

Edit `src/cs16.css`, then run `pnpm run build` before previewing the built CSS.

The build uses [Lightning CSS](https://lightningcss.dev/) to minify, flatten nesting, and add vendor prefixes for Chrome 109+ and Firefox 115+.
