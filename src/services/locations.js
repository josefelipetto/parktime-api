import axios from 'axios';
import { getToken } from '../utils/utils';

const API_URL = process.env.REACT_APP_API;
const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use(
  config => {
      // Don't IE request cache

      config.headers['Pragma'] = 'no-cache';
      config.headers['x-access-token'] = getToken();
      config.headers['Access-Control-Allow-Origin'] = '*';

      return config;
  },
  error => Promise.reject(error),
);

export default api;


export const getSectors = (id) => {
  return api.get(`/sectors${id ? `/${id}` : ''}`)          
};

export const getReservations = () => {
  return api.get(`/reservations`)
};

export const postBooking = (id,data) => {
  return api.post(`/reservations`,{ sector: id, time: new Date().toISOString() }, { 
    headers: {
      'Content-Type': 'application/json'
    }
  })
};