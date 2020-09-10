import Cookies from 'js-cookie';
import { ACCESS_TOKEN } from '../../constants/Constants';

class Auth {
  constructor() {
    this.authenticated = false;
    this.userInfo = null;
  }

  isAuthenticated = () => {
    const access_token = Cookies.get(ACCESS_TOKEN);
    return access_token ? true : false;
  };

  login = (data) => {};

  startSession = () => {};

  clearSession = () => {};
}

export let auth = new Auth();
