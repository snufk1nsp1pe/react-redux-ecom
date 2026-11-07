import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import "./Orders.css";
import { fetchMyOrders } from "../api/orders";
import {
  selectAuthToken,
  selectIsLoggedIn,
} from "../features/auth/authSlice";

function formatDate(value) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function Orders() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectAuthToken);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoggedIn || !token) return;

    let cancelled = false;
    setLoading(true);

    fetchMyOrders(token)
      .then((data) => {
        if (!cancelled) {
          setOrders(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Could not load orders");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isLoggedIn, token]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: "/orders" }} />;
  }

  return (
    <div className="container orders-page">
      <h1>Your orders</h1>

      {loading ? (
        <p className="orders-message">Loading orders…</p>
      ) : error ? (
        <p className="orders-error">{error}</p>
      ) : orders.length === 0 ? (
        <div className="orders-empty">
          <p>You haven&apos;t placed any orders yet.</p>
          <Link to="/" className="btn btn-primary">
            Browse products
          </Link>
        </div>
      ) : (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order._id} className="order-card card">
              <div className="order-header">
                <div>
                  <p className="order-id">Order #{order._id.slice(-8)}</p>
                  <p className="order-date">{formatDate(order.createdAt)}</p>
                </div>
                <p className="order-total">${order.total.toFixed(2)}</p>
              </div>

              <ul className="order-items">
                {order.items.map((item, index) => (
                  <li key={`${order._id}-${index}`} className="order-item">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="order-item-image"
                      />
                    ) : (
                      <div className="order-item-image order-item-placeholder" />
                    )}
                    <div className="order-item-info">
                      <h3>{item.name}</h3>
                      <p>
                        Qty {item.quantity} · ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <span className="order-item-subtotal">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Orders;
