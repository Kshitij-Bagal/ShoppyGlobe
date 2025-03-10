import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCartServer } from '../redux/cartSlice';
import ReviewCard from '../components/ReviewCard';
import '../styles/ProductDetail.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProductDetail = () => {
  const { ProductId } = useParams(); // Get the product title from URL params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage error state
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    // Fetch product details by title
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://shoppyglobe-server.onrender.com/api/products/${ProductId}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data); // Set the fetched product data
        if (!data || Object.keys(data).length === 0) {
          throw new Error('Invalid product data');
        }
        
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false after the fetch
      }
    };

    if (ProductId) {
      fetchProductDetails();
    }
  }, [ProductId]);

  // Handle loading, error, and product not found cases
  if (loading) return <div className="spinner">Its Loading ........</div>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!product) return <p>Product not found</p>; // Handle when product is not found

  return (
    <div className="product-detail">
      <div className="product-data">
        <Link to='/browse'>
          <button className='back_btn'>X</button>
        </Link>
        <img src={product.thumbnail} alt={product.title} />
        <div className="product-info">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>
            <strong>Price:</strong> ${product.price}{' '}
            <span className="discount">
              ({product.discountPercentage}% off → ${product.price - (product.price * product.discountPercentage) / 100})
            </span>
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
      <button   className='add-to-cart-btn' onClick={() => dispatch(addToCartServer(product))} disabled={product.stock === 0}>  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</button>
      <button className='add-btn' onClick={() => setShowDetails((prev) => !prev)}>
        {showDetails ? 'Hide Additional Details' : 'Show Additional Details'}
      </button>
      <div className={`additional-details ${showDetails ? 'show' : ''}`}>
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
      <ReviewCard reviews={product.reviews?.length ? product.reviews : []} />
        {product.reviews?.length === 0 && <p>No reviews yet. Be the first to review!</p>}
    </div>
  );
};

export default ProductDetail;
