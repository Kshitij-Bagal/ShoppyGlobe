// src/redux/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch cart items from server
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
     if (!token) {
      // Custom error message
      alert('Please log in to continue shopping');
      return rejectWithValue('You must log in to access your cart.');
    }
    if (token) {
    try {
    const token = localStorage.getItem('token');
 

    const response = await axios.get('https://shoppyglobe-server.onrender.com/api/cart', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.items;  // Only return after successful API response
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Custom Error: Unauthorized access. Please log in to view your cart.');
    }
    alert('Please log in to continue shopping');    
    return rejectWithValue(error.response?.data?.message || 'Error: Failed to fetch your cart. Please try again later.');
  }}
});




// Add item to cart (server & state)
export const addToCartServer = createAsyncThunk('cart/addToCartServer', async (item, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const payload = {
      productId: item._id,
      thumbnail: item.thumbnail, // Use thumbnail instead of productImage
      title: item.title,
      price: item.price,
      quantity: 1, // Default quantity
      total: item.price * 1,
    };

    const response = await axios.post(
      'https://shoppyglobe-server.onrender.com/api/cart',
      payload,
      { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    // Handle error gracefully and show an alert
    alert('Please log in to add items to your cart');
    return rejectWithValue(error.response?.data?.message || 'Failed to add item to cart');
  }
});

// Update item quantity in server cart
export const updateCartQuantity = createAsyncThunk(
  'cart/updateCartQuantity',
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'https://shoppyglobe-server.onrender.com/api/cart', 
        { productId: id, quantity },
        {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
      );
      return response.data.products;  // Assuming the response returns the updated cart
    } catch (error) {
      // Show alert for the user
      alert('Please log in to update cart items');
      return rejectWithValue(error.response?.data?.message || 'Failed to update item quantity');
    }
  }
);

// Remove item from cart (server & state)
export const removeFromCartServer = createAsyncThunk(
  'cart/removeFromCartServer',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('https://shoppyglobe-server.onrender.com/api/cart', {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        data: { productId: id }, // Pass productId in the body
      });
      return id;
    } catch (error) {
      // Show alert for the user
      alert('Please log in to remove items from your cart');
      return rejectWithValue(error.response?.data?.message || 'Failed to remove item from cart');
    }
  }
);


const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = Array.isArray(action.payload) ? action.payload : [];
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCartServer.fulfilled, (state, action) => {
        const itemIndex = state.items.findIndex((item) => item.productId === action.payload.productId);
        if (itemIndex >= 0) {
          state.items[itemIndex].quantity += 1;
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
        }
      })
      .addCase(addToCartServer.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.items = action.payload; // Update the state with the server's response
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeFromCartServer.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.productId !== action.payload);
      })
      .addCase(removeFromCartServer.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
