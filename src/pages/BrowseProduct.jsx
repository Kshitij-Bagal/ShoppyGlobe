import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import FilterBar from '../components/FilterBar';
import { useSearchParams } from 'react-router-dom';
import '../styles/BrowseProduct.css';

const BrowseProduct = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  // Set the initial category from the URL
  useEffect(() => {
    if (category) {
      setCategoryFilter(category);
    }
  }, [category]);

  return (
    <div className="browse-product-page">
      <h1>Browse Products</h1>
      <FilterBar
        onSearch={(query) => setSearchQuery(query)}
        onCategoryChange={(category) => setCategoryFilter(category)}
        onSortChange={(sort) => setSortOption(sort)}
        selectedCategory={categoryFilter || 'All Categories'} // Pass selected category to FilterBar
      />
      <ProductList 
        searchQuery={searchQuery} 
        categoryFilter={categoryFilter} 
        sortOption={sortOption} 
      />
    </div>
  );
};

export default BrowseProduct;
