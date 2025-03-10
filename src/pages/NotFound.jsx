import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <p><strong>Test Mode:</strong> You tried to access: <code>{location.pathname}</code></p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default NotFound;
