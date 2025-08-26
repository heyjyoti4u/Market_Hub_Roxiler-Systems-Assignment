import { useState, useEffect } from 'react';
import { Star, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useRatings } from '../contexts/RatingContext';

const allStores = [
  { id: '1', name: 'Lenskart', address: 'Waghodia, Vadodara', category: 'Eyeware', ownerId: '2' },
  { id: '2', name: 'Titan Eye+', address: 'Ajwa Road, Vadodara', category: 'Eyeware', ownerId: '2' },
  { id: '3', name: 'Specky', address: 'Genda Circle, Vadodara', category: 'Eyeware', ownerId: '2' },
  { id: '4', name: 'Prada', address: 'Race Course, Vadodara', category: 'Eyeware', ownerId: 'store_2' },
  { id: '5', name: 'Zudio', address: 'Inorbit Mall, Vadodara', category: 'Fashion', ownerId: 'store_2' },
  { id: '6', name: 'Westside', address: 'Ajwa Road, Vadodara', category: 'Fashion', ownerId: '2' },
  { id: '7', name: 'Rare Rabbit', address: 'VR Mall, Vadodara', category: 'Fashion', ownerId: '2' },
  { id: '8', name: 'Gucci', address: 'Alkapuri, Vadodara', category: 'Fashion', ownerId: 'store_2' },
  { id: '9', name: 'Mio Amore', address: 'Agota Bridge Road, Vadodara', category: 'Bakery', ownerId: 'store_2' },
  { id: '10', name: 'Atul Bakery', address: 'Fatehgunj, Vadodara', category: 'Bakery', ownerId: '2' },
  { id: '11', name: 'Paris Bakery', address: 'New VIP Road, Vadodara', category: 'Bakery', ownerId: '2' },
  { id: '12', name: 'Starbucks', address: 'Karelibaug, Vadodara', category: 'Bakery', ownerId: 'store_2' },
  { id: '13', name: 'KFC', address: 'OP Road, Vadodara', category: 'Food', ownerId: '2' },
  { id: '14', name: 'Burger King', address: 'Taksh Galaxy Mall, Vadodara', category: 'Food', ownerId: 'store_2' },
  { id: '15', name: 'Pizza Hut', address: 'Akota, Vadodara', category: 'Food', ownerId: 'store_2' },
  { id: '16', name: 'Dominos', address: 'Vasna Bhayli Road', category: 'Food', ownerId: '2' },
];

export default function CustomerDashboard() {
  const { user, logout } = useAuth();
  const { ratings } = useRatings();
  const [userRatings, setUserRatings] = useState([]);

  useEffect(() => {
    const filteredRatings = ratings.filter(rating => rating.userId === user?.id);
    setUserRatings(filteredRatings);
  }, [ratings, user?.id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-12">
        <div className="text-left">
          <h1 className="text-4xl font-extrabold text-gray-900">Your Ratings</h1>
          <p className="mt-2 text-lg text-gray-600">
            Welcome, {user?.name}! Here are your submitted reviews.
          </p>
        </div>
        <button
          onClick={logout}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg">
        {userRatings.length > 0 ? (
          <div className="space-y-6">
            {userRatings.map(review => {
              const store = allStores.find(s => s.id === review.storeId);
              return (
                <div key={review.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-800">
                        {store?.name || 'Unknown Store'}
                      </p>
                      <p className="text-sm text-gray-500">{store?.address || ''}</p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-gray-600">{review.feedback}</p>
                  <p className="text-xs text-gray-400 mt-2 text-right">
                    {new Date(review.date).toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">You have not submitted any reviews yet.</p>
        )}
      </div>
    </div>
  );
}