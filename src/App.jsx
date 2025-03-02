import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import Header from './components/Header';
import './App.css';
import ScrollToTop from './components/ScrollToTop';

// Lazy loading components
const Home = lazy(() => import('./pages/Home'));
const BrowseProduct = lazy(() => import('./pages/BrowseProduct'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const CheckOut = lazy(() => import('./pages/CheckOut'));
const CartPage = lazy(() => import('./pages/CartPage'));
const PaymentPortal = lazy(() => import('./pages/PaymentPortal'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Profile = lazy(() => import('./pages/UserProfile'));
const Orders = lazy(() => import('./pages/OrdersPage'));
const LoginSignup = lazy(() => import('./pages/LoginSignup'));

// Helper function to check authentication
const getUserId = () => localStorage.getItem('userId');

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Header />
      <div className="app-container">
        <Suspense fallback={<div className="loading-screen">Loading...</div>}>
          <main className="main-content">
            <Routes>
              <Route path="/ShoppyGlobe/" element={<Home />} />
              <Route path="/ShoppyGlobe/browse" element={<BrowseProduct />} />
              <Route path="/ShoppyGlobe/product/:productName" element={<ProductDetail />} />
              <Route path="/ShoppyGlobe/checkout" element={getUserId() ? <CheckOut /> : <Navigate to="/ShoppyGlobe/login" />} />
              <Route path="/ShoppyGlobe/cartpage" element={<CartPage />} />
              <Route path="/ShoppyGlobe/paymentportal" element={getUserId() ? <PaymentPortal /> : <Navigate to="/ShoppyGlobe/login" />} />
              <Route path="/ShoppyGlobe/profile" element={getUserId() ? <Profile /> : <Navigate to="/ShoppyGlobe/login" />} />
              <Route path="/ShoppyGlobe/orders" element={getUserId() ? <Orders /> : <Navigate to="/ShoppyGlobe/login" />} />
              <Route path="/ShoppyGlobe/login" element={<LoginSignup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
