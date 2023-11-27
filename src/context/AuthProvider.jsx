import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const authString = localStorage.getItem('auth');

    if (authString) {
      const auth = JSON.parse(authString);
      setAuth(auth);
    }
  }, []);

  // 로그인 정보 저장
  const saveAuth = (authData) => {
    setAuth(authData);
    localStorage.setItem('auth', JSON.stringify(authData));
  };

  const updateAuth = (authData) => {
    setAuth((prev) => ({ ...prev, authData }));
    localStorage.setItem('auth', JSON.stringify({ ...auth, authData }));
  };

  // 로그아웃 할 때, 로그인 정보 삭제
  const clearAuth = () => {
    setAuth(null);
    localStorage.removeItem('auth');

    // 헤더에서 토큰 삭제
    delete axios.defaults.headers.common['Authorization'] ||
      axios.defaults.headers;
  };

  return (
    <AuthContext.Provider value={{ auth, saveAuth, updateAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
