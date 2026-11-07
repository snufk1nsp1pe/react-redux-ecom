import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import uiReducer from "../features/ui/uiSlice";
import authReducer from "../features/auth/authSlice";

// The Redux store combines every feature's reducer into one global state tree.
// state.cart -> shopping cart items
// state.ui   -> interface preferences (e.g. dark mode)
// state.auth -> logged-in user + JWT
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    ui: uiReducer,
    auth: authReducer,
  },
});
