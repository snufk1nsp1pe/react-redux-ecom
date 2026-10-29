// Maps a product category to a modifier class so each category gets its own
// accent color for the little pill badge (see .pill-flowers / .pill-socks in
// index.css). Falls back to the default mustard pill for any other category.
const CATEGORY_PILL_CLASS = {
  Flowers: "pill-flowers",
  Socks: "pill-socks",
};

export function getCategoryPillClass(category) {
  return CATEGORY_PILL_CLASS[category] ?? "";
}
