import type { EpisodeSeasonGroup, TvMazeEpisode } from '@/types/tvmaze.ts';

/**
 * Groups episodes by season number.
 * Seasons are sorted in ascending order.
 * Episodes within a season keep the order they appear in the input array.
 */
export function groupEpisodesBySeason(episodes: TvMazeEpisode[]): EpisodeSeasonGroup[] {
  const seasonMap = new Map<number, TvMazeEpisode[]>();

  for (const episode of episodes) {
    const group = seasonMap.get(episode.season) ?? [];
    group.push(episode);
    seasonMap.set(episode.season, group);
  }

  return [...seasonMap.entries()]
    .sort(([a], [b]) => a - b)
    .map(([season, eps]) => ({ season, episodes: eps }));
}
