import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <AuthProvider>
          <App />
      </AuthProvider>
    </React.StrictMode>
  </Provider>
)
