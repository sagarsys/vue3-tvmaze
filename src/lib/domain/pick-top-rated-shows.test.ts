import { describe, expect, it } from 'vitest';
import { pickTopRatedShows } from './pick-top-rated-shows';
import type { TvMazeShowSummary } from '@/types/tvmaze';

const mockShows: TvMazeShowSummary[] = [
  {
    id: 1,
    name: 'Show A',
    genres: [],
    rating: { average: 8.5 },
    image: null,
    summary: null,
    premiered: null,
    status: null,
  },
  {
    id: 2,
    name: 'Show B',
    genres: [],
    rating: { average: 9.0 },
    image: null,
    summary: null,
    premiered: null,
    status: null,
  },
  {
    id: 3,
    name: 'Show C',
    genres: [],
    rating: { average: null },
    image: null,
    summary: null,
    premiered: null,
    status: null,
  },
  {
    id: 4,
    name: 'Show D',
    genres: [],
    rating: { average: 8.0 },
    image: null,
    summary: null,
    premiered: null,
    status: null,
  },
];

describe('pickTopRatedShows', () => {
  it('returns top-rated shows sorted by rating desc and ID for ties', () => {
    const result = pickTopRatedShows(mockShows, { limit: 2 });
    expect(result).toEqual([
      {
        id: 2,
        name: 'Show B',
        genres: [],
        rating: { average: 9.0 },
        image: null,
        summary: null,
        premiered: null,
        status: null,
      },
      {
        id: 1,
        name: 'Show A',
        genres: [],
        rating: { average: 8.5 },
        image: null,
        summary: null,
        premiered: null,
        status: null,
      },
    ]);
  });

  it('skips shows below the minimum rating', () => {
    const result = pickTopRatedShows(mockShows, { limit: 3, minRating: 8.5 });
    expect(result).toEqual([
      {
        id: 2,
        name: 'Show B',
        genres: [],
        rating: { average: 9.0 },
        image: null,
        summary: null,
        premiered: null,
        status: null,
      },
      {
        id: 1,
        name: 'Show A',
        genres: [],
        rating: { average: 8.5 },
        image: null,
        summary: null,
        premiered: null,
        status: null,
      },
    ]);
  });

  it('returns an empty array if limit is 0', () => {
    const result = pickTopRatedShows(mockShows, { limit: 0 });
    expect(result).toEqual([]);
  });
});
