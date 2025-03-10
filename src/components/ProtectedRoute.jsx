import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  

export default ProtectedRoute;
