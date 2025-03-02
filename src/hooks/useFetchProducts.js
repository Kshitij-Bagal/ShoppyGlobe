import { useState, useEffect } from 'react';

const useFetchProducts = () => {
  const [products, setProducts] = useState([]); // ✅ Product state
  const [categories, setCategories] = useState([]); // ✅ Category state
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const [error, setError] = useState(null); // ✅ Error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const data = await response.json();
        if (data && Array.isArray(data.products)) {
          setProducts(data.products); // ✅ Set products
          
          // Extract unique categories
          const uniqueCategories = [...new Set(data.products.map((product) => product.category))];
          setCategories(uniqueCategories);
        } else {
          setProducts([]);
          setCategories([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, categories, loading, error };
};

export default useFetchProducts;

// https://dummyjson.com/products