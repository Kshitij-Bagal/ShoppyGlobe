import { useState, useEffect } from 'react';

const useFetchOrders = (userId) => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fallbackUserId = 1;

  useEffect(() => {
    const idToFetch = userId || fallbackUserId;

    fetch(`https://dummyjson.com/carts/${idToFetch}`)
      .then((res) => {
        if (!res.ok) throw new Error('Orders not found');
        return res.json();
      })
      .then((data) => {
        console.log('Fetched Orders:', data);
        setOrders(data); // No array wrapping — store the object directly
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  return { orders, loading, error };
};

export default useFetchOrders;
