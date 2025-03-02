import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginSignup.css';

const LoginSignup = () => {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userId) {
      localStorage.setItem('userId', userId);
      navigate('/ShoppyGlobe/profile');
    }
  };

  const handleSignup = () => {
    if (userId) {
      alert('Signup successful! You can now log in with this ID.');
    }
  };

  return (
    <div className="login-signup-page">
      <h1>Welcome to ShoppyGlobe</h1>
      <div className="login-signup-form">
        <div>
        <input
          type="number"
          placeholder="Enter User ID (1-30)"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <div className="button-group">
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleSignup}>Signup</button></div>
      <div className="login-signup-message">
        <div>
          <strong>Why Use a Counter for Login/Signup?</strong>
          <br />
          We use a simple User ID (1–30) as a "counter" to simulate login/signup functionality. Since we’re fetching user data from a public API (
          <code>https://dummyjson.com/users</code>), each ID represents a unique user profile.
          <br /><br />
          <ul>
            <li><b>Login Button:</b> Fetches the user profile for the entered ID.</li>
            <li><b>Signup Button:</b> Simulates account creation with a success message.</li>
          </ul>
        </div>
      </div>


        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
