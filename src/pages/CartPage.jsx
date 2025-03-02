// src/pages/CartPage.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';
import '../styles/CartPage.css';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
      <div className="app-container">
        <div className="cart-page">
          <h2>Your Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty!</p>
              <Link to="/ShoppyGlobe/browse">Browse Products</Link>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.thumbnail} alt={item.title} />
                    <div className="cart-item-details">
                      <h3>{item.title}</h3>
                      <p>${item.price.toFixed(2)}</p>
    
                      <div className="cart-item-controls">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        />
                        <button onClick={() => handleRemove(item.id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
    
              <div className="cart-summary">
                <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
                <Link to="/ShoppyGlobe/checkout" className="checkout-btn">
                  Proceed to Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
  );
};

export default CartPage;
