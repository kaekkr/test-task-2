import axios from 'axios';

const api = axios.create({
  baseURL: 'http://109.73.206.144:6969/api',
});

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchData = async (endpoint: string, params: any = {}) => {
  params.key = API_KEY;
  const response = await api.get(`/${endpoint}`, { params });
  return response.data;
};