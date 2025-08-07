import React from 'react';
import { Link, NavLink } from 'react-router-dom';

// User aur onLogout ko props ke zariye yahan receive karein
const Navbar = ({ user, onLogout }) => {
  return (
    // 'bg-black' ko 'bg-white' aur 'shadow' class se professional look dein
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      {/* .container-fluid poori width lega */}
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4 text-light" to="/">
          <i className="bi bi-wallet2 me-2"></i>ExpenseTracker
        </Link>
        
        {/* Responsive Toggle Button (Mobile view ke liye) */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#mainNavbar" 
          aria-controls="mainNavbar" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar ke links ab is collapsible div ke andar honge */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            {user ? (
              // Agar user login hai to yeh dikhayein
              <>
                <li className="nav-item">
                  <span className="navbar-text me-3">
                    Welcome, {user.name}!
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-light" onClick={onLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              // Agar user login nahi hai to yeh links dikhayein
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">Register</NavLink>
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