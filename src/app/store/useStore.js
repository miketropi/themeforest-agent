import { create } from 'zustand';
import { produce } from 'immer';

// Function to get user data from cookie
const getUserFromCookie = () => {
  if (typeof document === 'undefined') return null; // Check if running on server
  
  const userCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('user='));
    
  if (!userCookie) return null;
  
  try {
    const userJson = decodeURIComponent(userCookie.split('=')[1]);
    return JSON.parse(userJson);
  } catch (error) {
    console.error('Error parsing user cookie:', error);
    return null;
  }
};

// Create a store with Zustand and Immer integration
const useStore = create((set) => ({
  // Initial state
  user: getUserFromCookie(),
  isAuthenticated: !!getUserFromCookie(),
  theme: 'light',
  loading: false,
  error: null,
  
  // Actions
  setUser: (user) => 
    set(produce((state) => {
      state.user = user;
      state.isAuthenticated = !!user;
    })),
    
  logout: () => 
    set(produce((state) => {
      state.user = null;
      state.isAuthenticated = false;
    })),
    
  setTheme: (theme) => 
    set(produce((state) => {
      state.theme = theme;
    })),
    
  setLoading: (loading) => 
    set(produce((state) => {
      state.loading = loading;
    })),
    
  setError: (error) => 
    set(produce((state) => {
      state.error = error;
    })),
    
  clearError: () => 
    set(produce((state) => {
      state.error = null;
    })),
}));

export default useStore;