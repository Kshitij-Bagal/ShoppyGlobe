import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import '../styles/LoginSignup.css';

const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState(''); // New state for username
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();

  // Handle user login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const { user, token } = await loginUser({ email, password });
        if (user && token) {
          setUser(user);
          setToken(token);
          localStorage.setItem('token', token);
          localStorage.setItem('userId', user._id);
          navigate('/profile', { replace: true });
        } else {
          alert('Login failed: Invalid response from server');
        }
      } catch (error) {
        alert('Login failed: ' + (error.response?.data?.message || error.message));
      }
    }
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    if (firstName && lastName && username && email && password) {
      try {
        const { user, token } = await registerUser({ firstName, lastName, username, email, password });
        if (user && token) {
          setUser(user);
          setToken(token);
          localStorage.setItem('token', token);
          localStorage.setItem('userId', user._id);
          navigate('/profile', { replace: true });
        } else {
          alert('Signup failed: Invalid response from server');
        }
      } catch (error) {
        alert('Signup failed: ' + (error.response?.data?.message || error.message));
      }
    }
  };
  

  return (
    <div className="login-signup-container">
      <div className="card-container">
        <div className="card">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          {isLogin ? (
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="button-group">
                <button type="submit">Login</button>
                <button type="button" onClick={() => setIsLogin(false)}>
                  Don't have an account? Sign Up
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Handle username input
              />
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="button-group">
                <button type="submit">Sign Up</button>
                <button type="button" onClick={() => setIsLogin(true)}>
                  Already have an account? Login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
