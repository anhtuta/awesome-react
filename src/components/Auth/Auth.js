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

  login = ({ username, password }, successCallback, failCallback) => {
    const data = {
      username,
      password,
      grant_type: 'password'
    };
    axiosClient
      .post('/oauth/token', data, {
        headers: {
          Authorization: 'Basic Y2xpZW50SWQ6c2VjcmV0QHR1emFrdQ'
        }
      })
      .then((res) => {
        const expiredDate = new Date(new Date().getTime() + res.expires_in * 1000);
        Cookies.set(ACCESS_TOKEN, res[ACCESS_TOKEN], { expires: expiredDate });
        successCallback();
      })
      .catch((err) => {
        failCallback(err);
      });
  };

  logout = () => {
    Cookies.remove(ACCESS_TOKEN);
    window.location = '/';
  };

  getMe = () => {
    return axiosClient.get('/api/user/me');
  };
}

export let auth = new Auth();
