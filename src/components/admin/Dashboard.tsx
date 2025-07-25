import React, { useState, useEffect } from 'react';
import { Package, FolderOpen, ShoppingCart, Users, TrendingUp, Euro, AlertCircle } from 'lucide-react';
import { AdminApiService } from '../../utils/adminApi';

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  deliveredOrders: number;
}

interface RecentOrder {
  id: number;
  customer_name: string;
  customer_email: string;
  total: number;
  status: string;
  created_at: string;
  items: any[];
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [products, categories, orders] = await Promise.all([
        AdminApiService.getProducts().catch(() => []),
        AdminApiService.getCategories().catch(() => []),
        AdminApiService.getOrders().catch(() => [])
      ]);

      // Calculate statistics
      const totalRevenue = orders.reduce((sum: number, order: any) => sum + parseFloat(order.total || 0), 0);
      const pendingOrders = orders.filter((order: any) => order.status === 'pending').length;
      const deliveredOrders = orders.filter((order: any) => order.status === 'delivered').length;

      setStats({
        totalProducts: products.length,
        totalCategories: categories.length,
        totalOrders: orders.length,
        totalRevenue,
        pendingOrders,
        deliveredOrders
      });

      // Get recent orders (last 5)
      const sortedOrders = orders
        .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);
      
      setRecentOrders(sortedOrders);

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Erreur lors du chargement des données du tableau de bord');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'confirmed': return 'Confirmée';
      case 'shipped': return 'Expédiée';
      case 'delivered': return 'Livrée';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  const calculateGrowth = (current: number, type: string) => {
    // Mock growth calculation - in real app, you'd compare with previous period
    const growthRates = {
      products: 12,
      categories: 25,
      orders: 18,
      revenue: 23
    };
    return growthRates[type as keyof typeof growthRates] || 0;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Erreur de chargement</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  const dashboardStats = [
    {
      name: 'Total Produits',
      value: stats.totalProducts.toString(),
      change: `+${calculateGrowth(stats.totalProducts, 'products')}%`,
      changeType: 'increase',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      name: 'Catégories',
      value: stats.totalCategories.toString(),
      change: `+${calculateGrowth(stats.totalCategories, 'categories')}%`,
      changeType: 'increase',
      icon: FolderOpen,
      color: 'bg-green-500'
    },
    {
      name: 'Commandes',
      value: stats.totalOrders.toString(),
      change: `+${calculateGrowth(stats.totalOrders, 'orders')}%`,
      changeType: 'increase',
      icon: ShoppingCart,
      color: 'bg-yellow-500'
    },
    {
      name: 'Revenus',
      value: `${stats.totalRevenue.toFixed(2)} MAD`,
      change: `+${calculateGrowth(stats.totalRevenue, 'revenue')}%`,
      changeType: 'increase',
      icon: Euro,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">Vue d'ensemble de votre boutique</p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          Actualiser
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-1">ce mois</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Statut des commandes</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">En attente</span>
              <span className="font-semibold text-yellow-600">{stats.pendingOrders}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Livrées</span>
              <span className="font-semibold text-green-600">{stats.deliveredOrders}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total</span>
              <span className="font-semibold text-gray-900">{stats.totalOrders}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenus</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total des ventes</span>
              <span className="font-semibold text-green-600">{stats.totalRevenue.toFixed(2)} MAD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Commande moyenne</span>
              <span className="font-semibold text-gray-900">
                {stats.totalOrders > 0 ? (stats.totalRevenue / stats.totalOrders).toFixed(2) : '0.00'} MAD
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Croissance</span>
              <span className="font-semibold text-blue-600">+23%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Commandes récentes</h2>
        </div>
        {recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commande
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.customer_name}</div>
                        <div className="text-sm text-gray-500">{order.customer_email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {parseFloat(order.total.toString()).toFixed(2)} MAD
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center">
            <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune commande récente</h3>
            <p className="text-gray-500">Les commandes apparaîtront ici une fois passées.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;