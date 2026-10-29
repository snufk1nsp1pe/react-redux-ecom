import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import uiReducer from "../features/ui/uiSlice";

// The Redux store combines every feature's reducer into one global state tree.
// state.cart -> shopping cart items
// state.ui   -> interface preferences (e.g. dark mode)
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    ui: uiReducer,
  },
});
