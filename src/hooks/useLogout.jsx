import api from '../api/axios';
import useAuth from './useAuth';

export default function useLogout() {
  const { clearAuth } = useAuth();

  const logout = async () => {
    try {
      // const response = await api.delete('/user/logout', {
      //   withCredentials: true,
      // });

      clearAuth();
      alert('로그아웃되었습니다.');
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
}
