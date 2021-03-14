import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MENU_ITEMS, ROLE_TABLE } from '../../constants/Constants';
import { auth } from '../Auth/Auth';
import './Nav.scss';

class Nav extends Component {
  handleLogout = () => {
    auth.logout();
  };

  getActiveMenuItems = (roleArray, menuItems) => {
    menuItems.forEach((item, index) => {
      if (item.subItems) {
        this.getActiveMenuItems(roleArray, item.subItems);
      } else {
        if (!this.rolesHasPermission(roleArray, item.path)) {
          // ĐỪNG dùng splice, bởi vì JS bất đồng bộ nên sẽ bị lỗi thỉnh thoảng bị miss menu item
          // menuItems.splice(index, 1);
          item.enabled = false;
        }
      }
    });
  };

  // Những URL nào ko có trong này tức là public, role nào cũng vào được
  rolesHasPermission = (roles, path) => {
    if (!ROLE_TABLE[path]) return true;
    for (let i = 0; i < roles.length; i++) {
      if (ROLE_TABLE[path].includes(roles[i])) return true;
    }
    // Dùng forEach: bất đồng bộ nên ko được nhé!
    // Nó sẽ return false trước khi chạy vào trong forEach
    // roles.forEach(role => {
    //   if (ROLE_TABLE[path].includes(role)) return true;
    // });
    return false;
  };

  generateMenu = (menuItems) => {
    const { pathname } = this.props.location;
    return menuItems.map((item) => {
      const itemClass = 'menu-item' + (item.path === pathname ? ' active-menu' : '');
      if (item.path === null) item.path = '#';

      if (item.subItems) {
        return (
          <li key={item.key} className={itemClass + ' menu-parent level' + item.level}>
            <Link to={item.path}>
              {item.name}{' '}
              <i
                className={
                  'caret fas ' + (item.level > 1 ? 'fa-caret-right' : 'fa-caret-down')
                }
              ></i>
            </Link>
            <ul
              key={item.key}
              className={itemClass + ' sub-menu level' + (item.level + 1)}
            >
              {this.generateMenu(item.subItems)}
            </ul>
          </li>
        );
      } else {
        return (
          item.enabled && (
            <li key={item.key} className={itemClass + ' level' + item.level}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          )
        );
      }
    });
  };

  render() {
    const { userInfo } = this.props;
    const roleArray = userInfo ? userInfo.roleArray : [];
    const menuItems = [...MENU_ITEMS];
    this.getActiveMenuItems(roleArray, menuItems);

    return (
      <nav className="navbar custom-navbar">
        <ul className="nav-wrapper">{this.generateMenu(menuItems)}</ul>
        <div className="userinfo-wrapper">
          {!userInfo && <Link to="/login">Login</Link>}
          {userInfo && (
            <div>
              {userInfo.name} (
              <span className="logout-link" onClick={this.handleLogout}>
                Logout
              </span>
              )
            </div>
          )}
        </div>
      </nav>
    );
  }
}

// Use withRouter HOC in order to inject match, history and location in your component props.
export default withRouter(Nav);
