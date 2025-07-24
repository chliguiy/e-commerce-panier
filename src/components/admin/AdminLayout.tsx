import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  FolderOpen, 
  ShoppingCart, 
  Users, 
  Menu,
  X,
  LogOut
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentView, onViewChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'products', label: 'Produits', icon: Package },
    { id: 'categories', label: 'Catégories', icon: FolderOpen },
    { id: 'orders', label: 'Commandes', icon: ShoppingCart },
    { id: 'users', label: 'Utilisateurs Admin', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <LayoutDashboard className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
              <p className="text-xs text-gray-500">BoutiqueFR</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentView === item.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="mr-3 h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
            <LogOut className="mr-3 h-5 w-5" />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;