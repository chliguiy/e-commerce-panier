import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import MainApp from './components/MainApp';
import AdminApp from './components/admin/AdminApp';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Main Store Routes */}
          <Route path="/" element={<MainApp />} />
          
          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;