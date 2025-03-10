import axios from 'axios';

const apiUrl = 'http://localhost:8000/api/users'; // Replace with your API URL

// Login User
// Login User
export const loginUser = async (credentials) => {
    const { email, password } = credentials;
    try {
      const response = await axios.post(`${apiUrl}/login`, { email, password });
      console.log("Login Response:", response.data); // Add this line for debugging
      return response.data; // { user, token }
    } catch (error) {
      console.error("Login Error:", error); // Log the error for debugging
      throw error;
    }
  };
  
  // Register User
  export const registerUser = async (credentials) => {
    const { firstName, lastName, username, email, password } = credentials;
    try {
      const response = await axios.post(`${apiUrl}/register`, { firstName, lastName, username, email, password });
      console.log("Register Response:", response.data); // Add this line for debugging
      return response.data; // { user, token }
    } catch (error) {
      console.error("Register Error:", error); // Log the error for debugging
      throw error;
    }
  };
  

export const getUserCart = async (token) => {
    const response = await axios.get(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const addToCart = async (productId, quantity, token) => {
    const response = await axios.post(
        `${API_URL}/cart/add`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const checkoutCart = async (token) => {
    const response = await axios.post(`${API_URL}/cart/checkout`, {}, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
