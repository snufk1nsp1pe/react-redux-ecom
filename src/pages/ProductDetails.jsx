import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./ProductDetails.css";
import QuantitySelector from "../components/QuantitySelector.jsx";
import { products } from "../data/products";
import { addToCart } from "../features/cart/cartSlice";
import { getCategoryPillClass } from "../utils/categoryStyle";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = products.find((p) => p.id === Number(id));

  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) {
    return (
      <div className="container product-details-missing">
        <p>We couldn&apos;t find that product.</p>
        <Link to="/" className="btn btn-primary">
          Back to shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    setJustAdded(true);
    // Reset the confirmation message after a couple of seconds.
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="container product-details">
      <Link to="/" className="back-link">
        &larr; Back to shop
      </Link>

      <div className="product-details-grid">
        <div className="product-details-image card">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-details-info">
          <span className={`pill ${getCategoryPillClass(product.category)}`}>
            {product.category}
          </span>
          <h1>{product.name}</h1>
          <p className="product-details-price">${product.price.toFixed(2)}</p>
          <p className="product-details-description">{product.description}</p>

          <div className="product-details-actions">
            <QuantitySelector
              quantity={quantity}
              onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
              onIncrease={() => setQuantity((q) => q + 1)}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>

          {justAdded && (
            <p className="added-confirmation">
              Added {quantity} to your cart ✓
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
