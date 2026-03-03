import MovieGrid from '../components/MovieGrid';
import { useFavorites } from '../context/FavoritesContext';
import '../css/FavoritesPage.css';

function FavoritesPage() {
  const { favorites, removeFavorite, isFavorite } = useFavorites();

  return (
    <div className="favorites-page">
      <h2 className="favorites-page__title">Favorites</h2>
      <p className="favorites-page__count">
        {favorites.length} movie{favorites.length !== 1 ? 's' : ''} saved
      </p>
      {favorites.length > 0 ? (
        <MovieGrid
          movies={favorites}
          isFavorite={isFavorite}
          onFavoriteClick={(m) => removeFavorite(m.id)}
        />
      ) : (
        <>
        <p className="favorites-page__empty">
          No favorites yet.
        </p>
        <p className="favorites-page__desc">Add movies from the home page. </p>
        </>
      )}
    </div>
  );
}

export default FavoritesPage;
