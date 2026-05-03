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

## Project layout (convention)

Folders under `src/` are introduced **when there is real code**—no empty placeholders:

| Path | Purpose |
|------|---------|
| `src/components/` | Reusable UI pieces (template includes `HelloWorld.vue` as a starter). |
| `src/composables/` | Composition API hooks (`use*.ts`) when added. |
| `src/views/` | Route-level pages when Vue Router is added. |
| `src/router/` | Router config when added. |
| `src/store/` | Optional client state (Pinia only if we need cross-route UI state). |

Server/async data is intended to live primarily in **TanStack Query** rather than a global store; see the phased plan for details.

## References

- [Vue 3 script setup](https://vuejs.org/api/sfc-script-setup.html)
- [Vite](https://vitejs.dev/)
- [Vue + TypeScript guide](https://vuejs.org/guide/typescript/overview.html)