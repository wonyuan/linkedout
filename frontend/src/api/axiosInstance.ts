import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  headers: { "ngrok-skip-browser-warning": "true" }
});

export default axiosInstance;