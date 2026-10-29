import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { BrandMark } from "./BrandMark.jsx";
import { selectCartTotalQuantity } from "../features/cart/cartSlice";
import { selectDarkMode, toggleDarkMode } from "../features/ui/uiSlice";

function Navbar() {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartTotalQuantity);
  const darkMode = useSelector(selectDarkMode);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-brand">
          <BrandMark className="navbar-logo" />
          <span>Virestis</span>
        </NavLink>

        <nav className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Cart
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </NavLink>

          <button
            type="button"
            className="theme-toggle"
            onClick={() => dispatch(toggleDarkMode())}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            {darkMode ? "☀︎" : "⏾"}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
