import { describe, expect, it } from 'vitest';
import { capShows, groupShowsByGenre, sortShowsByRatingDesc } from '@/lib/domain/shows-grouping.ts';
import { DASHBOARD_GENRES } from '@/lib/domain/genres.ts';
import type { TvMazeShowSummary } from '@/types/tvmaze.ts';

function createShow(
  id: number,
  name: string,
  genres: string[],
  rating: number | null
): TvMazeShowSummary {
  return {
    id,
    name,
    genres,
    rating: { average: rating },
    image: null,
    summary: null,
  };
}

describe('shows-grouping domain helpers', () => {
  it('groupShowsByGenre initialises every curated genre key', () => {
    const grouped = groupShowsByGenre([]);

    expect(Object.keys(grouped as object)).toEqual([...DASHBOARD_GENRES]);
  });

  it('groupShowsByGenre excludes non-curated genres from grouped keys', () => {
    const shows = [
      createShow(1, 'A', ['Drama', 'Unknown'], 8.1),
      createShow(2, 'B', ['Comedy'], 7.2),
    ];
    const grouped = groupShowsByGenre(shows);

    expect(grouped).not.toHaveProperty('Unknown');
  });

  it('groupShowsByGenre keeps shows under matching curated genre', () => {
    const shows = [
      createShow(1, 'A', ['Drama', 'Unknown'], 8.1),
      createShow(2, 'B', ['Comedy'], 7.2),
    ];

    const grouped = groupShowsByGenre(shows);

    expect(grouped.Drama.map((show) => show.id)).toEqual([1]);
    expect(grouped.Comedy.map((show) => show.id)).toEqual([2]);
  });

  it('sortShowsByRatingDesc orders by rating highest first', () => {
    const shows = [
      createShow(1, 'Low', ['Drama'], 5.4),
      createShow(2, 'High', ['Drama'], 9.1),
      createShow(3, 'Mid', ['Drama'], 7.3),
    ];

    const sorted = sortShowsByRatingDesc(shows);

    expect(sorted.map((show) => show.id)).toEqual([2, 3, 1]);
  });

  it('sortShowsByRatingDesc removes null-rated entries', () => {
    const shows = [
      createShow(1, 'No Rating', ['Drama'], null),
      createShow(2, 'Rated', ['Drama'], 8.0),
    ];

    const sorted = sortShowsByRatingDesc(shows);

    expect(sorted.length).toEqual(1);
    expect(sorted.map((show) => show.id)).toEqual([2]);
  });

  it('capShows limits result length', () => {
    const shows = [
      createShow(1, 'A', ['Drama'], 8.0),
      createShow(2, 'B', ['Drama'], 7.0),
      createShow(3, 'C', ['Drama'], 6.0),
    ];

    const capped = capShows(shows, 2);

    expect(capped.length).toEqual(2);
    expect(capped.map((show) => show.id)).toEqual([1, 2]);
  });
});
