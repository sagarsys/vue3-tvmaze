import type { TvMazeShowSummary } from '@/types/tvmaze';

export interface PickTopRatedShowsOptions {
  limit: number;
  minRating?: number;
}

/**
 * Returns the highest-rated unique shows.
 * Skips unrated shows, sorts by rating desc, and breaks ties by lower id.
 * filter rated → sort ranked → filter unique → limit
 */
export function pickTopRatedShows(
  shows: TvMazeShowSummary[],
  { limit, minRating = 0 }: PickTopRatedShowsOptions
): TvMazeShowSummary[] {
  if (limit <= 0) return [];

  const seenIds = new Set<number>();

  return [...shows]
    .filter((show) => {
      const rating = show.rating.average;
      return rating != null && rating >= minRating;
    })
    .sort((a, b) => {
      const ratingDelta = (b.rating.average ?? 0) - (a.rating.average ?? 0);
      return ratingDelta || a.id - b.id;
    })
    .filter((show) => {
      if (seenIds.has(show.id)) return false;

      seenIds.add(show.id);
      return true;
    })
    .slice(0, limit);
}
