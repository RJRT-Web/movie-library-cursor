import type { Movie } from '../types/movie';
import { getPosterUrl } from '../api/tmdb';
import '../css/MovieCard.css';

interface MovieCardProps {
  movie: Movie;
  isFavorite?: boolean;
  onFavoriteClick?: (movie: Movie) => void;
}

function MovieCard({ movie, isFavorite, onFavoriteClick }: MovieCardProps) {
  const posterUrl = getPosterUrl(movie.poster_path);
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : '—';
  const rating = movie.vote_average > 0 ? movie.vote_average.toFixed(1) : '—';

  return (
    <article className="movie-card">
      <div className="movie-card__poster-wrap">
        {movie.poster_path ? (
          <img
            src={posterUrl}
            alt={`${movie.title} poster`}
            className="movie-card__poster"
            loading="lazy"
          />
        ) : (
          <div className="movie-card__poster movie-card__poster--placeholder">
            <p>No poster</p>
          </div>
        )}
        <div className="movie-card__overlay">
          <p className="movie-card__overview">{movie.overview}</p>
        </div>
        <div className="movie-card__rating">{rating}</div>
        {onFavoriteClick && (
          <button
            type="button"
            className={`movie-card__fav ${isFavorite ? 'movie-card__fav--active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteClick(movie);
            }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        )}
      </div>
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__year">{releaseYear}</p>
      </div>
    </article>
  );
}

export default MovieCard;
