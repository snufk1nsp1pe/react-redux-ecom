import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Cart.css";
import QuantitySelector from "../components/QuantitySelector.jsx";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
  selectCartTotalPrice,
} from "../features/cart/cartSlice";
import { getCategoryPillClass } from "../utils/categoryStyle";

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);

  if (items.length === 0) {
    return (
      <div className="container cart-empty">
        <h1>Your cart is empty</h1>
        <p>Looks like you haven&apos;t added anything yet.</p>
        <Link to="/" className="btn btn-primary">
          Browse products
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
    // No backend/payment integration in this lab - this is just a placeholder.
    window.alert(
      "This is a demo store. Checkout and payment are not implemented yet.",
    );
  };

  return (
    <div className="container cart-page">
      <h1>Your cart</h1>

      <div className="cart-layout">
        <ul className="cart-items">
          {items.map((item) => (
            <li key={item.id} className="cart-item card">
              <img src={item.image} alt={item.name} className="cart-item-image" />

              <div className="cart-item-info">
                <span className={`pill ${getCategoryPillClass(item.category)}`}>
                  {item.category}
                </span>
                <h3>{item.name}</h3>
                <span className="cart-item-price">
                  ${item.price.toFixed(2)}
                </span>
              </div>

              <QuantitySelector
                quantity={item.quantity}
                onDecrease={() => dispatch(decreaseQuantity(item.id))}
                onIncrease={() => dispatch(increaseQuantity(item.id))}
              />

              <span className="cart-item-subtotal">
                ${(item.price * item.quantity).toFixed(2)}
              </span>

              <button
                type="button"
                className="cart-item-remove"
                onClick={() => dispatch(removeFromCart(item.id))}
                aria-label={`Remove ${item.name} from cart`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <aside className="cart-summary card">
          <h2>Order summary</h2>
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="cart-summary-row cart-summary-total">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={handleCheckout}
          >
            Checkout
          </button>
          <button
            type="button"
            className="btn btn-danger btn-block"
            onClick={() => dispatch(clearCart())}
          >
            Clear cart
          </button>
          <Link to="/" className="continue-shopping">
            &larr; Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
