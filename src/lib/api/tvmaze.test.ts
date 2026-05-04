import { describe, vi, beforeEach, afterEach, expect, it } from 'vitest';
import {
  fetchShowCast,
  fetchShowDetail,
  fetchShowEpisodes,
  fetchShowsPage,
  searchShowsByName,
} from '@/lib/api/tvmaze.ts';

/**
 * Test boundary: This file validates the API layer contract (URL building, encoding, error handling)
 */
describe('tvmaze api module', () => {
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fetchShowsPage calls the correct URL and returns JSON', async () => {
    const mockPayload = [{ id: 1, name: 'Show One' }];
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => mockPayload,
    } as Response);

    const result = await fetchShowsPage(0);

    expect(fetchMock).toHaveBeenCalledWith('https://api.tvmaze.com/shows?page=0');
    expect(result).toEqual(mockPayload);
  });

  it('fetchShowsPage responds with descriptive error when request fails', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    await expect(fetchShowsPage(1)).rejects.toThrow(
      'TVMaze request failed with status 500 for /shows?page=1'
    );
  });

  it('fetchShowDetail calls detail endpoint with show id', async () => {
    const mockPayload = { id: 123, name: 'Detail Show' };
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => mockPayload,
    } as Response);

    const result = await fetchShowDetail(123);

    expect(fetchMock).toHaveBeenCalledWith('https://api.tvmaze.com/shows/123');
    expect(result).toEqual(mockPayload);
  });

  it('fetchShowCast calls correct URL and returns cast details', async () => {
    const mockPayload = [
      {
        person: { id: 1, name: 'Actor One', image: null },
        character: { id: 10, name: 'Character One', image: null },
      },
    ];
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => mockPayload,
    } as Response);

    const result = await fetchShowCast(11);

    expect(fetchMock).toHaveBeenCalledWith('https://api.tvmaze.com/shows/11/cast');
    expect(result).toEqual(mockPayload);
  });

  it('fetchShowEpisodes calls correct URL and returns episode list', async () => {
    const mockPayload = [
      { id: 1, name: 'Episode One', season: 1 },
      { id: 2, name: 'Episode Two', season: 2 },
    ];
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => mockPayload,
    } as Response);

    const result = await fetchShowEpisodes(11);

    expect(fetchMock).toHaveBeenCalledWith('https://api.tvmaze.com/shows/11/episodes');
    expect(result).toEqual(mockPayload);
  });

  it('searchShowsByName trims and URL-encodes the query', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response);

    await searchShowsByName('  mr robot & co  ');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.tvmaze.com/search/shows?q=mr%20robot%20%26%20co'
    );
  });
});
