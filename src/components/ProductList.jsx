import { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import useFetchProducts from '../hooks/useFetchProducts';
import '../styles/ProductList.css';

const ProductList = ({ searchQuery, categoryFilter, sortOption }) => {
  const { products, loading, error } = useFetchProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
    console.log(products);
  useEffect(() => {
    let updatedProducts = Array.isArray(products) ? [...products] : [];


    // Search filter
    if (searchQuery) {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter && categoryFilter !== 'All') {
      updatedProducts = updatedProducts.filter((product) => 
        product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Sorting logic
    switch (sortOption) {
      case 'name':
        updatedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        updatedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'price-asc':
        updatedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        updatedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'availability':
        updatedProducts.sort((a, b) => b.stock - a.stock);
        break;
      case 'deliveryTime':
        updatedProducts.sort((a, b) => a.deliveryTime - b.deliveryTime);
        break;
      default:
        break;
    }

    setFilteredProducts(updatedProducts);
  }, [products, searchQuery, categoryFilter, sortOption]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products!</p>;

  return (
    <div className="product-list">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => (
          <ProductItem 
            key={product.id || `${product.title}-${index}`} // Unique key
            product={product} 
          />
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
