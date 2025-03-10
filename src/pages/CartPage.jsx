import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, clearCart } from '../redux/cartSlice';  // Import clearCart action
import { Link } from 'react-router-dom';
import Cart from '../components/Cart'; // Import Cart component
import '../styles/CartPage.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);
  const [loading, setLoading] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);  // Track if the order is placed

  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);
        await dispatch(fetchCart());
      } catch (err) {
        console.error('Failed to fetch cart:', err);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, [dispatch]);

  const handleOrderPlacement = async () => {
    try {
      // Assuming you have an order placement function in your app, you could place the order here
      // After successful order placement, clear the cart
      setOrderPlaced(true);
      dispatch(clearCart());  // Clear the cart in Redux store
    } catch (err) {
      console.error('Order placement failed:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <div className="cart-page">
        <h2>Your Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty!</p>
            <Link to="/browse">Browse Products</Link>
          </div>
        ) : (
          <>
            {/* Pass cartItems to Cart component */}
            <Cart cartItems={cartItems} />
            <div className="cart-summary">
              <h3>Total: ${getTotalPrice(cartItems).toFixed(2)}</h3>
              <Link to="/checkout" className="checkout-btn">
                <button onClick={handleOrderPlacement} className="checkout-btn">
                  {orderPlaced ? 'Order Placed' : 'Place Order'}
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Function to calculate total price
const getTotalPrice = (cartItems) => {
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export default CartPage;
