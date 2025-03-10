import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch user data with authentication
export const fetchUserData = createAsyncThunk('user/fetchUserData', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found. Please log in.');

    const res = await axios.get('https://shoppyglobe-server.onrender.com/api/users/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Save user role in localStorage
    localStorage.setItem('role', res.data.role); // Assuming role is part of the response

    return {
      firstname: res.data.firstName,
      lastName: res.data.lastName,
      email: res.data.email,
      phone: res.data.phone,
      address: {
        street: res.data.address?.street || '',
        city: res.data.address?.city || '',
        state: res.data.address?.state || '',
        postalCode: res.data.address?.postalCode || '',
      },
      orders: res.data.orders || [],
    };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch user data');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, loading: false, error: null },
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
    logoutUser: (state) => {
      state.data = null;
      localStorage.removeItem('token'); // Clear token on logout
      localStorage.removeItem('role'); // Clear role on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUserToken, logoutUser } = userSlice.actions;
export default userSlice.reducer;
