import type { TvMazeShowSummary } from '@/types/tvmaze.ts';
import {
  DASHBOARD_GENRES,
  type DashboardGenre,
  DEFAULT_GENRE_ROW_LIMIT,
} from '@/lib/domain/genres.ts';

/**
 * Groups shows by a curated genre list
 */
export function groupShowsByGenre(
  shows: TvMazeShowSummary[],
  genres: readonly DashboardGenre[] = DASHBOARD_GENRES
) {
  const groupedShows = {} as Record<DashboardGenre, TvMazeShowSummary[]>;
  const genreSet = new Set(genres);

  genres.forEach((genre) => {
    groupedShows[genre] = []; // init dict with empty arrays
  });

  shows.forEach((show) => {
    show.genres.forEach((genre) => {
      if (!genreSet.has(genre as DashboardGenre)) return; // skip shows that are not in the curated list
      groupedShows[genre as DashboardGenre].push(show);
    });
  });

  return groupedShows;
}

/**
 * Sorts shows by rating in descending order and excludes shows with no rating
 */
export function sortShowsByRatingDesc(shows: TvMazeShowSummary[]): TvMazeShowSummary[] {
  return shows
    .filter((show) => show.rating.average !== null)
    .sort((a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0));
}

/**
 * Caps the number of shows to a maximum limit for row rendering
 */
export function capShows(
  shows: TvMazeShowSummary[],
  limit: number = DEFAULT_GENRE_ROW_LIMIT
): TvMazeShowSummary[] {
  return shows.slice(0, Math.max(0, limit));
}
