import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { addToCart } from "../features/cart/cartSlice";
import { getCategoryPillClass } from "../utils/categoryStyle";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  return (
    <div className="product-card card">
      <Link to={`/product/${product.id}`} className="product-card-image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>
      <div className="product-card-body">
        <span className={`pill ${getCategoryPillClass(product.category)}`}>
          {product.category}
        </span>
        <Link to={`/product/${product.id}`} className="product-card-name">
          <h3>{product.name}</h3>
        </Link>
        <div className="product-card-footer">
          <span className="product-card-price">
            ${product.price.toFixed(2)}
          </span>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
