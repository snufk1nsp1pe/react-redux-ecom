import "./SearchBar.css";

/**
 * Controlled search input. State lives in the parent (Home page) since it's
 * a simple, page-local concern that doesn't need to be in the Redux store.
 */
function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
      />
    </div>
  );
}

export default SearchBar;
