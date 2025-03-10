import axios from 'axios';

const API_URL = 'https://shoppyglobe-server.onrender.com/api/users'; // Assuming your backend routes start with /api/users

// Login API call
export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
};

// Signup API call
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};
