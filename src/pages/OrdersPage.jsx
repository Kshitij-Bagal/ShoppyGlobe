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

  // Handle case where no orders are found
  if (!orders || !orders.products || orders.products.length === 0) {
    return <p>No past orders found.</p>;
  }

  return (
    <div className="orders-page">
      <h2>Order History</h2>
      <div className="order-card">
        <h3>Order ID: {orders.id}</h3>
        <p>
          <strong>Total Price:</strong> ${orders.total}
        </p>
        <p>
          <strong>Total Items:</strong> {orders.totalProducts}
        </p>
        <div className="order-items">
          {orders.products.map((product) => (
            <div key={product.id} className="order-item">
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <p>{product.title}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Price: ${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
