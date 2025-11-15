import { createContext, useContext, useEffect, useState } from 'react';
import api from '../utils/api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingMessage, setPendingMessage] = useState('');

  const fetchUser = async () => {
    try {
      const { data } = await api.get('/auth/me');
      setUser(data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    setPendingMessage('');
    const { data } = await api.post('/auth/login', credentials);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    setUser(data.user);
    return data.user;
  };

  const register = async (payload) => {
    setPendingMessage('');
    const { data } = await api.post('/auth/register', payload);
    setPendingMessage(data.message);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser: fetchUser,
        pendingMessage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
