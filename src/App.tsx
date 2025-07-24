import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import MainApp from './components/MainApp';
import AdminApp from './components/admin/AdminApp';
import LoginPage from './components/auth/LoginPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Main Store Routes */}
            <Route path="/" element={<MainApp />} />
            
            {/* Auth Routes */}
            <Route path="/admin/login" element={<LoginPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/*" element={<AdminApp />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;