import { useDispatch } from 'react-redux';
import { removeFromCartServer, updateCartQuantity } from '../redux/cartSlice';
import { useState } from 'react';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);
  const [error, setError] = useState(null);

  const handleQuantityChange = async (change) => {
    const newQuantity = quantity + change;

    if (newQuantity < 1) return; // Prevent setting quantity to less than 1
    setLoading(true);

    try {
      setQuantity(newQuantity); // Optimistic update for instant UI change
      await dispatch(updateCartQuantity({ id: item.productId, quantity: newQuantity }));
    } catch (err) {
      setError("Failed to update quantity. Please try again.");
      setQuantity(item.quantity); // Revert back to the previous value in case of error
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveClick = async () => {
    setLoading(true);
    try {
      await dispatch(removeFromCartServer(item.productId));
    } catch (err) {
      setError("Failed to remove item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Ensure the thumbnail is valid or use fallback? item.thumbnail : 'fallback.png';
  const thumbnailUrl = item.thumbnail 

  return (
    <div className="cart-item">
      <div className="cart-item-details">
        {/* Check if thumbnail URL is valid */}
        <img className="cart-item-image" src={item.thumbnail} alt={item.title} />

        <div>
          <h3>{item.title}</h3>
          <p>Price: ${item.price}</p>
          <div className="cart-item-quantity">
            <label htmlFor={`quantity-${item.productId}`}>Quantity:</label>
            <div className="quantity-controls">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={loading || quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={loading}
              >
                +
              </button>
            </div>
            {error && (
              <span id={`quantity-error-${item.productId}`} className="error-message">
                {error}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="cart-item-actions">
        <button
          onClick={handleRemoveClick}
          disabled={loading}
          aria-label={`Remove ${item.title} from cart`}
        >
          {loading ? 'Removing...' : 'Remove'}
        </button>
      </div>
    </div>
  );
};

export default CartItem;

