import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

interface CustomHeaders {
  'x-token': string | null;
}
const { VITE_API_URL } = getEnvVariables();
const authApi = axios.create({
  baseURL: VITE_API_URL
});

authApi.interceptors.request.use((config: any) => {
  const customHeaders: CustomHeaders = {
    'x-token': localStorage.getItem('token')
  };
  config.headers = {
    ...config.headers,
    ...customHeaders
  };

  return config;
});

export default authApi;
