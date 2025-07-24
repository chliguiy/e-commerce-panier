import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import Dashboard from './Dashboard';
import ProductManagement from './ProductManagement';
import CategoryManagement from './CategoryManagement';
import OrderManagement from './OrderManagement';
import UserManagement from './UserManagement';

const AdminApp: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'products':
        return <ProductManagement />;
      case 'categories':
        return <CategoryManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'users':
        return <UserManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayout currentView={currentView} onViewChange={setCurrentView}>
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminApp;