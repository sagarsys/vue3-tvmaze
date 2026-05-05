import { describe, expect, it } from 'vitest';

import { groupEpisodesBySeason } from '@/lib/domain/seasons-grouping.ts';
import type { TvMazeEpisode } from '@/types/tvmaze';

function episode(
  overrides: Partial<TvMazeEpisode> & Pick<TvMazeEpisode, 'id' | 'season' | 'number' | 'name'>
): TvMazeEpisode {
  return {
    airdate: null,
    runtime: null,
    image: null,
    summary: null,
    rating: { average: null },
    ...overrides,
  };
}

describe('groupEpisodesBySeason', () => {
  it('returns empty array for no episodes', () => {
    expect(groupEpisodesBySeason([])).toEqual([]);
  });

  it('groups a single season and preserves episode order', () => {
    const input = [
      episode({ id: 1, season: 1, number: 2, name: 'Second' }),
      episode({ id: 2, season: 1, number: 1, name: 'First' }),
    ];

    const result = groupEpisodesBySeason(input);

    expect(result).toEqual([
      {
        season: 1,
        episodes: input,
      },
    ]);
  });

  it('sorts seasons ascending across multiple season numbers', () => {
    const s2 = episode({ id: 3, season: 2, number: 1, name: 'S2' });
    const s1 = episode({ id: 1, season: 1, number: 1, name: 'S1' });
    const s3 = episode({ id: 2, season: 3, number: 1, name: 'S3' });

    const result = groupEpisodesBySeason([s2, s1, s3]);

    expect(result.map((g) => g.season)).toEqual([1, 2, 3]);
    expect(result.map((g) => g.episodes.map((e) => e.id))).toEqual([[1], [3], [2]]);
  });
});
