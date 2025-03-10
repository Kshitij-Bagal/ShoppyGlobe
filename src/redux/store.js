// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from './userSlice.js'; // Add user slice

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;
