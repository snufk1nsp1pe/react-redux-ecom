import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import { loginUser, registerUser } from "../api/auth";
import {
  selectIsLoggedIn,
  setCredentials,
} from "../features/auth/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const redirectTo = location.state?.from || "/";

  if (isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const data =
        mode === "login"
          ? await loginUser({ email, password })
          : await registerUser({ name, email, password });

      dispatch(setCredentials({ token: data.token, user: data.user }));
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container login-page">
      <div className="login-card card">
        <h1>{mode === "login" ? "Log in" : "Create account"}</h1>
        <p className="login-subtitle">
          {mode === "login"
            ? "Sign in to place an order."
            : "Register to check out and save your orders."}
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          {mode === "register" && (
            <label>
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </label>
          )}

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </label>

          {error && <p className="login-error">{error}</p>}

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={submitting}
          >
            {submitting
              ? "Please wait…"
              : mode === "login"
                ? "Log in"
                : "Register"}
          </button>
        </form>

        <p className="login-switch">
          {mode === "login" ? (
            <>
              No account yet?{" "}
              <button type="button" onClick={() => setMode("register")}>
                Register
              </button>
            </>
          ) : (
            <>
              Already registered?{" "}
              <button type="button" onClick={() => setMode("login")}>
                Log in
              </button>
            </>
          )}
        </p>

        <Link to="/" className="continue-shopping">
          &larr; Back to shop
        </Link>
      </div>
    </div>
  );
}

export default Login;
