import { useState, useEffect } from 'react';

const useFetchUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId') || 1; // Fallback to user ID 1

  useEffect(() => {
    if (userId) {
      fetch(`https://dummyjson.com/users/${userId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('User not found');
          }
          return res.json();
        })
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [userId]);

  return { user, loading, error };
};

export default useFetchUser;
