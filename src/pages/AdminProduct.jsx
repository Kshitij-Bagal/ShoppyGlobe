import React, { useState, useEffect } from 'react';
import '../styles/AdminProduct.css';

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    thumbnail: '',
    description: '',
    category: '',
    price: '',
    discountPercentage: '',
    rating: '',
    stock: '',
    tags: '',
    brand: '',
    sku: '',
    weight: '',
    dimensions: { width: '', height: '', depth: '' },
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: 'In Stock',
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://shoppyglobe-server.onrender.com/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
        } else {
          throw new Error(data.message || 'Failed to fetch products');
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('dimensions')) {
      const [dimension] = name.split('.');
      setNewProduct((prev) => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          [dimension]: value,
        },
      }));
    } else {
      setNewProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://shoppyglobe-server.onrender.com/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      if (response.ok) {
        setProducts((prev) => [...prev, data]);
        setNewProduct({
          title: '',
          thumbnail: '',
          description: '',
          category: '',
          price: '',
          discountPercentage: '',
          rating: '',
          stock: '',
          tags: '',
          brand: '',
          sku: '',
          weight: '',
          dimensions: { width: '', height: '', depth: '' },
          warrantyInformation: '',
          shippingInformation: '',
          availabilityStatus: 'In Stock',
        });
      } else {
        throw new Error(data.message || 'Failed to add product');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`https://shoppyglobe-server.onrender.com/api/products/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts((prev) => prev.filter((product) => product._id !== id));
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://shoppyglobe-server.onrender.com/api/products/${editingProduct._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editingProduct),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setProducts((prev) =>
          prev.map((product) =>
            product._id === editingProduct._id ? data : product
          )
        );
        setEditingProduct(null); // Reset editing state
      } else {
        throw new Error(data.message || 'Failed to update product');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  return (
    <div className="admin-product">
      <h2>Manage Products</h2>
      {error && <div className="error-message">{error}</div>}
        <h3>Product List</h3>      
        <div className="card-container">
        <div className="product-list">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <img src={product.thumbnail} alt={product.title} className="product-thumbnail" />
              <h4>{product.title}</h4>
              <p>{product.category}</p>

              {/* Editable Price, Discount, and Stock Fields */}
              {editingProduct && editingProduct._id === product._id ? (
                <>
                  <input
                    type="number"
                    name="price"
                    value={editingProduct.price}
                    onChange={handleEditChange}
                  />
                  <input
                    type="number"
                    name="discountPercentage"
                    value={editingProduct.discountPercentage}
                    onChange={handleEditChange}
                  />
                  <input
                    type="number"
                    name="stock"
                    value={editingProduct.stock}
                    onChange={handleEditChange}
                  />
                  <button onClick={handleUpdateProduct}>Update</button>
                </>
              ) : (
                <>
                  <p>Price: ${product.price}</p>
                  <p>Discount: {product.discountPercentage}%</p>
                  <p>Stock: {product.stock}</p>
                  <button onClick={() => handleEditProduct(product)}>Edit</button>
                  <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
      </div><br />
      <div className="add-product-form">
        <h3>Add New Product</h3>
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={newProduct.title}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="text"
            name="thumbnail"
            placeholder="Thumbnail URL"
            value={newProduct.thumbnail}
            onChange={handleChange}
            required
          />
          <br />
          <textarea
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="number"
            name="discountPercentage"
            placeholder="Discount Percentage"
            value={newProduct.discountPercentage}
            onChange={handleChange}
          />
          <br />
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={newProduct.rating}
            onChange={handleChange}
          />
          <br />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={newProduct.tags}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={newProduct.brand}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="sku"
            placeholder="SKU"
            value={newProduct.sku}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="number"
            name="weight"
            placeholder="Weight"
            value={newProduct.weight}
            onChange={handleChange}
          />
          <br />
          <input
            type="number"
            name="dimensions.width"
            placeholder="Width"
            value={newProduct.dimensions.width}
            onChange={handleChange}
          />
          <br />
          <input
            type="number"
            name="dimensions.height"
            placeholder="Height"
            value={newProduct.dimensions.height}
            onChange={handleChange}
          />
          <br />
          <input
            type="number"
            name="dimensions.depth"
            placeholder="Depth"
            value={newProduct.dimensions.depth}
            onChange={handleChange}
          />
          <br />
          <textarea
            name="warrantyInformation"
            placeholder="Warranty Information"
            value={newProduct.warrantyInformation}
            onChange={handleChange}
          />
          <br />
          <textarea
            name="shippingInformation"
            placeholder="Shipping Information"
            value={newProduct.shippingInformation}
            onChange={handleChange}
          />
          <br />
          <select
            name="availabilityStatus"
            value={newProduct.availabilityStatus}
            onChange={handleChange}
          >
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Pre-order">Pre-order</option>
          </select>
          <br />
          <button type="submit">Add Product</button>
        </form>
      </div>


    </div>
  );
};

export default AdminProduct;