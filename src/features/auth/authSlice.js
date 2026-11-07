import { createSlice } from "@reduxjs/toolkit";

const stored = (() => {
  try {
    const raw = localStorage.getItem("virestis_auth");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
})();

const initialState = {
  token: stored?.token || null,
  user: stored?.user || null,
};

function persist(state) {
  if (state.token && state.user) {
    localStorage.setItem(
      "virestis_auth",
      JSON.stringify({ token: state.token, user: state.user }),
    );
  } else {
    localStorage.removeItem("virestis_auth");
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      persist(state);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      persist(state);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectAuthToken = (state) => state.auth.token;
export const selectAuthUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => Boolean(state.auth.token);

export default authSlice.reducer;
