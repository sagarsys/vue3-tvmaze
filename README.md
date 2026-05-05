# Vue 3 TVMaze

TVMaze is a TV show app, like Netflix, using Vue 3 and Typescript.
You can browse shows by genre (from the [TVMaze API](https://www.tvmaze.com/api)), view show details, and search a show by name.

Built with **Vue 3**, **Vite**, **TypeScript**

## Requirements

- **Node.js:** ≥ 20 (`package.json` → `engines`)
- **npm:** package manager (comes with Node.js)

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

Husky runs `lint-staged` on pre-commit, so staged files are auto-linted/formatted before commit.

## Project layout

| Path               | Purpose                           |
| ------------------ | --------------------------------- |
| `src/components/`  | Reusable UI pieces                |
| `src/composables/` | Composition API hooks (`use*.ts`) |
| `src/views/`       | Route-level pages                 |
| `src/router/`      | Router config                     |

## Deploy to Vercel

This project includes:

- `./vercel.json` rewrite rule for Vue Router history mode.
- GitHub Actions workflow at `.github/workflows/check-and-deploy.yml`.

### One-time setup

1. In the root directory, link the app with Vercel:

   ```bash
   vercel link
   ```

2. In GitHub repo settings, add these Actions secrets:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

### CI/CD behavior

On every push to `master` that changes `./**`, GitHub Actions will:

1. Run `npm ci`
2. Run `npm run lint`
3. Run `npm run test`
4. Deploy to Vercel production only if all checks pass
