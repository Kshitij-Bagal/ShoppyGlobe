import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from './LogoutButton';
import { fetchCart } from '../redux/cartSlice'; // Add fetchCart import
import '../styles/Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items) || [];  // Default to an empty array if undefined
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userId = localStorage.getItem('userId'); // Check if user is logged in

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Dispatch fetchCart to load cart items when token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchCart()); // Fetch cart data on mount
    }
  }, [dispatch]);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="KB-Dev-favicon.png" alt="logo" />
          ShoppyGlobe
        </Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/browse" onClick={() => setIsMenuOpen(false)}>
            Shop
          </Link>
        </li>
        <li>
          <Link to="/cartpage" className="cart-link" onClick={() => setIsMenuOpen(false)}>
            Cart 🛒 <span className="cart-count">{cartItems.length}</span>
          </Link>
        </li>
        {userId && (
          <li className="dropdown">
            <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
              Profile
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link to="/orders">Order History</Link>
              </li>
              <li>
                <LogoutButton />
              </li>
            </ul>
          </li>
        )}
        {!userId && (
          <li>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              Login / Signup
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
