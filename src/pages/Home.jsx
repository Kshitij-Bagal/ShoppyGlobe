import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
          setCurrentProduct(getRandomProduct(data.products)); // Show a random product initially
          setCategories(getUniqueCategories(data.products)); // Extract unique categories
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Function to get a random product
  const getRandomProduct = (productList) => {
    const randomIndex = Math.floor(Math.random() * productList.length);
    return productList[randomIndex];
  };

  // Function to get unique categories
  const getUniqueCategories = (productList) => {
    const uniqueCategories = new Set(productList.map((product) => product.category));
    return Array.from(uniqueCategories);
  };

  // Change ad every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (products.length > 0) {
        setCurrentProduct(getRandomProduct(products));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [products]);

  return (
    <div className="home">
      <h1>Welcome to ShoppyGlobe!</h1>

      {/* Category List */}
      <div className="category-list">
        <ul>
          {[...categories, ...categories].map((category, index) => (
            <Link 
              to={`/ShoppyGlobe/browse?category=${encodeURIComponent(category)}`} 
              key={`${category}-${index}`} // Combining category + index for uniqueness
            >
              <li>
                {category}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Featured Product Section */}
      {currentProduct && (
        <div className="advertisement">
          <h2>Featured Product</h2>
          <img 
            src={currentProduct.thumbnail} 
            alt={currentProduct.title} 
            className="ad-image"
          />
          <h3>{currentProduct.title}</h3>
          <p>{currentProduct.description}</p>
          <p>
            <strong>Price:</strong> ${currentProduct.price} 
            <span style={{ color: 'red' }}> ({currentProduct.discountPercentage}% off)</span>
          </p>
          <Link to={`/ShoppyGlobe/product/${encodeURIComponent(currentProduct.title)}`}>
            <button className="shop-now-btn">Shop Now</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
