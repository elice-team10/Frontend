import api from '../api/axios';
import useAuth from './useAuth';

export default function useLogout() {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});

    try {
      const response = await api('/logout', {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
}
