import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash2, PlusCircle, Search } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

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


export default function StoreManagement() {
  const [stores, setStores] = useState(allStores);
  const [searchTerm, setSearchTerm] = useState('');
  const { addNotification } = useNotifications();

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (storeId: string) => {
    const confirmation = window.confirm('Are you sure you want to delete this store?');
    if (confirmation) {
      setStores(prevStores => prevStores.filter(store => store.id !== storeId));
      addNotification({
        type: 'success',
        title: 'Store Deleted!',
        message: `Store with ID ${storeId} has been removed.`,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Store Management</h1>
        <Link to="/admin/stores/add" className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <PlusCircle size={20} />
          <span>Add New Store</span>
        </Link>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Filter stores by name, address, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg">
        {filteredStores.length > 0 ? (
          <div className="space-y-4">
            {filteredStores.map((store) => (
              <div key={store.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-gray-800">{store.name}</span>
                  <p className="text-sm text-gray-500 truncate">{store.address}</p>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to={`/admin/stores/${store.id}/view`}
                    className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                  >
                    <Eye size={20} />
                  </Link>
                  <Link
                    to={`/admin/stores/${store.id}/edit`}
                    className="p-2 rounded-full text-gray-500 hover:text-green-600 hover:bg-gray-100 transition-colors"
                  >
                    <Edit size={20} />
                  </Link>
                  <button
                    onClick={() => handleDelete(store.id)}
                    className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-gray-100 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No stores found.</p>
        )}
      </div>
    </div>
  );
}