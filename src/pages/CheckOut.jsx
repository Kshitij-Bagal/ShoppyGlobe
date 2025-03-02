import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/CheckOut.css';

const CheckOut = () => {
  const cart = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    navigate('/paymentportal', { state: { cart, total: calculateTotalPrice() } });
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>No items in the cart. <Link to="/ShoppyGlobe/browse">Add products!</Link></p>
      ) : (
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.title} x {item.quantity} - ${item.price * item.quantity}
              </li>
            ))}
          </ul>
          <h3>Total: ${calculateTotalPrice().toFixed(2)}</h3>
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckOut;
