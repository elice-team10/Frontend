import axios from 'axios';
const BASE_URL = 'http://kdt-sw-6-team10.elicecoding.com/api';
// const BASE_URL_LOCAL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: BASE_URL,
  // baseURL: BASE_URL_LOCAL,
});

export default api;

export const axiosPrivate = () => {
  try {
    const auth = window.localStorage.getItem('auth');
    const accessToken = JSON.parse(auth).accessToken;
    // 커링: 함수를 리턴해주는데, 함수를 동적으로 세팅 할 수 있는 기술
    return axios.create({
      baseURL: BASE_URL,
      // baseURL: BASE_URL_LOCAL,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
  } catch (err) {
    console.error(err);
    window.location.href = '/';
  }
};
