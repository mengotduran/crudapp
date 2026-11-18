import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../api/authApi';
import { tokenStorage } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(tokenStorage.get()));

  useEffect(() => {
    if (!tokenStorage.get()) return;
    authApi
      .me()
      .then(({ user }) => setUser(user))
      .catch(() => tokenStorage.clear())
      .finally(() => setLoading(false));
  }, []);

  const handleSession = ({ user, token }) => {
    tokenStorage.set(token);
    setUser(user);
  };

  const login = useCallback(async (credentials) => {
    handleSession(await authApi.login(credentials));
  }, []);

  const register = useCallback(async (details) => {
    handleSession(await authApi.register(details));
  }, []);

  const logout = useCallback(() => {
    tokenStorage.clear();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
