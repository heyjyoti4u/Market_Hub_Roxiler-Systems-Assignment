import { useAuth } from '../contexts/AuthContext';
import { User, Mail } from 'lucide-react';
import Button from '../components/UI/Button';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800">You are not logged in.</h2>
        <p className="mt-4 text-gray-600">Please log in to view your profile.</p>
        <Link to="/login" className="mt-6 inline-block">
          <Button>Go to Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-teal-500 rounded-full flex items-center justify-center text-white">
            <User size={64} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-lg text-gray-600 capitalize">{user.role.replace('_', ' ')}</p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center space-x-3 text-gray-700">
            <Mail className="w-5 h-5 text-blue-500" />
            <span className="font-medium">Email:</span>
            <span>{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}