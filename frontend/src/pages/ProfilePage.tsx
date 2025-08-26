import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Please log in to view this page.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center space-x-6">
          <img
            src={user.avatar || 'https://avatars.githubusercontent.com/u/180332511?v=4'}
            alt="User avatar"
            className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-lg text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-lg font-medium text-gray-800">{user.role}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">User ID</p>
            <p className="text-lg font-medium text-gray-800">{user.id}</p>
          </div>
          {user.storeId && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Store ID</p>
              <p className="text-lg font-medium text-gray-800">{user.storeId}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}