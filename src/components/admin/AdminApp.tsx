import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import Dashboard from './Dashboard';
import ProductManagement from './ProductManagement';
import CategoryManagement from './CategoryManagement';
import OrderManagement from './OrderManagement';
import UserManagement from './UserManagement';

const AdminApp: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductManagement />} />
        <Route path="/categories" element={<CategoryManagement />} />
        <Route path="/orders" element={<OrderManagement />} />
        <Route path="/users" element={<UserManagement />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminApp;