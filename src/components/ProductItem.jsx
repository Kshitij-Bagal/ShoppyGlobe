import { useDispatch } from 'react-redux';
import { addToCartServer  } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCartServer(product));
  };

  return (
    <div className="product-item">
      <span className='availability'>{product.availabilityStatus}</span>
      <div className="product">
        <img src={product.thumbnail} alt={product.title} />
        <h3>{product.title}</h3>
        <p>Price: ${product.price}</p>
        <Link to={`/products/${product._id}`}>
          View Details
        </Link>
    <button onClick={handleAddToCart} disabled={product.availabilityStatus === 'Out of stock'}>
      Add to Cart
    </button>
      </div>
    </div>
  );
};


export default ProductItem;
