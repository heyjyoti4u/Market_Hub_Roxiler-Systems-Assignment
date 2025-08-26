import { useState, useEffect } from 'react';
import { useRatings } from '../contexts/RatingContext';
import { useAuth } from '../contexts/AuthContext';
import { Star, Store, Users, Edit, Eye, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const allStores = [
  {
    id: '1', name: 'Lenskart', address: 'Waghodia, Vadodara', category: 'Eyeware', ownerId: '1',
  },
  {
    id: '2', name: 'Titan Eye+', address: 'Ajwa Road, Vadodara', category: 'Eyeware', ownerId: '2',
  },
  {
    id: '3', name: 'Specky', address: 'Genda Circle, Vadodara', category: 'Eyeware', ownerId: '2',
  },
  {
    id: '4', name: 'Prada', address: 'Race Course, Vadodara', category: 'Eyeware', ownerId: 'store_2',
  },
  {
    id: '5', name: 'Zudio', address: 'Inorbit Mall, Vadodara', category: 'Fashion', ownerId: 'store_2',
  },
  {
    id: '6', name: 'Westside', address: 'Ajwa Road, Vadodara', category: 'Fashion', ownerId: '2',
  },
  {
    id: '7', name: 'Rare Rabbit', address: 'VR Mall, Vadodara', category: 'Fashion', ownerId: '2',
  },
  {
    id: '8', name: 'Gucci', address: 'Alkapuri, Vadodara', category: 'Fashion', ownerId: 'store_2',
  },
  {
    id: '9', name: 'Mio Amore', address: 'Agota Bridge Road, Vadodara', category: 'Bakery', ownerId: 'store_2',
  },
  {
    id: '10', name: 'Atul Bakery', address: 'Fatehgunj, Vadodara', category: 'Bakery', ownerId: '2',
  },
  {
    id: '11', name: 'Paris Bakery', address: 'New VIP Road, Vadodara', category: 'Bakery', ownerId: '2',
  },
  {
    id: '12', name: 'Starbucks', address: 'Karelibaug, Vadodara', category: 'Bakery', ownerId: 'store_2',
  },
  {
    id: '13', name: 'KFC', address: 'OP Road, Vadodara', category: 'Food', ownerId: '2',
  },
  {
    id: '14', name: 'Burger King', address: 'Taksh Galaxy Mall, Vadodara', category: 'Food', ownerId: 'store_2',
  },
  {
    id: '15', name: 'Pizza Hut', address: 'Akota, Vadodara', category: 'Food', ownerId: 'store_2',
  },
  {
    id: '16', name: 'Dominos', address: 'Vasna Bhayli Road', category: 'Food', ownerId: '2',
  },
];

// Dummy users data for demonstration
const allUsers = [
  { id: '1', name: 'Alice', role: 'user' },
  { id: '2', name: 'Peayush', role: 'Peayush Bansal' },
  { id: '3', name: 'Charlie', role: 'user' },
  { id: '4', name: 'David', role: 'user' },
];

export default function StoreOwnerDashboard() {
  const { user } = useAuth();
  const { ratings } = useRatings();
  
  const [totalStores, setTotalStores] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const ownerStores = allStores.filter(store => store.ownerId === user?.id);
  const ownerStoreIds = ownerStores.map(store => store.id);

  const ownerReviews = ratings.filter(rating => ownerStoreIds.includes(rating.storeId));
  
  const ratedUsers = [...new Set(ownerReviews.map(review => review.userId))]
    .map(userId => allUsers.find(u => u.id === userId));

  useEffect(() => {
    setTotalStores(ownerStores.length);
    setTotalRatings(ownerReviews.length);
    if (ownerReviews.length > 0) {
      const sum = ownerReviews.reduce((acc, r) => acc + r.rating, 0);
      setAverageRating(sum / ownerReviews.length);
    } else {
      setAverageRating(0);
    }
  }, [ownerStores.length, ownerReviews.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">Store Dashboard</h1>
        <p className="mt-4 text-lg text-gray-600">
          Welcome, {user?.name}! Here's an overview of your stores.
        </p>
      </div>

      { }
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
            <Store size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Stores</p>
            <p className="text-2xl font-bold text-gray-900">{totalStores}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
          <div className="p-3 rounded-full bg-orange-100 text-orange-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Ratings</p>
            <p className="text-2xl font-bold text-gray-900">{totalRatings}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600">
            <Star size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Average Rating</p>
            <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
          </div>
        </div>
      </div>

      {}
      <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Users Who Rated My Stores</h2>
        {ratedUsers.length > 0 ? (
          <div className="space-y-4">
            {ratedUsers.map((ratedUser, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="p-2 rounded-full bg-gray-200 text-gray-600">
                  <User size={20} />
                </div>
                <span className="font-semibold text-gray-800">{ratedUser?.name || 'Unknown User'}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No users have rated your stores yet.</p>
        )}
      </div>

      {/* Manage My Stores Section */}
      <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage My Stores</h2>
        {ownerStores.length > 1 ? (
          <div className="space-y-4">
            {ownerStores.map((store) => (
              <div key={store.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <span className="font-semibold text-gray-800">{store.name}</span>
                <div className="flex space-x-2">
                  <Link
                    to={`/stores/${store.id}`}
                    className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                  >
                    <Eye size={20} />
                  </Link>
                  <Link
                    to={`/store/edit/${store.id}`}
                    className="p-2 rounded-full text-gray-500 hover:text-green-600 hover:bg-gray-100 transition-colors"
                  >
                    <Edit size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">You don't have any stores yet.</p>
        )}
      </div>

      {/* Customer Reviews Section */}
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Reviews</h2>
        {ownerReviews.length > 0 ? (
          <div className="space-y-6">
            {ownerReviews.map(review => (
              <div key={review.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-800">
                      {allStores.find(s => s.id === review.storeId)?.name || 'Unknown Store'}
                    </p>
                    <p className="text-sm text-gray-500">by {review.userName}</p>
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
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">You have no reviews on your stores yet.</p>
        )}
      </div>
    </div>
  );
}