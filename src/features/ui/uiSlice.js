import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Flips the theme between light and dark mode.
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = uiSlice.actions;

export const selectDarkMode = (state) => state.ui.darkMode;

export default uiSlice.reducer;
