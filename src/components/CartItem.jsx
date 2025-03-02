import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>Price: ${item.price}</p>
        <input
          type="number"
          value={item.quantity}
          min="1"
          onChange={(e) =>
            dispatch(updateQuantity({ id: item.id, quantity: +e.target.value }))
          }
        />
        <button onClick={() => dispatch(removeFromCart(item.id))}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
