import axios from 'axios';
import queryString from 'query-string';
import { ACCESS_TOKEN } from '../constants/Constants';
import { auth } from '../components/Auth/Auth';

// const cleanParam = (obj) => {
//   Object.keys(obj).forEach((k) => {
//     if (obj[k] === null || obj[k] === undefined) {
//       delete obj[k];
//     }
//   });
//   return obj;
// };

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_HOST_API,
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    Pragma: 'no-cache'
  },
  // paramsSerializer: (params) => queryString.stringify(cleanParam(params)),
  withCredentials: true
});

axiosClient.interceptors.request.use(
  async (config) => {
    config.data = queryString.stringify(config.data);
    if (!config.headers.Authorization) {
      config.headers.Authorization = localStorage.getItem(ACCESS_TOKEN)
        ? `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        : '';
    }
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
    if (error.response && error.response.status) {
      if (error.response.status === 401) {
        auth.redirectToLoginPage();
      }
      //... handle other statuses
      return Promise.reject(error.response);
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosClient;
