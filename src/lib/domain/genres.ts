/**
 * Curated list of genres to display in the dashboard
 */
export const DASHBOARD_GENRES = [
  'Drama',
  'Comedy',
  'Action',
  'Crime',
  'Science-Fiction',
  'Thriller',
  'Horror',
  'Romance',
  'Adventure',
  'Sports',
  'Fantasy',
  'Mystery',
  'Family',
] as const;

export type DashboardGenre = (typeof DASHBOARD_GENRES)[number];

/**
 * Maximum number of genres to display in a single row
 */
export const DEFAULT_GENRE_ROW_LIMIT = 20;
