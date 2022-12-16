import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MENU_ITEMS } from '../../constants/Constants';
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
        if (!auth.rolesHasPermission(roleArray, item.path)) {
          // console.log(`User don't have permission to access path: ${item.path}`);
          // ĐỪNG dùng splice, bởi vì JS bất đồng bộ nên sẽ bị lỗi thỉnh thoảng bị miss menu item
          // menuItems.splice(index, 1);
          item.enabled = false;
        } else {
          // Fix lỗi ở dưới comment của hàm render
          item.enabled = true;
        }
      }
    });
    return menuItems;
  };

  generateMenu = (menuItems) => {
    const { pathname } = this.props.location;
    return menuItems.map((item) => {
      const itemClass = 'menu-item' + (item.path === pathname ? ' active-menu' : '');
      if (item.path === null) item.path = '#';

      if (item.subItems) {
        return (
          <li key={item.key} className={`${itemClass} menu-parent level${item.level}`}>
            <Link to={item.path}>
              {item.name}&nbsp;
              <i
                className={'caret fa ' + (item.level > 1 ? 'fa-caret-right' : 'fa-caret-down')}
                onClick={(e) => e.preventDefault()}
              ></i>
            </Link>
            <ul key={item.key} className={itemClass + ' sub-menu level' + (item.level + 1)}>
              {this.generateMenu(item.subItems)}
            </ul>
          </li>
        );
      } else {
        return (
          item.enabled && (
            <li
              key={item.key}
              className={`${itemClass} level${item.level} ${item.className ? item.className : ''}`}
              title={item.title ? item.title : ''}
            >
              <Link to={item.path}>{item.name}</Link>
            </li>
          )
        );
      }
    });
  };

  render() {
    const { userInfo } = this.props;
    // console.log('userInfo', userInfo);
    const roleArray = userInfo ? userInfo.roleArray : [];
    const menuItems = [...MENU_ITEMS];
    // console.log('menuItems before: ', JSON.stringify(menuItems));
    this.getActiveMenuItems(roleArray, menuItems);
    // console.log('menuItems after: ', JSON.stringify(menuItems));
    // Tại sao MENU_ITEMS lại bị thay đổi giống với menuItems? Để rồi mỗi lần re-render, menuItems tuy lấy giá trị mới
    // từ MENU_ITEMS nhưng menuItems vẫn = với giá trị của nó ở lần render trước đó (sau khi thự thi getActiveMenuItems)
    // console.log('MENU_ITEMS now : ', JSON.stringify(MENU_ITEMS));

    return (
      <nav className="custom-navbar">
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
