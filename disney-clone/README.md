# What To Watch

A sleek movie discovery site to finally settle the old debate of “what should we watch?” Search by title or explore by genre to quickly find something great. Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS, powered by The Movie Database (TMDB).

## Features
- **Search by title**: Type a query to see matching movies (`/search/[term]`).
- **Browse by genre**: Pick a genre and discover curated results (`/genre/[id]?genre=Name`).
- **Modern UI/UX**: Responsive layout, light/dark theme, and smooth carousels.
- **Curated carousels**: Upcoming, Popular, and Top Rated sections on the home page.
- **Image optimization**: Next.js Image with remote patterns for fast loading.

## Tech Stack
- **Framework**: Next.js 14 (App Router) + TypeScript
- **UI**: Tailwind CSS, Radix Primitives, shadcn/ui patterns
- **Theming**: next-themes (light/dark)
- **Carousels**: embla-carousel-react
- **Data**: TMDB API v3 endpoints with v4 Bearer auth

## Getting Started

### Prerequisites
- Node.js 18.17+ (Next 14 requirement)
- A TMDB account and a v4 API Read Access Token (Bearer token)
  - Create one at: https://www.themoviedb.org/settings/api

### 1) Clone and install
```bash
npm install
```

### 2) Configure environment variables
Create a `.env.local` file in the project root:
```bash
# TMDB v4 Read Access Token (starts with "eyJ...")
TMDB_API_KEY=YOUR_TMDB_V4_READ_ACCESS_TOKEN
```

This app authenticates requests with the `Authorization: Bearer <TMDB_API_KEY>` header (see `lib/getMovies.ts`).

### 3) Run the app
```bash
npm run dev
```
Open http://localhost:3000.

## Available Scripts
- `npm run dev` - start Next.js in development
- `npm run build` - build for production
- `npm run start` - run the production build
- `npm run lint` - run Next.js ESLint

## Project Structure (key paths)
- `app/page.tsx` - Home page with Upcoming, Popular, Top Rated carousels
- `app/search/[term]/page.tsx` - Search results page
- `app/genre/[id]/page.tsx` - Genre results page
- `components/` - UI components (Header, GenreDropdown, MoviesCarousel, MovieCard, etc.)
- `lib/getMovies.ts` - TMDB data-fetching helpers
- `app/globals.css` - Global Tailwind styles
- `next.config.js` - Next.js config (image remotePatterns)

## Data & API
All movie data is fetched from TMDB using server-side requests in the App Router.

Endpoints used (via `lib/getMovies.ts`):
- `GET /movie/upcoming`
- `GET /movie/top_rated`
- `GET /movie/popular`
- `GET /discover/movie` (with `with_genres`)
- `GET /search/movie` (with `query`)

Important: You must supply a valid TMDB v4 Read Access Token via `TMDB_API_KEY`.

## Routing
- `/` - Landing page with featured carousels
- `/search/[term]` - Search results, e.g. `/search/inception`
- `/genre/[id]?genre=Comedy` - Genre results; `id` is the TMDB genre ID

## Images
The app uses `next/image` with the following remote patterns (see `next.config.js`):
- `https://w.wallhaven.cc`
- `http://image.tmdb.org`
- `https://links.papareact.com`

If you display images from additional domains, add them to `images.remotePatterns`.

## Notes & Tips
- The search page also shows a “You may also enjoy” section with popular movies for discovery.
- Genre browsing relies on TMDB genre IDs; ensure your navigation passes the correct `id` and human-readable `genre` query.
- Caching: fetches use Next.js `revalidate` for lightweight caching on the server.

## Acknowledgements
- Data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/). This project uses the TMDB API but is not endorsed or certified by TMDB.

## License
This project is for educational/demo purposes. Choose and add a license if you plan to distribute.

