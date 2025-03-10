import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../redux/userSlice';
import { clearCart } from '../redux/cartSlice'; // Import the action
import '../styles/PaymentPortal.css';

const PaymentPortal = () => {
  const location = useLocation();
  const { cart, total } = location.state || { cart: [], total: 0 };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '', 
    cardNumber: '1234567891011121', 
    expiry: '12/24', 
    cvv: '123', 
    street: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    cardNumber: false,
    expiry: false,
    cvv: false,
    street: false,
    city: false,
    state: false,
    postalCode: false,
  });

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserData());
    } else {
      setFormData((prevData) => ({
        ...prevData,
        street: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        postalCode: user.address?.postalCode || '',
      }));
    }
  }, [dispatch, user]);

  const createOrder = async (userId, cart, shippingAddress, totalPrice) => {
    try {
      const orderData = {
        userId,
        cart: cart.map(item => ({
          title: item.title,
          thumbnail: item.thumbnail,
          productId: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress,
        total: totalPrice,
        paymentStatus: 'success',
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.status === 201) {
        dispatch(clearCart()); // Clear the cart after successful order
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    errors.name = formData.name.trim() === '';
    errors.cardNumber = formData.cardNumber.length !== 16;
    errors.expiry = !/\d{2}\/\d{2}/.test(formData.expiry);
    errors.cvv = formData.cvv.length !== 3;
    errors.street = formData.street.trim() === '';
    errors.city = formData.city.trim() === '';
    errors.state = formData.state.trim() === '';
    errors.postalCode = formData.postalCode.trim() === '';

    setFormErrors(errors);
    return Object.values(errors).some((error) => error);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setPaymentStatus('success');
      const shippingAddress = {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
      };

      createOrder(user._id, cart, shippingAddress, total); 
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
            <li key={item._id}>
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
          className={formErrors.name ? 'error' : ''}
        />
        {formErrors.name && <small className="error-message">Name is required</small>}

        <label>Card Number</label>
        <input
          type="text"
          name="cardNumber"
          placeholder="1234567891011121"
          maxLength="16"
          required
          onChange={handleInputChange}
          className={formErrors.cardNumber ? 'error' : ''}
          value={formData.cardNumber} 
        />
        {formErrors.cardNumber && <small className="error-message">Card number must be 16 digits</small>}

        <div className="card-info">
          <div>
            <label>Expiry Date</label><br />
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              maxLength="5"
              required
              onChange={handleInputChange}
              className={formErrors.expiry ? 'error' : ''}
              value={formData.expiry}
            />
            {formErrors.expiry && <small className="error-message">Invalid expiry format</small>}
          </div>
          <div>
            <label>CVV</label><br />
            <input
              type="text"
              name="cvv"
              placeholder="123"
              maxLength="3"
              required
              onChange={handleInputChange}
              className={formErrors.cvv ? 'error' : ''}
              value={formData.cvv} 
            />
            {formErrors.cvv && <small className="error-message">CVV must be 3 digits</small>}
          </div>
        </div>

        <h3>Shipping Address</h3>
        <label>Street</label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          required
          className={formErrors.street ? 'error' : ''}
        />
        {formErrors.street && <small className="error-message">Street is required</small>}

        <label>City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          required
          className={formErrors.city ? 'error' : ''}
        />
        {formErrors.city && <small className="error-message">City is required</small>}

        <label>State</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          required
          className={formErrors.state ? 'error' : ''}
        />
        {formErrors.state && <small className="error-message">State is required</small>}

        <label>Postal Code</label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleInputChange}
          required
          className={formErrors.postalCode ? 'error' : ''}
        />
        {formErrors.postalCode && <small className="error-message">Postal code is required</small>}

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
