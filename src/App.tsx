import { useState, useEffect, useCallback } from 'react';
import { fetchPopularMovies, searchMovies } from './api/tmdb';
import MovieGrid from './components/MovieGrid';
import SearchBar, { type SortFilter } from './components/SearchBar';
import Banner from './components/Banner';
import Nav, { type Page } from './components/Nav';
import Footer from './components/Footer';
import FavoritesPage from './pages/FavoritesPage';
import { useFavorites } from './context/FavoritesContext';
import type { Movie } from './types/movie';
import './css/App.css';

function sortMovies(movies: Movie[], sort: SortFilter): Movie[] {
  const copy = [...movies];
  switch (sort) {
    case 'rating':
      return copy.sort((a, b) => b.vote_average - a.vote_average);
    case 'release_date':
      return copy.sort(
        (a, b) =>
          new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    case 'popularity':
    default:
      return copy.sort((a, b) => b.popularity - a.popularity);
  }
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState<SortFilter>('popularity');
  const [page, setPage] = useState<Page>('home');

  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const loadMovies = useCallback((query: string) => {
    setLoading(true);
    setError(null);
    const fetcher = query.trim()
      ? searchMovies(query)
      : fetchPopularMovies();
    fetcher
      .then((data) => setMovies(data.results))
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Failed to load')
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (page === 'home') loadMovies(searchQuery);
  }, [searchQuery, page, loadMovies]);

  const handleFavoriteClick = useCallback(
    (movie: Movie) => {
      if (isFavorite(movie.id)) {
        removeFavorite(movie.id);
      } else {
        addFavorite(movie);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  const displayMovies = sortMovies(movies, sort);

  return (
    <div className="app">
      <Banner>
        <Nav
          currentPage={page}
          onPageChange={setPage}
          favoritesCount={favorites.length}
        />
      </Banner>

      {page === 'home' && (
        <SearchBar
          onSearch={setSearchQuery}
          onSortChange={setSort}
          sort={sort}
        />
      )}

      <div className="app__main-wrap">
        <div className="app__main-curtain app__main-curtain--left" aria-hidden />
        <main className="app__main">
          <div key={page} className="app__page">
            {page === 'favorites' ? (
              <FavoritesPage />
            ) : (
              <>
                {loading && (
                  <div className="app__loading" aria-live="polite">
                    <div className="app__spinner" />
                    <span>Loading movies…</span>
                  </div>
                )}
                {error && (
                  <div className="app__error" role="alert">
                    {error}
                  </div>
                )}
                {!loading && !error && displayMovies.length > 0 && (
                  <MovieGrid
                    movies={displayMovies}
                    isFavorite={isFavorite}
                    onFavoriteClick={handleFavoriteClick}
                  />
                )}
                {!loading && !error && displayMovies.length === 0 && (
                  <p className="app__empty">No movies found.</p>
                )}
              </>
            )}
          </div>
        </main>
        <div className="app__main-curtain app__main-curtain--right" aria-hidden />
      </div>

      <Footer />
    </div>
  );
}

export default App;
