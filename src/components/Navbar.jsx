import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { BrandMark } from "./BrandMark.jsx";
import { selectCartTotalQuantity } from "../features/cart/cartSlice";
import { selectDarkMode, toggleDarkMode } from "../features/ui/uiSlice";
import {
  logout,
  selectAuthUser,
  selectIsLoggedIn,
} from "../features/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartTotalQuantity);
  const darkMode = useSelector(selectDarkMode);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectAuthUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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

          {isLoggedIn ? (
            <>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive ? "navbar-link active" : "navbar-link"
                }
              >
                Orders
              </NavLink>
              <span className="navbar-user" title={user?.email}>
                {user?.name}
              </span>
              <button
                type="button"
                className="navbar-link navbar-button"
                onClick={handleLogout}
              >
                Log out
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "navbar-link active" : "navbar-link"
              }
            >
              Log in
            </NavLink>
          )}

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
