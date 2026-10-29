import "./CategoryFilter.css";

/**
 * Pill-style category filter. "All" plus every unique category from the catalog.
 */
function CategoryFilter({ categories, selectedCategory, onSelect }) {
  const options = ["All", ...categories];

  return (
    <div className="category-filter">
      {options.map((category) => (
        <button
          key={category}
          type="button"
          className={
            category === selectedCategory
              ? "category-pill active"
              : "category-pill"
          }
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
