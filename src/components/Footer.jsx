import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          <strong>Bloom &amp; Sole</strong> &mdash; fresh flowers for your
          home, groovy socks for your feet.
        </p>
        <p className="footer-note">
          Educational project built for a React &amp; Redux lab. No real
          payments or orders are processed.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
