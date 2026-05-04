import type {
  TvMazeCastMember,
  TvMazeEpisode,
  TvMazeSearchResult,
  TvMazeShowDetail,
  TvMazeShowSummary,
} from '@/types/tvmaze.ts';

const TVMAZE_BASE_URL = 'https://api.tvmaze.com';

/**
 * Fetches JSON from TVMaze API - throws descriptive error if request fails
 */
async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${TVMAZE_BASE_URL}${path}`);

  if (!response.ok)
    throw new Error(`TVMaze request failed with status ${response.status} for ${path}`);

  return (await response.json()) as T;
}

/**
 * Fetches one page of shows from TVMaze API
 */
export async function fetchShowsPage(page: number): Promise<TvMazeShowSummary[]> {
  return fetchJson<TvMazeShowSummary[]>(`/shows?page=${page}`);
}

/**
 * Fetches show details for a single show from TVMaze API
 */
export async function fetchShowDetail(showId: number): Promise<TvMazeShowDetail> {
  return fetchJson<TvMazeShowDetail>(`/shows/${showId}`);
}

/**
 * Fetches cast members for a single show from TVMaze API
 */
export async function fetchShowCast(showId: number): Promise<TvMazeCastMember[]> {
  return fetchJson<TvMazeCastMember[]>(`/shows/${showId}/cast`);
}

/**
 * Fetches episode list for a single show from TVMaze API
 */
export async function fetchShowEpisodes(showId: number): Promise<TvMazeEpisode[]> {
  return fetchJson<TvMazeEpisode[]>(`/shows/${showId}/episodes`);
}

/**
 * Searches for shows by name on TVMaze API
 */
export async function searchShowsByName(query: string): Promise<TvMazeSearchResult[]> {
  const encodedQuery = encodeURIComponent(query.trim());
  return fetchJson<TvMazeSearchResult[]>(`/search/shows?q=${encodedQuery}`);
}
