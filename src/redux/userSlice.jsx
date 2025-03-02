// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
  const res = await fetch('https://dummyjson.com/users/1'); 
  const data = await res.json();
  return {
    name: data.firstName + ' ' + data.lastName,
    email: data.email,
    phone: data.phone,
    address: `${data.address.address}, ${data.address.city}`,
    orders: data.orders || [],
  };
});

const userSlice = createSlice({
  name: 'user',
  initialState: { data: null },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default userSlice.reducer;
