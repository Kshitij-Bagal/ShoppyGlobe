import { useState, useEffect } from 'react';
import useFetchProducts from '../hooks/useFetchProducts';
import PropTypes from 'prop-types';

const FilterBar = ({ onSearch, onCategoryChange, onSortChange, selectedCategory }) => {
  const { categories } = useFetchProducts();
  const [searchTerm, setSearchTerm] = useState('');

    
    FilterBar.propTypes = {
        onSearch: PropTypes.func.isRequired,
        onCategoryChange: PropTypes.func.isRequired,
        onSortChange: PropTypes.func.isRequired,
    };

  return (
    <div className="filter-bar">
      <input className='searchBar'
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearch(e.target.value);
        }}
      />

      <select className='sortfiler'
        value={selectedCategory || 'All'} 
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="All">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select className='sortfiler' onChange={(e) => onSortChange(e.target.value)}>
        <option value="">Sort By</option>
        <option value="name">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
        <option value="availability">Availability</option>
        <option value="deliveryTime">Delivery Time</option>
      </select>
    </div>
  );
};

export default FilterBar;
