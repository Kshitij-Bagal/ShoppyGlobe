import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../redux/userSlice'; 
import '../styles/UserProfile.css';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false); 
  const [updatedData, setUpdatedData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    age: '',
    phone: '',
    gender: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
  });

  const dispatch = useDispatch();
  const token = localStorage.getItem('token'); 
  const navigate = useNavigate(); // To handle redirection

  if (!token) {
    window.location.href = '/login'; 
    return;
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://shoppyglobe-server.onrender.com/api/users/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        setUser(data);
  
        // Store the user role in localStorage
        localStorage.setItem('userRole', data.role);
  
        dispatch(setUserToken(token));
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, [token, dispatch]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
    if (!editMode && user) {
      // Pre-fill the updatedData state with the current user values when entering edit mode
      setUpdatedData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        username: user.username || '',
        age: user.age || '',
        phone: user.phone || '',
        gender: user.gender || '',
        address: user.address || {
          street: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
        },
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address')) {
      const addressField = name.split('.')[1];
      setUpdatedData((prevState) => ({
        ...prevState,
        address: { ...prevState.address, [addressField]: value },
      }));
    } else {
      setUpdatedData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://shoppyglobe-server.onrender.com/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      setUser(data); 
      setEditMode(false); 
    } catch (err) {
      console.error('Error updating user data:', err);
      setError(err.message);
    }
  };

  // Check if all required fields are filled
  const isFormValid = updatedData.firstName && updatedData.lastName && updatedData.email && updatedData.username && updatedData.age && updatedData.phone && updatedData.gender && updatedData.address.street && updatedData.address.city && updatedData.address.state && updatedData.address.postalCode && updatedData.address.country;

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  // Check if the user is an admin
  const isAdmin = user?.role === 'admin';

  return (
    <div className="user-profile">
      <h2 className="profile-heading">
        Welcome, {user?.firstName} {user?.lastName}
      </h2>
      <div className="profile-details">
        <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
        <p><strong>Username:</strong> {user?.username || 'N/A'}</p>
        <p><strong>Phone:</strong> {user?.phone || 'N/A'}</p>

        {/* Editable Fields */}
        {editMode ? (
          <>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={updatedData.firstName}
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={updatedData.lastName}
              onChange={handleChange}
            />
            <br />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={updatedData.email}
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={updatedData.username}
              onChange={handleChange}
            />
            <br />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={updatedData.age}
              onChange={handleChange}
            />
            <br />
            <input
              type="number"
              name="phone"
              placeholder="Phone"
              value={updatedData.phone}
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              value={updatedData.gender}
              onChange={handleChange}
            />
            <br />
            <div className="profile-address">
              <h3>Address:</h3>
              <input
                type="text"
                name="address.street"
                placeholder="Street"
                value={updatedData.address.street}
                onChange={handleChange}
              />
              <br />
              <input
                type="text"
                name="address.city"
                placeholder="City"
                value={updatedData.address.city}
                onChange={handleChange}
              />
              <br />
              <input
                type="text"
                name="address.state"
                placeholder="State"
                value={updatedData.address.state}
                onChange={handleChange}
              />
              <br />
              <input
                type="text"
                name="address.postalCode"
                placeholder="Postal Code"
                value={updatedData.address.postalCode}
                onChange={handleChange}
              />
              <br />
              <input
                type="text"
                name="address.country"
                placeholder="Country"
                value={updatedData.address.country}
                onChange={handleChange}
              />
            </div>
            <br />
            <button onClick={handleSave} disabled={!isFormValid}>Save</button>
            <button onClick={handleEditToggle}>Cancel</button>
          </>
        ) : (
          <>
            <p><strong>Age:</strong> {user?.age || 'N/A'}</p>
            <p><strong>Gender:</strong> {user?.gender || 'N/A'}</p>
            <div className="profile-address">
              <h3>Address:</h3>
              <p>
                {user?.address?.street || 'N/A'}, {user?.address?.city || 'N/A'}, 
                {user?.address?.state || 'N/A'}, {user?.address?.postalCode || 'N/A'}, 
                {user?.address?.country || 'N/A'}
              </p>
            </div>
            <button onClick={handleEditToggle}>Edit Profile</button>
          </>
        )}

        {/* Admin Controls */}
        {isAdmin && (
          <div className="admin-controls">
            <h3>Admin Panel</h3>
            <Link to='/adminproducts' >
            <button>Update Product Database</button></Link>
            <Link to='/adminusers'>
            <button>Manage User Accounts</button></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
