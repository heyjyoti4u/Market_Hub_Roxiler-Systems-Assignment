import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import Button from '../components/UI/Button';
import { useRatings } from '../contexts/RatingContext';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

interface Rating {
  id: string;
  storeId: string;
  userId: string;
  userName: string;
  rating: number;
  feedback: string;
  date: Date;
}

interface Store {
  id: string;
  name: string;
  address: string;
  image: string;
  category: string;
}

const allStores: Store[] = [
  // Eyeware
  {
    id: '1',
    name: 'Lenskart',
    address: 'Waghodia, Vadodara',
    image: 'https://filipinotimes.net/wp-content/uploads/2022/07/Lenskart-store-1.jpeg',
    category: 'Eyeware',
  },
  {
    id: '2',
    name: 'Titan Eye+',
    address: 'Ajwa Road, Vadodara',
    image: 'https://tse3.mm.bing.net/th/id/OIP.kggVVkrEfylNxaJC1LEF-wHaE8?pid=Api&P=0&h=220',
    category: 'Eyeware',
  },
  {
    id: '3',
    name: 'Specsmakers',
    address: 'Genda Circle, Vadodara',
    image: 'https://tse1.mm.bing.net/th/id/OIP.8357vXVytoopoat0Uy72hAAAAA?pid=Api&P=0&h=220',
    category: 'Eyeware',
  },
  {
    id: '4',
    name: 'Prada Eyeware',
    address: 'Race Course, Vadodara',
    image: 'https://topvisioninstore.com/web/image/333065/Carre%20luxury%20glass%20eyewear%20shelves4.jpg',
    category: 'Eyeware',
  },
  // Fashion
  {
    id: '5',
    name: 'Zudio',
    address: 'Inorbit Mall, Vadodara',
    image: 'https://www.morungexpress.com/uploads/2022/03/53784449_1648046246_4.JPG',
    category: 'Fashion',
  },
  {
    id: '6',
    name: 'Westside',
    address: 'Ajwa Road, Vadodara',
    image: 'https://www.signnews.in/wp-content/uploads/2018/05/10621134241508754343.jpg',
    category: 'Fashion',
  },
  {
    id: '7',
    name: 'Rare Rabbit',
    address: 'VR Mall, Vadodara',
    image: 'http://dfupublications.com/images/2022/10/26/Rare%20Rabbit%20opens%20Mumbai%20store_large.jpg',
    category: 'Fashion',
  },
  {
    id: '8',
    name: 'Gucci',
    address: 'Alkapuri, Vadodara',
    image: 'https://retailinsider.b-cdn.net/wp-content/uploads/2021/04/GUCCI_Edmonton_Store-18-scaled.jpg',
    category: 'Fashion',
  },
  // Bakery
  {
    id: '9',
    name: 'Mio Amore',
    address: 'Agota Bridge Road, Vadodara',
    image: 'https://retailinsider.b-cdn.net/wp-content/uploads/2021/04/GUCCI_Edmonton_Store-18-scaled.jpg',
    category: 'Bakery',
  },
  {
    id: '10',
    name: 'Atul Bakery',
    address: 'Fatehgunj, Vadodara',
    image: 'https://tse4.mm.bing.net/th/id/OIP.CdhAf8HwJwI4-q2-EDfU5AHaEK?pid=Api&P=0&h=220',
    category: 'Bakery',
  },
  {
    id: '11',
    name: 'Paris Bakery',
    address: 'New VIP Road, Vadodara',
    image: 'https://tse3.mm.bing.net/th/id/OIP.r126cJRul8CMgeAJpCCj0gHaE9?pid=Api&P=0&h=220',
    category: 'Bakery',
  },
  {
    id: '12',
    name: 'starbucks',
    address: 'Karelibaug, Vadodara',
    image: 'https://3.bp.blogspot.com/-LSfTulOxU4I/VnPdrqnMiCI/AAAAAAAA6tI/QarHkMu-x7g/s1600/Starbucks-Hong-Kong-03.JPG',
    category: 'Bakery',
  },
  // Food
  {
    id: '13',
    name: 'KFC',
    address: 'OP Road, Vadodara',
    image: 'https://tse2.mm.bing.net/th/id/OIP.PbxNAXFeqVO_YxHavxWI9QHaE8?pid=Api&P=0&h=220',
    category: 'Food',
  },
  {
    id: '14',
    name: 'Burger King',
    address: 'Taksh Galaxy Mall, Vadodara',
    image: 'https://assets.telegraphindia.com/telegraph/2020/Dec/1607983451_shutterstock_1592027866.jpg',
    category: 'Food',
  },
  {
    id: '15',
    name: 'Pizza Hut',
    address: 'Akota, Vadodara',
    image: 'https://www.3blmedia.com/sites/default/files/styles/carousel_2x/public/images/Pizza-Hut_Yum-Brands_110123.jpeg',
    category: 'Food',
  },
  {
    id: '16',
    name: 'Dominos',
    address: 'Vasna Bhayli Road, Vadodara',
    image: 'https://www.allinharidwar.com/wp-content/uploads/2015/08/dominos-pizza.jpg',
    category: 'Food',
  },
];

export default function StoreDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addRating, updateRating, getRatingsForStore, fetchRatings } = useRatings();
  const { addNotification } = useNotifications();

  const store = allStores.find((s) => s.id === id);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const [userRating, setUserRating] = useState<Rating | undefined>(undefined);

  useEffect(() => {
    // Refresh ratings when a user changes
    fetchRatings();
  }, [fetchRatings]);

  useEffect(() => {
    if (store && user) {
      const existingRating = getRatingsForStore(store.id).find(r => r.userId === user.id);
      if (existingRating) {
        setRating(existingRating.rating);
        setFeedback(existingRating.feedback);
        setUserRating(existingRating);
      }
    }
  }, [store, user, getRatingsForStore]);

  if (!store) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Store not found</h2>
      </div>
    );
  }

  const allStoreRatings: Rating[] = getRatingsForStore(store.id);

  const overallRating = allStoreRatings.length > 0
    ? (allStoreRatings.reduce((sum, r) => sum + r.rating, 0) / allStoreRatings.length).toFixed(1)
    : 'N/A';

  const handleSubmit = async () => {
    if (!user) {
      addNotification({
        type: 'info',
        title: 'Login Required',
        message: 'Please log in to submit a rating.',
      });
      navigate('/login');
      return;
    }

    if (rating === 0) {
      addNotification({
        type: 'error',
        title: 'Rating Required',
        message: 'Please select a star rating before submitting.',
      });
      return;
    }

    const newRating = {
      storeId: store.id,
      rating,
      feedback,
      userName: user.name,
      userId: user.id,
      date: new Date().toISOString(),
    };

    if (userRating) {
      // Update the rating
      await updateRating(newRating);
    } else {
      // Add a new rating
      await addRating(newRating);
    }
    
    // Reset form fields
    setRating(0);
    setFeedback('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Store Image */}
        <div>
          <img
            src={store.image}
            alt={store.name}
            className="rounded-xl shadow-lg w-full h-96 object-cover"
          />
        </div>

        {/* Store Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{store.name}</h1>
          <p className="text-gray-700">{store.address}</p>

          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-blue-600">
              Overall Rating: {overallRating} / 5
            </span>
          </div>

          {/* User's Submitted Rating */}
          {userRating && (
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-gray-800">Your Rating:</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < userRating.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Rating Submission */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-3">
              {userRating ? 'Update Your Rating' : 'Rate this store'}
            </h3>
            <div className="flex items-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer transition-colors ${
                    star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback..."
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            <div className="mt-4">
              <Button onClick={handleSubmit} disabled={rating === 0}>
                {userRating ? 'Update Rating' : 'Submit Rating'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        {allStoreRatings.length > 0 ? (
          <div className="space-y-6">
            {allStoreRatings.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="ml-4 font-semibold text-gray-800">{review.userName}</p>
                </div>
                <p className="text-gray-600">{review.feedback}</p>
                <p className="text-xs text-gray-400 mt-2">{new Date(review.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to review this store!</p>
        )}
      </div>
    </div>
  );
}