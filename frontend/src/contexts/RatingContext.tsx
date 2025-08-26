import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';

export interface Rating {
  id: string;
  storeId: string;
  userId: string;
  userName: string;
  rating: number;
  feedback: string;
  date: string;
}

interface RatingContextType {
  ratings: Rating[];
  addRating: (rating: Omit<Rating, 'id' | 'date'>) => Promise<void>;
  updateRating: (rating: Omit<Rating, 'date'>) => Promise<void>;
  getRatingsForStore: (storeId: string) => Rating[];
  fetchRatings: () => Promise<void>;
}

const RatingContext = createContext<RatingContextType | undefined>(undefined);

// Dummy ratings data for mocking the backend
const dummyRatings: Rating[] = [
  {
    id: 'rating-1',
    storeId: '1',
    userId: '3',
    userName: 'John Customer',
    rating: 5,
    feedback: 'Great service and quality products!',
    date: new Date().toISOString(),
  },
  {
    id: 'rating-2',
    storeId: '13',
    userId: '3',
    userName: 'John Customer',
    rating: 4,
    feedback: 'Tasted great and the staff was friendly.',
    date: new Date().toISOString(),
  },
];

export function RatingProvider({ children }: { children: React.ReactNode }) {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  // Mock fetch function to use local data
  const fetchRatings = useCallback(async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setRatings(dummyRatings);
  }, []);

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  const addRating = async (newRating: Omit<Rating, 'id' | 'date'>) => {
    if (!user) return;
    const newRatingWithId = {
      ...newRating,
      id: `rating-${Date.now()}`,
      date: new Date().toISOString(),
    };
    setRatings(prev => [...prev, newRatingWithId]);
    addNotification({ type: 'success', title: 'Rating Submitted!', message: 'Your rating has been submitted locally.' });
  };

  const updateRating = async (updatedRating: Omit<Rating, 'date'>) => {
    if (!user) return;
    setRatings(prev => prev.map(r => r.id === updatedRating.id ? updatedRating : r));
    addNotification({ type: 'success', title: 'Rating Updated!', message: 'Your rating has been updated locally.' });
  };

  const getRatingsForStore = (storeId: string) => {
    return ratings.filter(rating => rating.storeId === storeId);
  };

  return (
    <RatingContext.Provider value={{
      ratings,
      addRating,
      updateRating,
      getRatingsForStore,
      fetchRatings
    }}>
      {children}
    </RatingContext.Provider>
  );
}

export function useRatings() {
  const context = useContext(RatingContext);
  if (context === undefined) {
    throw new Error('useRatings must be used within a RatingProvider');
  }
  return context;
}