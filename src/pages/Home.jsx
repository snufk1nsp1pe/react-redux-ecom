import { useEffect, useMemo, useState } from 'react';
import './Home.css';
import ProductCard from '../components/ProductCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import CategoryFilter from '../components/CategoryFilter.jsx';
import { fetchProducts } from '../api/products';

function Home() {
  // Search term and category filter are purely local UI state: nothing
  // outside this page needs to know about them, so Redux isn't necessary here.
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchProducts()
      .then((data) => {
        if (!cancelled) {
          setProducts(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || 'Could not load products');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero-inner">
          <h1>Flowers for your soul, socks for your sole.</h1>
          <p>A groovy little shop with fresh blooms and cozy, colorful socks</p>
        </div>
      </section>

      <section className="container">
        <div className="filters-row">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {loading ? (
          <p className="empty-message">Loading products…</p>
        ) : error ? (
          <p className="empty-message">{error}. Is the backend running on port 5000?</p>
        ) : filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <p className="empty-message">
            No products match your search. Try a different keyword or category.
          </p>
        )}
      </section>
    </div>
  );
}

export default Home;
