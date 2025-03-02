import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './LogoutButton';
import '../styles/Header.css';

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userId = localStorage.getItem('userId'); // Check if user is logged in

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">

        <div className="logo">
          <Link  to="/ShoppyGlobe/">
            <img src="public/KB-Dev-favicon.png" alt="logo" />
              ShoppyGlobe
          </Link>
        </div>
      
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/ShoppyGlobe/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/ShoppyGlobe/browse" onClick={() => setIsMenuOpen(false)}>
            Shop
          </Link>
        </li>
        <li>
          <Link to="/ShoppyGlobe/cartpage" className="cart-link" onClick={() => setIsMenuOpen(false)}>
            Cart 🛒 <span className="cart-count">{cartItems.length}</span>
          </Link>
        </li>
        {userId && (
          <li className="dropdown">
            <Link to="/ShoppyGlobe/profile" onClick={() => setIsMenuOpen(false)}>
              Profile
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link to="/ShoppyGlobe/orders">Order History</Link>
              </li>
              <li>
                <LogoutButton />
              </li>
            </ul>
          </li>
        )}
        {!userId && (
          <li>
            <Link to="/ShoppyGlobe/login" onClick={() => setIsMenuOpen(false)}>
              Login / Signup
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
