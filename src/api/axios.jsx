import axios from 'axios';
const BASE_URL = 'http://kdt-sw-6-team10.elicecoding.com/api';
// const BASE_URL_LOCAL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: BASE_URL,
  // baseURL: BASE_URL_LOCAL,
});

export default api;

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  // baseURL: BASE_URL_LOCAL,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});
