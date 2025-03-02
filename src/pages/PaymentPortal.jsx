import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/PaymentPortal.css';

const PaymentPortal = () => {
  const location = useLocation();
  const { cart, total } = location.state || { cart: [], total: 0 };

  const [paymentStatus, setPaymentStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (formData.cardNumber && formData.expiry && formData.cvv) {
      setPaymentStatus('success');
    } else {
      setPaymentStatus('failure');
    }
  };

  return (
    <div className="payment-portal">


      <div className="product-summary">
        <h2>Demo Payment Portal</h2>
        <h3>Order Summary</h3>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.title} x {item.quantity} - ${item.price * item.quantity}
            </li>
          ))}
        </ul>
        <h4>Total: ${total.toFixed(2)}</h4>
      </div>

      <form onSubmit={handlePayment} className="payment-form">
        <h3>Payment Details</h3>

        <label>Name on Card</label>
        <input
          type="text"
          name="name"
          placeholder="John Doe"
          required
          onChange={handleInputChange}
        />

        <label>Card Number</label>
        <input
          type="text"
          name="cardNumber"
          placeholder="1234 5678 9101 1121"
          maxLength="16"
          required
          onChange={handleInputChange}
        />

        <div className="card-info">
          <div>
            <label>Expiry Date</label><br/>
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              maxLength="5"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>CVV</label>
            <br/>
            <input
              type="text"
              name="cvv"
              placeholder="123"
              maxLength="3"
              required
              onChange={handleInputChange}
            />
          </div>
        </div>

        <button type="submit">Pay Now</button>
      </form>

      {paymentStatus === 'success' && (
        <div className="payment-success">
          ✅ Payment Successful! Thank you for your purchase.
        </div>
      )}
      {paymentStatus === 'failure' && (
        <div className="payment-failure">
          ❌ Payment Failed! Please check your card details and try again.
        </div>
      )}
    </div>
  );
};

export default PaymentPortal;
