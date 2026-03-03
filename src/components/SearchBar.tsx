import { useState, useEffect } from 'react';
import '../css/SearchBar.css';

export type SortFilter = 'popularity' | 'rating' | 'release_date';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSortChange: (sort: SortFilter) => void;
  sort: SortFilter;
}

const DEBOUNCE_MS = 350;

function SearchBar({ onSearch, onSortChange, sort }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const id = setTimeout(() => onSearch(inputValue.trim()), DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [inputValue, onSearch]);

  return (
    <div className="search-bar">
      <div className="search-bar__input-wrap">
        <svg
          className="search-bar__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="search"
          className="search-bar__input"
          placeholder="Search movies…"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          aria-label="Search movies"
        />
      </div>
      <div className="search-bar__filter-wrap">
        <label htmlFor="sort-filter" className="search-bar__label">
          Sort by
        </label>
        <select
          id="sort-filter"
          className="search-bar__select"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortFilter)}
        >
          <option value="popularity">Popularity</option>
          <option value="rating">Rating</option>
          <option value="release_date">Release Date</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
