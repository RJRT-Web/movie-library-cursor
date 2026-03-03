import '../css/Nav.css';

type Page = 'home' | 'favorites';

interface NavProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  favoritesCount: number;
}

function Nav({ currentPage, onPageChange, favoritesCount }: NavProps) {
  return (
    <nav className="nav" aria-label="Main">
      <button
        type="button"
        className={`nav__link ${currentPage === 'home' ? 'nav__link--active' : ''}`}
        onClick={() => onPageChange('home')}
      >
        Home
      </button>
      <button
        type="button"
        className={`nav__link ${currentPage === 'favorites' ? 'nav__link--active' : ''}`}
        onClick={() => onPageChange('favorites')}
      >
        Favorites
        {favoritesCount > 0 && (
          <span className="nav__badge">{favoritesCount}</span>
        )}
      </button>
    </nav>
  );
}

export default Nav;
export type { Page };
