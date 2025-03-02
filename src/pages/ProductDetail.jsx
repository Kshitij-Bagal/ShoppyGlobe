import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import ReviewCard from '../components/ReviewCard';
import '../styles/ProductDetail.css';
import { Link } from 'react-router-dom';

const ProductDetail = () => {
  const { productName } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false); // Toggle state
  const dispatch = useDispatch();

  useEffect(() => {
    if (productName) {
      const decodedName = decodeURIComponent(productName);
      fetch('https://dummyjson.com/products')
        .then((res) => res.json())
        .then((data) => {
          const matchedProduct = data.products.find(
            (p) => slugify(p.title) === slugify(decodedName)
          );
          if (matchedProduct) {
            setProduct(matchedProduct);
          } else {
            setError('Product not found');
          }
        })
        .catch((err) => setError(err.message));
    }
  }, [productName]);

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/%20/g, '-')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <>
    
    <div className="product-detail">
      <div className="product-data">
        <Link to='/ShoppyGlobe/browse'>
        <button className='back_btn'>X</button></Link>
        <img src={product.thumbnail} alt={product.title} /> 
        <div className="product-info">   
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>
            <strong>Price:</strong> ${product.price}{' '}
            <span style={{ color: 'red' }}>({product.discountPercentage}% off)</span>
          </p>
          <p>
            <strong>Availability:</strong>{' '}
            {product.stock > 0 ? 'In stock' : 'Out of stock'}
          </p>
          <p>
            <strong>Brand:</strong> {product.brand || 'Unknown'}
          </p>
          <p>
            <strong>Category:</strong> {product.category || 'Uncategorized'}
          </p>
          <p>
            <strong>Rating:</strong> {product.rating} ⭐
          </p>
          <p>
            <strong>Stock:</strong> {product.stock} available
          </p>
        </div> 
      </div>
      <button className='add-to-cart-btn ' onClick={() => dispatch(addToCart(product))}>
        Add to Cart
      </button>

      <button className='add-btn' onClick={() => setShowDetails((prev) => !prev)}>
        {showDetails ? 'Hide Additional Details' : 'Show Additional Details'}
      </button>

      {showDetails && (
        <div className="additional-details">
          <h3>Additional Details</h3>
          <p>
            <strong>Dimensions:</strong>{' '}
            {product.dimensions
              ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth}`
              : 'Not specified'}
          </p>
          <p>
            <strong>Shipping Information:</strong>{' '}
            {product.shippingInformation || 'Not provided'}
          </p>
          <p>
            <strong>Return Policy:</strong>{' '}
            {product.returnPolicy || 'Not provided'}
          </p>
          <p>
            <strong>Warranty Information:</strong>{' '}
            {product.warrantyInformation || 'Not provided'}
          </p>
        </div>
      )}

      <ReviewCard reviews={product.reviews} />
    </div>
    </>
  );
};

export default ProductDetail;
