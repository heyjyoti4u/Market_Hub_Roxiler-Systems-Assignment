import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, PlusCircle, Search } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

const allUsers = [
  { id: '1', name: 'Admin User', email: 'admin@markethub.com', role: 'admin' },
  { id: 'store_owner_1', name: 'Store Owner 1', email: 'store1@markethub.com', role: 'store_owner' },
  { id: 'store_owner_2', name: 'Store Owner 2', email: 'store2@markethub.com', role: 'store_owner' },
  { id: '3', name: 'John Customer', email: 'customer@markethub.com', role: 'customer' },
  { id: '4', name: 'Jane Doe', email: 'jane@example.com', role: 'customer' },
];

export default function UserManagement() {
  const [users, setUsers] = useState(allUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const { addNotification } = useNotifications();

  const filteredUsers = users.filter(user =>
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (roleFilter === 'all' || user.role === roleFilter)
  );

  const handleDelete = (userId: string) => {
    const confirmation = window.confirm('Are you sure you want to delete this user?');
    if (confirmation) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      addNotification({
        type: 'success',
        title: 'User Deleted!',
        message: `User with ID ${userId} has been removed.`,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <Link to="/admin/users/add" className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <PlusCircle size={20} />
          <span>Add New User</span>
        </Link>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Filter users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="store_owner">Store Owner</option>
            <option value="customer">Customer</option>
          </select>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg">
        {filteredUsers.length > 0 ? (
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-gray-800">{user.name}</span>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>
                <div className="flex space-x-2">
                  <span className="capitalize text-sm font-medium text-gray-600">{user.role.replace('_', ' ')}</span>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-gray-100 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
}