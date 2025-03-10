import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/products">Shop now!</Link>
        </p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            // Use productId or the actual unique identifier for each item here
            <CartItem key={item.productId || item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
