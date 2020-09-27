import Cookies from 'js-cookie';
import { ACCESS_TOKEN } from '../../constants/Constants';
import axiosClient from '../../service/axiosClient';

class Auth {
  constructor() {
    this.userInfo = null;
  }

  isAuthenticated = () => {
    const access_token = Cookies.get(ACCESS_TOKEN);
    return !!access_token;
    // return true;
  };

  login = ({ username, password }) => {
    const data = {
      username,
      password,
      grant_type: 'password'
    };
    return axiosClient.post('/oauth/token', data, {
      headers: {
        Authorization: 'Basic Y2xpZW50SWQ6c2VjcmV0QHR1emFrdQ'
      }
    });
  };

  getMe = () => {
    return axiosClient.get('/api/user/me');
  };

  startSession = () => {};

  clearSession = () => {};
}

export let auth = new Auth();
