import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Store, MapPin, Tag } from 'lucide-react';
import Button from '../../components/UI/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';

const allStores = [
  // Eyeware
  {
    id: '1',
    name: 'Lenskart',
    address: 'Waghodia, Vadodara',
    category: 'Eyeware',
    ownerId: '2'
  },
  {
    id: '2',
    name: 'Titan Eye+',
    address: 'Ajwa Road, Vadodara',
    category: 'Eyeware',
    ownerId: '2'
  },
  {
    id: '3',
    name: 'Specky',
    address: 'Genda Circle, Vadodara',
    category: 'Eyeware',
    ownerId: '2'
  },
  {
    id: '4',
    name: 'Prada',
    address: 'Race Course, Vadodara',
    category: 'Eyeware',
    ownerId: 'store_2'
  },
  // Fashion
  {
    id: '5',
    name: 'Zudio',
    address: 'Inorbit Mall, Vadodara',
    category: 'Fashion',
    ownerId: 'store_2'
  },
  {
    id: '6',
    name: 'Westside',
    address: 'Ajwa Road, Vadodara',
    category: 'Fashion',
    ownerId: '2'
  },
  {
    id: '7',
    name: 'Rare Rabbit',
    address: 'VR Mall, Vadodara',
    category: 'Fashion',
    ownerId: '2'
  },
  {
    id: '8',
    name: 'Gucci',
    address: 'Alkapuri, Vadodara',
    category: 'Fashion',
    ownerId: 'store_2'
  },
  // Bakery
  {
    id: '9',
    name: 'Mio Amore',
    address: 'Agota Bridge Road, Vadodara',
    category: 'Bakery',
    ownerId: 'store_2'
  },
  {
    id: '10',
    name: 'Atul Bakery',
    address: 'Fatehgunj, Vadodara',
    category: 'Bakery',
    ownerId: '2'
  },
  {
    id: '11',
    name: 'Paris Bakery',
    address: 'New VIP Road, Vadodara',
    category: 'Bakery',
    ownerId: '2'
  },
  {
    id: '12',
    name: 'Starbucks',
    address: 'Karelibaug, Vadodara',
    category: 'Bakery',
    ownerId: 'store_2'
  },
  // Food
  {
    id: '13',
    name: 'KFC',
    address: 'OP Road, Vadodara',
    category: 'Food',
    ownerId: '2'
  },
  {
    id: '14',
    name: 'Burger King',
    address: 'Taksh Galaxy Mall, Vadodara',
    category: 'Food',
    ownerId: 'store_2'
  },
  {
    id: '15',
    name: 'Pizza Hut',
    address: 'Akota, Vadodara',
    category: 'Food',
    ownerId: 'store_2'
  },
  {
    id: '16',
    name: 'Dominos',
    address: 'Vasna Bhayli Road',
    category: 'Food',
    ownerId: '2'
  },
];


export default function EditStore() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  const [storeData, setStoreData] = useState({
    name: '',
    address: '',
    category: '',
  });

  const store = allStores.find(s => s.id === id);

  useEffect(() => {
    if (store) {
      setStoreData({
        name: store.name,
        address: store.address,
        category: store.category,
      });
    }
  }, [store]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== 'store_owner' || store?.ownerId !== user.id) {
      addNotification({
        type: 'error',
        title: 'Unauthorized',
        message: 'You are not authorized to edit this store.',
      });
      return;
    }

    // Yahan par store update karne ki logic aayegi
    // Abhi ke liye, hum sirf notification dikha rahe hain
    addNotification({
      type: 'success',
      title: 'Store Updated',
      message: `"${storeData.name}" has been updated successfully.`,
    });
    navigate('/dashboard');
  };
  
  if (!store) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Store Not Found</h2>
        <p className="mt-4 text-gray-600">The store you are looking for does not exist.</p>
        <Link to="/dashboard" className="mt-6 inline-block">
          <Button>Go to Dashboard</Button>
        </Link>
      </div>
    );
  }

  // Security check: only allow store owner to edit their own store
  if (user?.role !== 'store_owner' || store.ownerId !== user.id) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Unauthorized Access</h2>
        <p className="mt-4 text-gray-600">You do not have permission to edit this store.</p>
        <Link to="/dashboard" className="mt-6 inline-block">
          <Button>Go to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Edit Store</h2>
          <p className="mt-2 text-sm text-gray-600">
            Update the details for "{store.name}"
          </p>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl border border-white/50 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Store Name
              </label>
              <div className="relative">
                <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="name"
                  type="text"
                  value={storeData.name}
                  onChange={(e) => setStoreData({ ...storeData, name: e.target.value })}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter store name"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="address"
                  type="text"
                  value={storeData.address}
                  onChange={(e) => setStoreData({ ...storeData, address: e.target.value })}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter store address"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="category"
                  type="text"
                  value={storeData.category}
                  onChange={(e) => setStoreData({ ...storeData, category: e.target.value })}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter category"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Update Store
            </Button>
            <Link to="/dashboard">
              <Button type="button" variant="ghost" className="w-full">
                Cancel
              </Button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}