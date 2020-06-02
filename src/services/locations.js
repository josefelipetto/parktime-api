import axios from 'axios';

const API_URL = process.env.REACT_APP_API;
const api = axios.create({
  baseURL: API_URL
});

const getToken = () => {

  try {
    return JSON.parse((localStorage.getItem('pktime') || {})).token
  } catch (error) {
    return null
  }
}

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

export const postBooking = (id,data) => {
  return api.post(`/sectors/${id}/book`,data, { 
    headers: {
      'Content-Type': 'application/json'
    }
  })
};