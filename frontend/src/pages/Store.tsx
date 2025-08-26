import { Link } from 'react-router-dom';

const allStores = [
  // Eyeware
  {
    id: '1',
    name: 'Lenskart',
    address: 'Waghodia, Vadodara',
    image: 'https://tenereteam.s3.us-west-1.amazonaws.com/lenskartcom-logo-updated.png',
    category: 'Eyeware',
  },
  {
    id: '2',
    name: 'Titan Eye+',
    address: 'Ajwa Road, Vadodara',
    image: 'https://is5-ssl.mzstatic.com/image/thumb/Purple122/v4/80/44/4e/80444e7e-9e34-3cde-c806-6ce8e983913b/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/600x600bb.jpg',
    category: 'Eyeware',
  },
  {
    id: '3',
    name: 'Specky',
    address: 'Genda Circle, Vadodara',
    image: 'https://logodix.com/logo/1332876.jpg',
    category: 'Eyeware',
  },
  {
    id: '4',
    name: 'Prada',
    address: 'Race Course, Vadodara',
    image: 'https://www.ezcontacts.com/blog/wp-content/uploads/2022/11/Prada-eyewear.jpeg',
    category: 'Eyeware',
  },
  // Fashion
  {
    id: '5',
    name: 'Zudio',
    address: 'Inorbit Mall, Vadodara',
    image: 'https://www.vrbengaluru.com/images/stores/zudio-logo.jpg',
    category: 'Fashion',
  },
  {
    id: '6',
    name: 'Westside',
    address: 'Ajwa Road, Vadodara',
    image: 'https://www.frankart.global/wp-content/uploads/2020/04/Westside-logo.jpg',
    category: 'Fashion',
  },
  {
    id: '7',
    name: 'Rare Rabbit',
    address: 'VR Mall, Vadodara',
    image: 'https://res.cloudinary.com/zenbusiness/image/upload/v1670445040/logaster/logaster-2020-08-h-rare-rabbit-logo-13.png',
    category: 'Fashion',
  },
  {
    id: '8',
    name: 'Gucci',
    address: 'Alkapuri, Vadodara',
    image: 'http://lofrev.net/wp-content/photos/2017/04/gucci_logo.jpg',
    category: 'Fashion',
  },
  // Bakery
  {
    id: '9',
    name: 'Mio Amore',
    address: 'Agota Bridge Road, Vadodara',
    image: 'https://tse4.mm.bing.net/th/id/OIP.wVRGzkzF8YG7jOcCwljXdQHaHa?pid=Api&P=0&h=220',
    category: 'Bakery',
  },
  {
    id: '10',
    name: 'Atul Bakery',
    address: 'Fatehgunj, Vadodara',
    image: 'https://tse3.mm.bing.net/th/id/OIP.Q-42NKx4wfkTV7DocvPgBAAAAA?pid=Api&P=0&h=220',
    category: 'Bakery',
  },
  {
    id: '11',
    name: 'Paris Bakery',
    address: 'New VIP Road, Vadodara',
    image: 'https://www.shutterstock.com/create/assets/asset-gateway/template/previews/11463-0.png?width=1000',
    category: 'Bakery',
  },
  {
    id: '12',
    name: 'Starbucks',
    address: 'Karelibaug, Vadodara',
    image: 'http://chq.ie/wp-content/uploads/2014/03/Starbucks1.jpg',
    category: 'Bakery',
  },
  // Food
  {
    id: '13',
    name: 'KFC',
    address: 'OP Road, Vadodara',
    image: 'https://tse3.mm.bing.net/th/id/OIP.fU1f4Q6Ctp1XJvSGxh7bZQHaEK?pid=Api&P=0&h=220',
    category: 'Food',
  },
  {
    id: '14',
    name: 'Burger King',
    address: 'Taksh Galaxy Mall, Vadodara',
    image: 'https://www.eatthis.com/wp-content/uploads/sites/4/2023/06/Burger-King-.jpg?quality=82&strip=1',
    category: 'Food',
  },
  {
    id: '15',
    name: 'Pizza Hut',
    address: 'Akota, Vadodara',
    image: 'https://www.eatthis.com/wp-content/uploads/sites/4/2023/05/Pizza-Hut.jpg?quality=82&strip=1&w=1400',
    category: 'Food',
  },
  {
    id: '16',
    name: 'Dominos',
    address: 'Vasna Bhayli Road, Vadodara',
    image: 'https://tse2.mm.bing.net/th/id/OIP.rybB4K9T0s4KOQ7KX6O1VgHaEe?pid=Api&P=0&h=220',
    category: 'Food',
  },
];

const storeCategories = {
  Eyeware: allStores.filter(s => s.category === 'Eyeware'),
  Fashion: allStores.filter(s => s.category === 'Fashion'),
  Bakery: allStores.filter(s => s.category === 'Bakery'),
  Food: allStores.filter(s => s.category === 'Food'),
};

export default function Stores() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Explore Our Stores
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Find and rate the best stores in your city.
        </p>
      </div>

      {Object.entries(storeCategories).map(([category, stores]) => (
        <section key={category} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-blue-500 inline-block">
            {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {stores.map((store) => (
              <Link
                to={`/stores/${store.id}`}
                key={store.id}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 flex flex-col"
              >
                <div className="relative">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {store.name}
                  </h3>
                  <p className="text-sm text-gray-500">{store.address}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}