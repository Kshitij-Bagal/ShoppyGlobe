import { useState, useEffect } from 'react';

const useFetchOrders = (userId, apiBaseUrl = 'https://shoppyglobe-server.onrender.com/api') => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    if (!userId) return;

    const token = localStorage.getItem('token'); // Fetch token from localStorage
    if (!token) {
      setError('Authorization token not found');
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${apiBaseUrl}/orders/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch orders');
        }

        setOrders(data.orders || []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching orders:', err);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    return () => controller.abort();
  }, [userId, apiBaseUrl]);

  return { orders, loading, error };
};

export default useFetchOrders;
