# cs16.css

Extended CSS library based on Counter Strike 1.6 UI and originally developed by [ekmas](https://github.com/ekmas).

## Usage

Just import `cs16.min.css` via your favourite method. See the Development section for specific commands.

## Project structure

```
src/
  cs16.css          # source (edit this)
  index.css         # preview page layout only
dist/
  cs16.min.css      # built library (do not edit)
index.html          # demo preview
vite.config.js
package.json
```

## Development

```bash
pnpm install
pnpm build          # build dist/cs16.min.css only
pnpm dev            # dev preview at http://localhost:5173 (uses src/)
pnpm preview        # build + serve production preview at http://localhost:4173 (uses preview/)
```

The build uses [Lightning CSS](https://lightningcss.dev/) via Vite to minify, flatten nesting, and add vendor prefixes
for Chrome 109+,
Firefox 115+, and browsers with >= 0.25% global usage.
