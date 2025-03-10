import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import useFetchProducts from '../hooks/useFetchProducts';

const Home = () => {
  const { products, loading, error } = useFetchProducts();
  const { categories = [] } = useFetchProducts();
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isAdVisible, setIsAdVisible] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isWelcomeMessageVisible, setIsWelcomeMessageVisible] = useState(true); // To control welcome message visibility

  // Fetch Products and Categories
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productResponse = await fetch('http://localhost:8000/api/products');
        const productData = await productResponse.json();

        if (productData.products && productData.products.length > 0) {
          setCurrentProduct(getRandomProduct(productData.products)); // Show a random product initially
          setCategories(getUniqueCategories(productData.products)); // Extract unique categories
        }

        const categoryData = categories;
        if (categoryData.categories) {
          setCategories(categoryData.categories); // Update with the fetched categories
        }

        setLoadingCategories(false); // Finished loading categories
      } catch (error) {
        console.error('Failed to fetch products and categories:', error);
      }
    };

    fetchProductsAndCategories();
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

  // Show the ad after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAdVisible(true);
      setIsWelcomeMessageVisible(false); // Hide the welcome message after 5 seconds
    }, 5000); // 5-second delay for showing the ad

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="home">
      {/* Category List - Marquee Scrolling */}
      <div className="category-list-marquee">
        {loadingCategories ? (
          <p>Loading categories...</p>
        ) : (
          <div className="category-marquee">
            <ul>
              {categories.map((category, index) => (
                <Link
                  to={`/browse?category=${encodeURIComponent(category)}`}
                  key={`${category}-${index}`}
                >
                  <li>{category}</li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>      {/* Welcome Message or Featured Product Section */}
      {isWelcomeMessageVisible ? (
        <div className="welcome-message">
          <h1>Welcome to ShoppyGlobe!</h1>
          <p>"Your one-stop shop for all your needs."</p>
        </div>
      ) : (
        isAdVisible && currentProduct && (
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
            <Link to={`/products/${encodeURIComponent(currentProduct.title)}`}>
              <button className="shop-now-btn">Shop Now</button>
            </Link>
          </div>
        )
      )}


    </div>
  );
};

export default Home;
