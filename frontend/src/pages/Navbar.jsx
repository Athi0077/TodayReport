import { useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">

      <div className="nav-top">
        <h1 className="logo">
          TodayReport
        </h1>

        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>

        <Link to="/admin" onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        <Link to="/news-list" onClick={() => setMenuOpen(false)}>
          News List
        </Link>

        <Link to="/suggested-news" onClick={() => setMenuOpen(false)}>
          Suggested News
        </Link>

        <Link to="/" onClick={() => setMenuOpen(false)}>
          Logout
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;