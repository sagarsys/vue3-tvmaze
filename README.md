# Vue 3 TVMaze

TVMaze is a TV show app, like Netflix, using Vue 3 and Typescript.
You can browse shows by genre (from the [TVMaze API](https://www.tvmaze.com/api)), view show details, and search a show by name.

Built with **Vue 3**, **Vite**, **TypeScript**

## Requirements

- **Node.js:** ≥ 20 (`package.json` → `engines`)
- **npm:** ships with Node

## Scripts

```bash
npm install
npm run dev      # dev server
npm run build    # typecheck + production build
npm run preview  # serve production build locally
```

## Linting & formatting

```bash
npm run lint          # run ESLint checks
npm run lint:fix      # auto-fix lint issues
npm run format:check  # verify Prettier formatting
npm run format        # apply Prettier formatting
```

## Project layout

| Path               | Purpose                           |
| ------------------ | --------------------------------- |
| `src/components/`  | Reusable UI pieces                |
| `src/composables/` | Composition API hooks (`use*.ts`) |
| `src/views/`       | Route-level pages                 |
| `src/router/`      | Router config                     |

## References

- [Vue 3 script setup](https://vuejs.org/api/sfc-script-setup.html)
- [Vite](https://vitejs.dev/)
- [Vue + TypeScript guide](https://vuejs.org/guide/typescript/overview.html)
