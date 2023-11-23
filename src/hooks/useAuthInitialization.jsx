import { useEffect } from 'react';
import useAuth from './useAuth';

const useAuthInitialization = () => {
  const { auth, saveAuth } = useAuth();

  useEffect(() => {
    const storedAuthString = localStorage.getItem('auth');

    if (storedAuthString && !auth) {
      const storedAuth = JSON.parse(storedAuthString);
      saveAuth(storedAuth);
    }
  }, [auth, saveAuth]);
};

export default useAuthInitialization;
