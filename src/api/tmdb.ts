import type { MoviesResponse } from '../types/movie';

const API_KEY = '788aa34acccccd06ecf1444711bed04c';
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export async function fetchPopularMovies(page = 1): Promise<MoviesResponse> {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  );
  if (!res.ok) throw new Error('Failed to fetch movies');
  return res.json();
}

export async function searchMovies(
  query: string,
  page = 1
): Promise<MoviesResponse> {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );
  if (!res.ok) throw new Error('Failed to search movies');
  return res.json();
}

export function getPosterUrl(path: string | null, size = 'w500'): string {
  if (!path) return '/placeholder-poster.svg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}
