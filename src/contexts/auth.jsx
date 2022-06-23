import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, createSession } from 'services';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user');

    if (recoveredUser) {
      setUser(JSON.stringify(recoveredUser));
    }

    setLoading(false);
  }, []);

  const login = async (userName, password) => {
    const response = await createSession(userName, password);

    const token = response.data.token;

    localStorage.setItem('user', token);

    api.defaults.headers.Authorization = `Bearer ${token}`;

    setUser(token);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('user');
    api.defaults.headers.Authorization = null;
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
