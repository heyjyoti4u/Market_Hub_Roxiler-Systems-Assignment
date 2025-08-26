import { Store, Users, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRatings } from '../contexts/RatingContext';

const allStores = [
  { id: '1', name: 'Lenskart', address: 'Waghodia, Vadodara', category: 'Eyeware', ownerId: 'store_owner_1' },
  { id: '2', name: 'Titan Eye+', address: 'Ajwa Road, Vadodara', category: 'Eyeware', ownerId: 'store_owner_1' },
  { id: '3', name: 'Specky', address: 'Genda Circle, Vadodara', category: 'Eyeware', ownerId: 'store_owner_2' },
  { id: '4', name: 'Prada', address: 'Race Course, Vadodara', category: 'Eyeware', ownerId: 'store_owner_2' },
  { id: '5', name: 'Zudio', address: 'Inorbit Mall, Vadodara', category: 'Fashion', ownerId: 'store_owner_1' },
  { id: '6', name: 'Westside', address: 'Ajwa Road, Vadodara', category: 'Fashion', ownerId: 'store_owner_1' },
  { id: '7', name: 'Rare Rabbit', address: 'VR Mall, Vadodara', category: 'Fashion', ownerId: 'store_owner_2' },
  { id: '8', name: 'Gucci', address: 'Alkapuri, Vadodara', category: 'Fashion', ownerId: 'store_owner_2' },
  { id: '9', name: 'Mio Amore', address: 'Agota Bridge Road, Vadodara', category: 'Bakery', ownerId: 'store_owner_1' },
  { id: '10', name: 'Atul Bakery', address: 'Fatehgunj, Vadodara', category: 'Bakery', ownerId: 'store_owner_1' },
  { id: '11', name: 'Paris Bakery', address: 'New VIP Road, Vadodara', category: 'Bakery', ownerId: 'store_owner_2' },
  { id: '12', name: 'Starbucks', address: 'Karelibaug, Vadodara', category: 'Bakery', ownerId: 'store_owner_2' },
  { id: '13', name: 'KFC', address: 'OP Road, Vadodara', category: 'Food', ownerId: 'store_owner_1' },
  { id: '14', name: 'Burger King', address: 'Taksh Galaxy Mall, Vadodara', category: 'Food', ownerId: 'store_owner_1' },
  { id: '15', name: 'Pizza Hut', address: 'Akota, Vadodara', category: 'Food', ownerId: 'store_owner_2' },
  { id: '16', name: 'Dominos', address: 'Vasna Bhayli Road', category: 'Food', ownerId: 'store_owner_2' },
];

const allUsers = [
  { id: '1', name: 'Admin User', email: 'admin@markethub.com', role: 'admin' },
  { id: 'store_owner_1', name: 'Store Owner 1', email: 'store1@markethub.com', role: 'store_owner' },
  { id: 'store_owner_2', name: 'Store Owner 2', email: 'store2@markethub.com', role: 'store_owner' },
  { id: '3', name: 'John Customer', email: 'customer@markethub.com', role: 'customer' },
  { id: '4', name: 'Jane Doe', email: 'jane@example.com', role: 'customer' },
];


export default function AdminDashboard() {
  const { ratings } = useRatings();

  const totalUsers = allUsers.length;
  const totalStores = allStores.length;
  const totalRatings = ratings.length;
  const averageRating = totalRatings > 0 ? (ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings).toFixed(1) : '0.0';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">Admin Dashboard</h1>
        <p className="mt-4 text-lg text-gray-600">
          Welcome, System Administrator! Here's an overview of your marketplace.
        </p>
      </div>

      { }
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
          <div className="p-3 rounded-full bg-orange-100 text-orange-600">
            <Store size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Stores</p>
            <p className="text-2xl font-bold text-gray-900">{totalStores}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600">
            <Star size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Ratings</p>
            <p className="text-2xl font-bold text-gray-900">{totalRatings}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
          <div className="p-3 rounded-full bg-green-100 text-green-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Average Rating</p>
            <p className="text-2xl font-bold text-gray-900">{averageRating}</p>
          </div>
        </div>
      </div>

      { /* Management Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Store Management</h2>
          <p className="text-gray-600 mb-6">Add new stores and manage existing store listings.</p>
          <Link to="/admin/stores" className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Manage Stores
          </Link>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">User Management</h2>
          <p className="text-gray-600 mb-6">Add new users and manage existing user accounts.</p>
          <Link to="/admin/users" className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Manage Users
          </Link>
        </div>
      </div>
    </div>
  );
}
