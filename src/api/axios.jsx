import axios from 'axios';
const BASE_URL = 'http://kdt-sw-6-team10.elicecoding.com/api';
// const BASE_URL_TEST = 'http://localhost:3000/api';

export default axios.create({
  baseURL: BASE_URL,
});
