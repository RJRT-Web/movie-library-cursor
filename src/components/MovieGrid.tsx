import type { Movie } from '../types/movie';
import MovieCard from './MovieCard';
import '../css/MovieGrid.css';

interface MovieGridProps {
  movies: Movie[];
  isFavorite?: (id: number) => boolean;
  onFavoriteClick?: (movie: Movie) => void;
}

function MovieGrid({ movies, isFavorite, onFavoriteClick }: MovieGridProps) {
  return (
    <section className="movie-grid" role="list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-grid__item" role="listitem">
          <MovieCard
            movie={movie}
            isFavorite={isFavorite?.(movie.id)}
            onFavoriteClick={onFavoriteClick}
          />
        </div>
      ))}
    </section>
  );
}

export default MovieGrid;
