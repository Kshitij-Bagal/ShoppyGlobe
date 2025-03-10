// src/redux/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch cart items from server
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found. Please log in.');

    const response = await axios.get('http://localhost:8000/api/cart', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.items;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
  }
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
      'http://localhost:8000/api/cart',
      payload,
      { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    console.error('Add to cart failed:', error.response?.data);
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
              'http://localhost:8000/api/cart', 
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
      await axios.delete('http://localhost:8000/api/cart', {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        data: { productId: id }, // Pass productId in the body
      });
      return id;
    } catch (error) {
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
