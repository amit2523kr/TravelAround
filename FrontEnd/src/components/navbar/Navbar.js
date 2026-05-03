import React from 'react';
import './Navbar.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  function handleLogout() {
    setIsLoggedIn(false);
    navigate('/login');
  }
  return (
    <nav className="app-nav">
      <div className="app-nav-inner">
        <Link className="brand" to="/">
          <span className="brand-text">✦ Travel</span>
        </Link>
        <button
          className="navbar-toggler nav-toggle"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse firstnav" id="navbarTogglerDemo03">
          <ul className="nav-items">
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                About
              </NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                <button type="button" className="nav-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/login" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                    Sign In
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup" className="nav-btn">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
