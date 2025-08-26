import { Link } from 'react-router-dom';
import { ArrowRight, Users, Shield, Truck } from 'lucide-react';
import Button from '../components/UI/Button';

const featuredStores = [
  {
    id: '1',
    name: 'Lenskart',
    image: 'https://tenereteam.s3.us-west-1.amazonaws.com/lenskartcom-logo-updated.png',
    address: 'Wagodia, Vadodara',
  },
  {
    id: '6',
    name: 'Westside',
    image: 'https://www.frankart.global/wp-content/uploads/2020/04/Westside-logo.jpg',
    address: 'Ajwa Road, Vadodara',
  },
  {
    id: '9',
    name: 'Mio Amore',
    image: 'https://tse4.mm.bing.net/th/id/OIP.wVRGzkzF8YG7jOcCwljXdQHaHa?pid=Api&P=0&h=220',
    address: 'Agota Bridge Road, Vadodara',
  },
  {
    id: '14',
    name: 'Burger King',
    image: 'https://www.eatthis.com/wp-content/uploads/sites/4/2023/06/Burger-King-.jpg?quality=82&strip=1',
    address: 'Taksh Galaxy Mall, Vadodara',
  },
];

const features = [
  {
    icon: Shield,
    title: 'Safe & Secure Ratings',
    description: 'All reviews are verified to ensure genuine and unbiased feedback for every store.',
  },
  {
    icon: Users,
    title: 'Community-Driven Trust',
    description: 'Leverage the power of our community ratings to make informed decisions before you shop.',
  },
  {
    icon: Truck,
    title: 'Detailed Store Insights',
    description: 'Get in-depth insights into a store’s reputation, service quality, and customer satisfaction.',
  },
];

export default function Home() {
 
  
  return (
    <div className="space-y-16">
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Rate Stores,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  Not Just Products.
                </span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Find and rate verified sellers to help others shop confidently.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="group">
                  <Link to="/stores">
                    View Stores
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Shopping"
                  className="rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                />
                <img
                  src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Rate"
                  className="rounded-lg shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 mt-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      { }
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Purpose</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform is designed to provide genuine ratings for stores. We believe that a store's reputation is just as important as the products it sells. By allowing users to rate their shopping experience, we help build a community of trust and transparency, ensuring every customer can make an informed decision.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="featured-stores" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Stores</h2>
            <p className="text-lg text-gray-600">Top-rated stores loved by our community</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredStores.map((store) => (
              <Link
                to={`/stores/${store.id}`}
                key={store.id}
                className="group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {store.name}
                  </h3>
                  <p className="text-sm text-gray-500">{store.address}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/stores">
                View All Stores
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}