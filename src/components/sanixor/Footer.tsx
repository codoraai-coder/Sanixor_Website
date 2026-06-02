import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="snx-footer">
      <Link to="/" className="footer-logo">
        Sanixor<span>AI</span>
      </Link>
      <div className="footer-links">
        <Link to="/products">Products</Link>
        <Link to="/team">Team</Link>
        <Link to="/contact">Contact</Link>
        <a href="https://sanixor.space" target="_blank" rel="noopener noreferrer">sanixor.space</a>
      </div>
      <div className="footer-copy">© 2025 Sanixor AI. Built for the next generation.</div>
    </footer>
  );
}
