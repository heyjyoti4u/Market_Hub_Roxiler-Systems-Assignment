import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button';

const allStores = [
 
  // Eyeware
  { id: '1', name: 'Lenskart', address: 'Waghodia, Vadodara', category: 'Eyeware', ownerId: 'store_owner_1' },
  { id: '2', name: 'Titan Eye+', address: 'Ajwa Road, Vadodara', category: 'Eyeware', ownerId: 'store_owner_1' },
  { id: '3', name: 'Specky', address: 'Genda Circle, Vadodara', category: 'Eyeware', ownerId: 'store_owner_2' },
  { id: '4', name: 'Prada', address: 'Race Course, Vadodara', category: 'Eyeware', ownerId: 'store_owner_2' },
  // Fashion
  { id: '5', name: 'Zudio', address: 'Inorbit Mall, Vadodara', category: 'Fashion', ownerId: 'store_owner_1' },
  { id: '6', name: 'Westside', address: 'Ajwa Road, Vadodara', category: 'Fashion', ownerId: 'store_owner_1' },
  { id: '7', name: 'Rare Rabbit', address: 'VR Mall, Vadodara', category: 'Fashion', ownerId: 'store_owner_2' },
  { id: '8', name: 'Gucci', address: 'Alkapuri, Vadodara', category: 'Fashion', ownerId: 'store_owner_2' },
  // Bakery
  { id: '9', name: 'Mio Amore', address: 'Agota Bridge Road, Vadodara', category: 'Bakery', ownerId: 'store_owner_1' },
  { id: '10', name: 'Atul Bakery', address: 'Fatehgunj, Vadodara', category: 'Bakery', ownerId: 'store_owner_1' },
  { id: '11', name: 'Paris Bakery', address: 'New VIP Road, Vadodara', category: 'Bakery', ownerId: 'store_owner_2' },
  { id: '12', name: 'Starbucks', address: 'Karelibaug, Vadodara', category: 'Bakery', ownerId: 'store_owner_2' },
  // Food
  { id: '13', name: 'KFC', address: 'OP Road, Vadodara', category: 'Food', ownerId: 'store_owner_1' },
  { id: '14', name: 'Burger King', address: 'Taksh Galaxy Mall, Vadodara', category: 'Food', ownerId: 'store_owner_1' },
  { id: '15', name: 'Pizza Hut', address: 'Akota, Vadodara', category: 'Food', ownerId: 'store_owner_2' },
  { id: '16', name: 'Dominos', address: 'Vasna Bhayli Road', category: 'Food', ownerId: 'store_owner_2' },
];

export default function AdminViewStore() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const store = allStores.find(s => s.id === id);

  if (!store) {
    return <div className="p-8 text-center text-red-500">Store not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Store Details: {store.name}</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Store Name</p>
          <p className="text-lg font-medium text-gray-800">{store.name}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Address</p>
          <p className="text-lg font-medium text-gray-800">{store.address}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Category</p>
          <p className="text-lg font-medium text-gray-800">{store.category}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Owner ID</p>
          <p className="text-lg font-medium text-gray-800">{store.ownerId}</p>
        </div>
        <div className="mt-6">
          <Button onClick={() => navigate('/dashboard')}>Go Back to Dashboard</Button>
        </div>
      </div>
    </div>
  );
}