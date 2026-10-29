import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="container not-found">
      <h1>404</h1>
      <p>This page doesn&apos;t exist.</p>
      <Link to="/" className="btn btn-primary">
        Back to shop
      </Link>
    </div>
  );
}

export default NotFound;
