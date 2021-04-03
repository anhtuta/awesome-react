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
      password
    };
    axiosClient
      .post('/signin', data)
      .then((res) => {
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
        Toast.error(err);
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
