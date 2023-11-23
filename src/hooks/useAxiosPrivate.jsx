import { axiosPrivate } from '../api/axios';
import { useEffect } from 'react';
import useAuth from './useAuth';

const useAxiosPrivate = () => {
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // 컴포넌트가 언마운트되거나 업데이트되기 전에 실행되는 클린업 함수
    return () => {
      // 요청 인터셉터를 제거하여 메모리 누수 방지
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [auth]);

  return axiosPrivate;
};

export default useAxiosPrivate;
