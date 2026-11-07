import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";
import QuantitySelector from "../components/QuantitySelector.jsx";
import { createOrder } from "../api/orders";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
  selectCartTotalPrice,
} from "../features/cart/cartSlice";
import {
  selectAuthToken,
  selectIsLoggedIn,
} from "../features/auth/authSlice";
import { getCategoryPillClass } from "../utils/categoryStyle";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectAuthToken);
  const [checkoutMessage, setCheckoutMessage] = useState(null);
  const [checkoutError, setCheckoutError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container cart-empty">
        <h1>Your cart is empty</h1>
        <p>Looks like you haven&apos;t added anything yet.</p>
        {checkoutMessage && <p className="cart-success">{checkoutMessage}</p>}
        <Link to="/" className="btn btn-primary">
          Browse products
        </Link>
      </div>
    );
  }

  const handleCheckout = async () => {
    setCheckoutError(null);
    setCheckoutMessage(null);

    if (!isLoggedIn) {
      navigate("/login", { state: { from: "/cart" } });
      return;
    }

    setSubmitting(true);
    try {
      const order = await createOrder(
        token,
        items.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
      );

      dispatch(clearCart());
      setCheckoutMessage(
        `Order placed! Total $${order.total.toFixed(2)}. Saved to the database.`,
      );
    } catch (err) {
      setCheckoutError(err.message || "Checkout failed");
    } finally {
      setSubmitting(false);
    }
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

          {!isLoggedIn && (
            <p className="cart-hint">
              Log in to place an order.{" "}
              <Link to="/login" state={{ from: "/cart" }}>
                Log in
              </Link>
            </p>
          )}

          {checkoutError && <p className="cart-error">{checkoutError}</p>}

          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={handleCheckout}
            disabled={submitting}
          >
            {submitting
              ? "Placing order…"
              : isLoggedIn
                ? "Checkout"
                : "Log in to checkout"}
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
