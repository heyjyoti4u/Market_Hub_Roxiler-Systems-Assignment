import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button';
import { useNotifications } from '../../contexts/NotificationContext';

const allStores = [
   
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


export default function AdminEditStore() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  const storeToEdit = allStores.find(s => s.id === id);
  const [formData, setFormData] = useState({
    name: storeToEdit?.name || '',
    address: storeToEdit?.address || '',
  });

  if (!storeToEdit) {
    return <div className="p-8 text-center text-red-500">Store not found.</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Updating store ${id} with data:`, formData);
   
    addNotification({
      type: 'success',
      title: 'Store Updated!',
      message: `Store "${formData.name}" has been updated successfully.`,
    });
    navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Store: {storeToEdit.name}</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Store Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Store Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex space-x-4">
          <Button type="submit">Save Changes</Button>
          <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}