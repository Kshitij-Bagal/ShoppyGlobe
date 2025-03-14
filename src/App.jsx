import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute'; // Wrapper to handle protected routes
import AdminRoute from './components/AdminRoute'; // Admin protection wrapper
import { fetchCart } from './redux/cartSlice'; // Fetch cart data on load
import { setUserToken } from './redux/userSlice.js';
import './App.css';

// Lazy loading components for better performance
const Home = lazy(() => import('./pages/Home'));
const BrowseProduct = lazy(() => import('./pages/BrowseProduct'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const CheckOut = lazy(() => import('./pages/CheckOut'));
const CartPage = lazy(() => import('./pages/CartPage'));
const PaymentPortal = lazy(() => import('./pages/PaymentPortal'));
const NotFound = lazy(() => import('./pages/NotFound'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const LoginSignup = lazy(() => import('./pages/LoginSignup'));

// Admin Pages (Lazy-loaded)
const AdminProduct = lazy(() => import('./pages/AdminProduct'));
const AdminUsers = lazy(() => import('./pages/AdminUsers'));

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');


  // Fetch cart data on app load (if logged in)
  useEffect(() => {
    if (token) {
      dispatch(setUserToken(token));
      dispatch(fetchCart());
    }
  }, [dispatch, token]);

  return (
    <BrowserRouter basename="/ShoppyGlobe/">
      <ScrollToTop />
      <Header />
      <div className="app-container">
        <Suspense fallback={<div className="loading-screen">Loading...</div>}>
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/browse" element={<ProtectedRoute><BrowseProduct /></ProtectedRoute>} />
              <Route path="/products/:ProductId" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
              <Route path="/cartpage" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
              <Route path="/login" element={<ProtectedRoute><LoginSignup /></ProtectedRoute>} />

              {/* Protected Routes */}
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <CheckOut />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/paymentportal"
                element={
                  <ProtectedRoute>
                    <PaymentPortal />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <OrdersPage />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/adminproducts"
                element={
                  <AdminRoute>
                    <AdminProduct />
                  </AdminRoute>
                }
              />
              <Route
                path="/adminusers"
                element={
                  <AdminRoute>
                    <AdminUsers />
                  </AdminRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
