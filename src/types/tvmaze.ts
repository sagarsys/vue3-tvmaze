/**
 * Shared types from TVMaze API: https://www.tvmaze.com/api
 * Trimmed down to only the fields we need
 */

export interface TvMazeImage {
  medium: string | null;
  original: string | null;
}

export interface TvMazeRating {
  average: number | null;
}

export interface TvMazeShowSummary {
  id: number;
  name: string;
  genres: string[];
  rating: TvMazeRating;
  image: TvMazeImage | null;
  summary: string | null;
  premiered: string | null;
  status: string | null;
}

export interface TvMazeShowDetail extends TvMazeShowSummary {
  language: string | null;
  ended: string | null;
  runtime: number | null;
  url: string | null;
  network: {
    name: string | null;
  } | null;
  webChannel: {
    name: string | null;
  } | null;
}

export interface TvMazeCastMember {
  person: {
    id: number;
    name: string;
    image: TvMazeImage | null;
  };
  character: {
    id: number;
    name: string;
    image: TvMazeImage | null;
  };
}

export interface TvMazeEpisode {
  id: number;
  name: string;
  season: number;
  number: number;
  airdate: string | null;
  runtime: number | null;
  image: TvMazeImage | null;
  summary: string | null;
  rating: TvMazeRating;
}

export interface TvMazeSearchResult {
  score: number;
  show: TvMazeShowSummary;
}

export interface EpisodeSeasonGroup {
  season: number;
  episodes: TvMazeEpisode[];
}
