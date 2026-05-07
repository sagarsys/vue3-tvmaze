# TVMaze

A Vue 3 + TypeScript TV discovery app powered by the [TVMaze API](https://www.tvmaze.com/api).

![TVMaze Screenshot desktop](./public/img/screenshot.png)

The app lets users browse TV shows grouped by genre, open detailed show pages, and search for shows by name. It is intentionally built as a small but production-minded SPA: typed API boundaries, cached server state, lazy-loaded routes, unit tests, linting, formatting, accessibility rules, and CI/CD deployment.

## Demo

Online: https://vue3-tvmaze.vercel.app/

## Features

- Browse TV shows grouped into genre rows
- Discover featured top-rated shows on the dashboard
- Sort genre rows by show rating for better discovery
- Search shows by name
- View individual show details
- Client-side routing with direct-link support
- Loading, error, and empty states handled through query state
- Responsive UI built with Tailwind CSS

## Tech stack

| Tool                                  | Why it is used                                                               |
| ------------------------------------- | ---------------------------------------------------------------------------- |
| **Vue 3**                             | Lightweight reactive UI layer with a simple component model                  |
| **TypeScript strict mode**            | Safer API handling and better editor feedback                                |
| **Vite**                              | Fast local development and optimized production builds                       |
| **Vue Router**                        | SPA navigation with lazy-loaded route views                                  |
| **TanStack Query**                    | Server-state ownership: fetching, caching, retries, loading and error states |
| **Tailwind CSS v4**                   | Utility-first styling without introducing a component framework              |
| **Vitest + Vue Test Utils**           | Fast unit and component tests close to the Vite/Vue toolchain                |
| **ESLint + Prettier**                 | Consistent code style and static checks                                      |
| **eslint-plugin-vuejs-accessibility** | Accessibility-focused lint rules for Vue templates                           |
| **Husky + lint-staged**               | Pre-commit quality checks for changed files                                  |
| **GitHub Actions + Vercel**           | Automated checks and production deployment                                   |

## Requirements

- Node.js `>= 24`
- npm

## Quick start

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Scripts

```bash
npm run test # Run unit tests with Vitest
npm run lint # Run ESLint, including Vue and accessibility rules
npm run lint:fix # Run ESLint with auto-fix
npm run format:check # Check formatting with Prettier
npm run format # Format files with Prettier
npm run build # Type-check with vue-tsc and build for production
npm run preview # Preview the production build locally
```

Husky and `lint-staged` are configured to run linting/formatting checks before commits.

## Project layout

| Path               | Role                                                   |
| ------------------ | ------------------------------------------------------ |
| `src/views/`       | Route-level pages: home, show details, search, and 404 |
| `src/components/`  | Reusable UI components                                 |
| `src/composables/` | Reusable Vue logic                                     |
| `src/lib/api/`     | TVMaze API fetch layer                                 |
| `src/lib/domain/`  | Pure domain helpers (unit tested)                      |
| `src/router/`      | Vue Router configuration with lazy-loaded views        |
| `src/types/`       | Shared TypeScript interfaces                           |

## Architecture notes

### SPA instead of SSR

This project is built as a client-rendered SPA.

That is a deliberate tradeoff: the app behaves more like a discovery dashboard than a search-engine-first content site, so SSR and SEO optimization are out of scope. Keeping it as an SPA reduces infrastructure complexity and keeps the focus on UI state, routing, API integration, and user interactions.

### Server state with TanStack Query

API data is handled by TanStack Query instead of manual `ref`/`watch` fetch logic.

This keeps data-fetching concerns in one place:

- request lifecycle
- loading states
- error states
- retries
- cache reuse
- background refetch behavior

It also avoids turning server data into global client state unnecessarily.

### No Pinia/global store

There is no dedicated global state library because the current app does not need one.

Most state naturally belongs to either:

- the **URL**, such as `/show/:id` and `/search?q=...`
- **TanStack Query**, for remote TVMaze data
- local component state, for small UI concerns

Adding Pinia would be reasonable if the app later introduced user accounts, watchlists, persisted preferences, authentication, or cross-page client-only state.

### Routing

The app uses Vue Router in history mode with these main routes:

- `/` — home/discovery page
- `/show/:id` — show detail page
- `/search?q=...` — search results
- catch-all route — 404 page

Route components are lazy-loaded so the initial JavaScript payload stays smaller.

### Styling approach

The app uses Tailwind CSS rather than a CSS framework or component library.

This keeps the UI lightweight and avoids coupling the project to prebuilt component behavior. It also makes the visual system easier to adjust directly in the Vue components.

## Interesting API topic: genre browsing

TVMaze does **not** provide a dedicated “shows by genre” endpoint.

Instead, the dashboard uses the paginated global show index:

```text
GET /shows?page=n
```

The same show index also powers the featured dashboard section. The app selects the highest-rated unique shows from the fetched results, skips unrated entries, and uses show id as a deterministic tie-breaker when ratings are equal.

### Tradeoff

Fetching more pages gives the dashboard better genre coverage and higher-quality rows, but it also increases network work and first-load time.

So the app chooses a practical middle ground: use enough paginated data to make the homepage useful, while keeping the initial experience responsive.

Search uses a separate TVMaze endpoint because TVMaze does provide name-based search:

```text
GET /search/shows?q=...
```

## Testing

The test suite focuses on the parts most likely to break or affect user behavior:

- pure domain logic, such as show grouping and sorting
- component behavior
- API-dependent flows with mocks where appropriate
- router/query-client setup where needed

Vitest is used because it fits naturally with Vite and provides a fast feedback loop.

End-to-end tests with Playwright would be a good future addition, especially for validating the complete browse/search/detail flows in a real browser.

## Deployment and CI/CD

This project includes a GitHub Actions workflow at: `.github/workflows/check-and-deploy.yml`

It also includes a Vercel configuration file: `vercel.json`

The Vercel rewrite sends all routes to `index.html`, which allows Vue Router history mode to work correctly in production when users open a deep link such as `/show/123`.

## Quality bar before shipping

Before deployment, these commands should pass:

```bash
npm run lint
npm run test
npm run build
```

## One-time Vercel setup

Link the project from the repository root:

```bash
vercel link
```

Then add the following GitHub Actions secrets in the repository settings:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Use real values in GitHub secrets only. Do not commit them to the repository.

## CI/CD behavior

On every push to `main`, GitHub Actions will:

1. Install dependencies with `npm ci`
2. Run ESLint
3. Run unit tests
4. Build the app
5. Deploy to Vercel production only if all checks pass

## Future improvements

Possible next steps:

- ~~Add a featured dashboard section with trending shows or top-rated shows~~
- Add Playwright E2E tests for browse, search, and detail flows
- Add skeleton loading states for smoother perceived performance
- Add user watchlists or favorites with persisted client state
- Add stronger empty/error-state design
- Add a dark mode toggle
