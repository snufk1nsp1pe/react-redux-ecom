# Bloom & Sole — React & Redux E-Commerce Lab

> TD-TP 2: Create a React Application with Redux for State Management

- **Student name:** _ _ _ _ _ _ _ _ _ _ (fill in your name)
- **Application / store name:** Bloom & Sole
- **Module:** WAMD

## Application Description

Bloom & Sole is a quirky little retro-styled shop that sells two things, and
two things only: **fresh flowers** and **cozy, colorful socks**. It was built
to practice **component-based React development** and **global state
management with Redux**. Visitors can browse the catalog, search and filter
by category, view product details, and manage a shopping cart whose contents
stay in sync across the whole app through a Redux store.

The visual identity leans into a warm, groovy **70s retro look**: cream and
mustard tones, burnt-orange accents, a bold slab-serif display font, thick
outlines and hard "pop-art" drop shadows on cards and buttons.

The app loads its product catalog and supports authentication and orders via
the REST API in `backend/`. The "Checkout" button remains a demo and does not
process real payments.

## Technologies Used

| Technology | Purpose |
|---|---|
| React 19 (Vite) | UI library / dev environment |
| JavaScript (ES6+) | Application logic |
| Redux Toolkit | Global state management (store, slices, actions, reducers) |
| React-Redux | Connecting React components to the Redux store |
| React Router DOM | Client-side navigation between pages |
| Plain CSS (CSS variables) | Retro theme, including the light/dark mode |
| Google Fonts ("Alfa Slab One" + "Poppins") | Retro display + body typography |

## Project Structure

```
src/
  app/
    store.js               # configureStore - combines all reducers
  data/
    products.js             # Static catalog of flowers & socks
  features/
    cart/
      cartSlice.js          # Cart state, actions, reducers, selectors
    ui/
      uiSlice.js             # Dark mode UI state
  components/
    Navbar.jsx               # Top navigation, cart badge, theme toggle
    Footer.jsx                # Simple site footer
    ProductCard.jsx           # Product preview card (grid item)
    SearchBar.jsx              # Controlled search input
    CategoryFilter.jsx         # Category pill filter (All / Flowers / Socks)
    QuantitySelector.jsx        # Reusable +/- quantity stepper
  pages/
    Home.jsx                   # Product catalog, search & filtering
    ProductDetails.jsx          # Single product view + add to cart
    Cart.jsx                     # Cart management & order summary
    NotFound.jsx                  # 404 fallback route
  utils/
    categoryStyle.js               # Maps a category to its pill accent color
  App.jsx                           # Routes + layout
  main.jsx                           # React root, Redux Provider, Router
```

## Main React Components

- **Navbar** — brand logo, navigation links, live cart item badge, dark/light
  mode toggle.
- **ProductCard** — reusable card used in the catalog grid; shows image,
  category pill (color-coded per category), name, price, and an "Add to
  cart" button.
- **SearchBar** / **CategoryFilter** — reusable filter controls used on the
  Home page, driven by local component state (`useState`).
- **QuantitySelector** — a small reusable `+ / −` stepper reused on both the
  product details page and each cart line item.
- **Home / ProductDetails / Cart / NotFound** — the four pages rendered by
  React Router.

## Redux State Managed by the Application

The Redux store (`src/app/store.js`) combines two slices:

### `cart` slice (`features/cart/cartSlice.js`)
- **State:** list of cart items (`{ id, name, price, image, category, quantity }`)
- **Actions / reducers:** `addToCart`, `removeFromCart`, `increaseQuantity`,
  `decreaseQuantity`, `clearCart`
- **Selectors:** `selectCartItems`, `selectCartTotalQuantity`,
  `selectCartTotalPrice`
- Read from: `Navbar` (badge count), `Cart` page (full list & totals)
- Dispatched from: `ProductCard`, `ProductDetails`, `Cart` page

### `ui` slice (`features/ui/uiSlice.js`)
- **State:** `{ darkMode: boolean }`
- **Actions / reducers:** `toggleDarkMode`
- Read from: `App.jsx` (applies the theme), `Navbar` (icon state)
- Dispatched from: `Navbar` (theme toggle button)

Product search term and the selected category filter are kept as **local
component state** in `Home.jsx` with `useState`, since that data is only
needed by that page — a good example of choosing local state vs. global
Redux state appropriately.

## Implemented Features

**Required**
- Multiple reusable React components built with JSX and props
- Local component state (`useState`) for search, category filter, cart item
  quantity-before-adding, and the "added to cart" confirmation
- Event handling (clicks, input changes)
- Product catalog (flowers & socks) with product details
- Add to cart / remove from cart / update quantity
- Interface updates dynamically as the cart changes (badge, totals, line items)
- Redux store, actions, reducers, selectors, wired up with React-Redux
  (`useSelector` / `useDispatch`)

**Optional / extra**
- Product search (by name)
- Category filtering (All / Flowers / Socks), with color-coded pills
- Dedicated product details page (`/product/:id`)
- Quantity management (details page and cart)
- Cart subtotal/total summary
- Simple navigation with React Router (Home, Cart, 404)
- Dark / light mode toggle (persisted in the Redux `ui` slice)
- Retro visual theme: warm palette, slab-serif display font, thick outlines
  and hard "pop-art" shadows on cards/buttons, a scalloped hero banner
- Real product photography for every item (see **Image Credits** below):
  actual Minecraft flower textures for the Flowers category, and real
  photos of fun/novelty socks for the Socks category

## Image Credits

All product images are real photos/renders, not illustrations:

- **Flowers** &mdash; actual Minecraft item texture renders generated via
  [blockrender.dev](https://blockrender.dev), a third-party Minecraft asset
  renderer (Poppy, Dandelion, Cornflower, Allium, Azure Bluet, Oxeye Daisy).
- **Socks** &mdash; real photographs from [Pexels](https://www.pexels.com),
  free to use under the [Pexels License](https://www.pexels.com/license/):
  duck-print socks by Neva Szpigel, joker-print socks by John (Giannis)
  Tekeridis, candy-pattern and wild-pattern socks by Licalze Socks,
  rainbow-stripe socks by SHVETS production, and gift-wrapped colorful socks
  by cottonbro studio.

## Instructions for Running

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open the printed local URL (typically http://localhost:5173)
```

Other available scripts:

```bash
npm run build     # Production build (output in dist/)
npm run preview   # Preview the production build locally
npm run lint      # Run oxlint
```

## Deploying the frontend and backend together on Render

This repository includes a root-level `render.yaml` that deploys the frontend
and backend as one Render web service. In Render, choose **New → Blueprint**
and connect this repository. Have a MongoDB Atlas connection string ready.
When prompted, provide it as `MONGODB_URI` and make sure Atlas Network Access
allows connections from Render; Render generates `JWT_SECRET`. Do not create
a separate static site for the frontend.

Render builds the Vite app and starts Express, which serves both the frontend
and `/api` routes from the same URL. No `VITE_API_URL` setting is needed. Once
the service is live, open its root URL for the shop and
`<your-service-url>/api/health` to check the API.
