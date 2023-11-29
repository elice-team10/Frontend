import api from '../api/axios';
import useAuth from './useAuth';

export default function useLogout() {
  const { clearAuth } = useAuth();

  const logout = async () => {
    try {
      clearAuth();
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
}
