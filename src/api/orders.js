import { apiFetch } from "./client";

export function createOrder(token, items) {
  return apiFetch("/api/orders", {
    method: "POST",
    token,
    body: JSON.stringify({ items }),
  });
}

export function fetchMyOrders(token) {
  return apiFetch("/api/orders/mine", { token });
}
