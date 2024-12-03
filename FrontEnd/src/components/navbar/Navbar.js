import React from 'react';
import './Navbar.css';
import { Link, useNavigate} from 'react-router-dom';
const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  function handleLogout() {
    navigate('/login');
    window.location.reload()
  }
  return (
    <nav className="navbar navbar-expand-lg h-2 bg-secondary bg-body-tertiary text-white">
      <div className="container-fluid">
        <Link className="navbar-brand px-4 h-5 fs-1 text-white" to="/">
          Travel
        </Link>
        <button
          className="navbar-toggler"
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
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item mx-4 text-white">
              <Link to="/" className="nav-links" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item mx-4 text-white">
              <Link to="/about" className="nav-links" aria-current="page">
                About
              </Link>
            </li>
            {isLoggedIn ? (
              <li className="nav-item mx-4 text-white">
                <Link className="nav-links" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item mx-4 text-white">
                  <Link to="/login" className="nav-links" aria-current="page">
                    Login
                  </Link>
                </li>
                <li className="nav-item mx-4 text-white">
                  <Link to="/signup" className="nav-links" aria-current="page">
                    Signup
                  </Link>
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
