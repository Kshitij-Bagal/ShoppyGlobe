import { useState, useEffect } from 'react';

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        console.log('Fetched Products:', data.products);
        setProducts(data);

        // Extract unique categories from products
        const uniqueCategories = [
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
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
