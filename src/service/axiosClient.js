import axios from 'axios';
import queryString from 'query-string';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN } from '../constants/Constants';
import { auth } from '../components/Auth/Auth';

const cleanParam = (obj) => {
  Object.keys(obj).forEach((k) => {
    if (obj[k] === null || obj[k] === undefined) {
      delete obj[k];
    }
  });
  return obj;
};

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_HOST_API,
  headers: {
    'content-type': 'application/json',
    Pragma: 'no-cache',
    Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN)}`
  },
  paramsSerializer: (params) => queryString.stringify(cleanParam(params)),
  withCredentials: true
});

axiosClient.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response && error.response.status) {
      if (error.response.status === 401) {
        auth.clearSession();
      }
      //... handle other statuses
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
