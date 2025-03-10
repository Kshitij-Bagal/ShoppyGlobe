import { useState, useEffect } from 'react';

const useFetchUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token'); // Fetch token from localStorage

  useEffect(() => {
    if (!token) {
      setError('No token found. Please log in.');
      setLoading(false);
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await fetch('https://shoppyglobe-server.onrender.com/api/users/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Use token for authorization
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
    
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (error) {
      return <div className="error-message">Error: {error}</div>;
    }
    

    fetchUser();
  }, [token]);

  return { user, loading, error };
};

export default useFetchUser;
