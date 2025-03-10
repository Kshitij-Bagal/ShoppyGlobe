import { useParams } from 'react-router-dom';
import useFetchOrders from '../hooks/useFetchOrders';
import '../styles/OrdersPage.css';

const OrdersPage = () => {
  const { userId } = useParams();
  const fallbackUserId = localStorage.getItem('userId') || 1;
  const validUserId = userId || fallbackUserId;

  const { orders, loading, error } = useFetchOrders(validUserId);

  if (loading) return <p>Loading order history...</p>;
  if (error) return <p>{error}</p>;

  // Handle case where no orders are found, show a user-friendly message
  if (orders.length === 0) {
    return <p>No past orders found.</p>;
  }

  return (
    <div className="orders-page">
      <h2>Order History</h2>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <h3>Order ID: {order._id}</h3>
          <p>
            <strong>Total Price:</strong> ${order.total}
          </p>
          <div className="order-items">
            {/* Check if cart exists and is an array */}
            {Array.isArray(order.cart) && order.cart.length > 0 ? (
              order.cart.map((product) => (
                <div key={product._id} className="order-item">
                  {/* Assuming productId is a reference to the product document */}
                  {/* Replace with actual image source or thumbnail if available */}
                  <img 
                  src={product.thumbnail}
                    alt={`${product.title}`} 
                  />
                  <div>
                    <p>{product.title}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Price: ${product.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No products in this order.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
