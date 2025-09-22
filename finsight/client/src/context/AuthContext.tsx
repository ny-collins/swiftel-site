// In finsight/client/src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

interface AuthContextType {
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (credentials: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/users/login', credentials);
      setToken(response.data.token);
      toast.success('Successfully logged in!');
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err; // Re-throw error to be caught in the component
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    setLoading(true);
    setError(null);
    try {
      await api.post('/users/register', userData);
      toast.success('Registration successful! Logging you in...');
      await login({ email: userData.email, password: userData.password });
    } catch (err: any) {
      const errorMessage = err.response?.data?.errors?.[0]?.msg || 'Registration failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    toast.success('Logged out.');
  };

  return (
    <AuthContext.Provider value={{ token, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
