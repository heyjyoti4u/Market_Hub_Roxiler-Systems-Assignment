import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { RatingProvider } from './contexts/RatingContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Stores from './pages/Store';
import StoreDetail from './pages/StoreDetail';
import ProfilePage from './pages/ProfilePage';
import { useAuth } from './contexts/AuthContext';

// Admin-specific pages
import AdminDashboard from './pages/AdminDashboard';
import AdminEditStore from './pages/Admin/EditStore';
import AdminViewStore from './pages/Admin/ViewStore';
import AdminStoreManagement from './pages/Admin/StoreManagement';
import AdminUserManagement from './pages/Admin/UserManagement';

// Store Owner specific pages
import StoreOwnerDashboard from './pages/StoreOwnerDashboard';
import StoreOwnerEditStore from './pages/Store/EditStore';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Root path par admin ko sidha dashboard pe redirect kare */}
      {user?.role === 'admin' && (
        <Route path="/" element={<Navigate to="/dashboard" />} />
      )}
      
      {/* Baaki sabhi routes Layout component ke andar */}
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="stores" element={<Stores />} />
        <Route path="stores/:id" element={<StoreDetail />} />
        <Route path="login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

        {/* Protected Dashboard Route */}
        <Route path="dashboard" element={user ? (
          user.role === 'admin' ? <AdminDashboard /> : 
          user.role === 'store_owner' ? <StoreOwnerDashboard /> : 
          <Navigate to="/" /> // <-- Yahan badlav kiya gaya hai
        ) : <Navigate to="/login" />} />
        
        {/* Protected Profile Route */}
        <Route path="profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
        
        {/* Admin-specific routes */}
        <Route path="admin/stores" element={user?.role === 'admin' ? <AdminStoreManagement /> : <Navigate to="/login" />} />
        <Route path="admin/users" element={user?.role === 'admin' ? <AdminUserManagement /> : <Navigate to="/login" />} />
        <Route path="admin/stores/:id/view" element={user?.role === 'admin' ? <AdminViewStore /> : <Navigate to="/login" />} />
        <Route path="admin/stores/:id/edit" element={user?.role === 'admin' ? <AdminEditStore /> : <Navigate to="/login" />} />
        
        {/* Store Owner specific routes */}
        <Route path="store/edit/:id" element={user?.role === 'store_owner' ? <StoreOwnerEditStore /> : <Navigate to="/login" />} />
      </Route>
      
      {/* Fallback for invalid URLs */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <RatingProvider>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
              <AppRoutes />
            </div>
          </RatingProvider>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;