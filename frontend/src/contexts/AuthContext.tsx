import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'store_owner' | 'customer';
  avatar?: string;
  storeId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'store_owner' | 'customer';
  storeName?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const demoUsers: User[] = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@markethub.com',
      role: 'admin',
      avatar: 'https://avatars.githubusercontent.com/u/180332511?v=4'
    },
    {
      id: 'store_owner_1',
      name: 'Store Owner 1',
      email: 'store1@markethub.com',
      role: 'store_owner',
      storeId: 'store_1',
      avatar: 'https://static.toiimg.com/photo/108493341.cms'
    },
    {
      id: 'store_owner_2',
      name: 'Store Owner 2',
      email: 'store2@markethub.com',
      role: 'store_owner',
      storeId: 'store_2',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '3',
      name: 'John Customer',
      email: 'customer@markethub.com',
      role: 'customer',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('markethub_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
       
      setUser(demoUsers[0]);  
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = demoUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('markethub_user', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
    setLoading(false);
  };

  const register = async (userData: RegisterData) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      storeId: userData.role === 'store_owner' ? `store_${Date.now()}` : undefined
    };
    
    setUser(newUser);
    localStorage.setItem('markethub_user', JSON.stringify(newUser));
    
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('markethub_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}