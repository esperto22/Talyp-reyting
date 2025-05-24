import axios, { AxiosInstance} from 'axios';

export const baseURL = "http://192.168.55.110:8000"
// Create an Axios instance with custom config
const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL+"/api/",
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance