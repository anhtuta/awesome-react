import { ACCESS_TOKEN } from '../../constants/Constants';
import axiosClient from '../../service/axiosClient';
import Toast from '../Toast/Toast';

class Auth {
  constructor() {
    this.userInfo = null;
  }

  isAuthenticated = () => {
    const access_token = localStorage.getItem(ACCESS_TOKEN);
    return !!access_token;
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
        localStorage.setItem(ACCESS_TOKEN, res[ACCESS_TOKEN]);
        successCallback();
      })
      .catch((err) => {
        failCallback(err.data ? err.data : err);
      });
  };

  logout = () => {
    axiosClient
      .post('/signout')
      .then((res) => {
        localStorage.removeItem(ACCESS_TOKEN);
        window.location = '/';
      })
      .catch((err) => {
        console.log(err);
        Toast.error(err.data && err.data.message ? err.data.message : err);
      });
  };

  getMe = () => {
    return axiosClient.get('/api/user/me');
  };

  redirectToLoginPage = () => {
    Toast.info('You need to login first!');
    localStorage.removeItem(ACCESS_TOKEN);
    window.location.hash = '/login';
  };
}

export let auth = new Auth();
