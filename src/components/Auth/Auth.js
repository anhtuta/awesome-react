import { ACCESS_TOKEN } from '../../constants/Constants';
import axiosClient from '../../service/axiosClient';
import Toast from '../Toast/Toast';
import { ROLE_TABLE } from '../../constants/Constants';

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

  /**
   * Check xem mảng roles có tồn tại role nào có quyền truy cập path hay ko
   * @param {string[]} roles - Array of role
   * @param {string} path - URL
   */
  rolesHasPermission = (roles, path) => {
    if (!ROLE_TABLE[path]) return true;
    for (const role of roles) {
      if (ROLE_TABLE[path].includes(role)) {
        // console.log(`User can access protected path = ${path}`);
        return true;
      }
    }
    // Dùng forEach: bất đồng bộ nên ko được nhé!
    // Nó sẽ return false trước khi chạy vào trong forEach
    // roles.forEach(role => {
    //   if (ROLE_TABLE[path].includes(role)) return true;
    // });
    return false;
  };
}

export let auth = new Auth();
