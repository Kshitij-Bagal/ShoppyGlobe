import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="product-item">
      <span className='availability'>{product.availabilityStatus}</span>
      <div className="product">
        <img src={product.thumbnail} alt={product.title} />
        <h3>{product.title}</h3>
        <p>Price: ${product.price}</p>
        <Link to={`/ShoppyGlobe/product/${product.title}`}>View Details</Link>
        <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductItem;
