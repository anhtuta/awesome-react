import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ROLES } from '../../constants/Constants';
import { auth } from '../Auth/Auth';
import './Nav.scss';

// Tạm thời code mới chỉ handle được 2 level
const MENU_ITEMS = [
  {
    name: 'Home',
    path: '/',
    key: 'home',
    level: 1,
    subItems: null
  },
  {
    name: 'Book',
    path: '/book',
    key: 'book',
    level: 1,
    subItems: null
  },
  {
    name: 'About',
    path: '/about',
    key: 'about',
    level: 1,
    subItems: null
  },
  {
    name: 'Demo',
    path: null,
    key: 'demo',
    level: 1,
    subItems: [
      {
        name: 'Clock Demo',
        path: '/clock-demo',
        key: 'clockDemo',
        level: 2,
        subItems: null
      },
      {
        name: 'Fetch Demo',
        path: '/fetch-demo',
        key: 'fetchDemo',
        level: 2,
        subItems: null
      }
    ]
  }
];

// Những URL nào ko có trong này tức là public, role nào cũng vào được
const ROLE_TABLE = {
  '/book': [ROLES.ROLE_USER, ROLES.ROLE_ADMIN],
  '/fetch-demo': [ROLES.ROLE_USER, ROLES.ROLE_ADMIN]
};

class Nav extends Component {
  handleLogout = () => {
    auth.logout();
  };

  render() {
    const { userInfo } = this.props;
    console.log('render Nav: ', userInfo);
    const roleArray = userInfo ? userInfo.roleArray : [];
    const activeMenuItems = MENU_ITEMS.filter((item) => {
      console.log('item: ', item);
      if (item.subItems) {
        console.log('item.subItems: ', item.subItems);
        let temp = item.subItems.filter((subItem) => {
          console.log(
            'hehe: ',
            subItem.path,
            roleArray,
            this.rolesHasPermission(roleArray, subItem.path)
          );
          return this.rolesHasPermission(roleArray, subItem.path);
        });
        console.log('temp: ', temp);
        item.subItems = temp;
        // return true;
      }

      return this.rolesHasPermission(roleArray, item.path);
    });
    console.log('activeMenuItems: ', activeMenuItems);
    return (
      <nav className="navbar custom-navbar">
        <div className="nav-wrapper">{this.generateMenu(activeMenuItems)}</div>
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

  rolesHasPermission = (roles, pathname) => {
    if (!ROLE_TABLE[pathname]) return true;
    if (pathname == '/fetch-demo') {
      console.log('hehe: ', roles, ROLE_TABLE[pathname]);
    }
    for (let i = 0; i < roles.length; i++) {
      if (ROLE_TABLE[pathname].includes(roles[i])) return true;
    }
    // Dùng forEach: bất đồng bộ nên ko được nhé!
    // Nó sẽ return false trước khi chạy vào trong forEach
    // roles.forEach(role => {
    //   if (ROLE_TABLE[pathname].includes(role)) return true;
    // });
    return false;
  };

  generateMenu = (menuItems) => {
    const { pathname } = this.props.location;
    return menuItems.map((item) => {
      const itemClass = 'menu-item' + (item.path === pathname ? ' active-menu' : '');

      if (item.subItems) {
        return (
          <div key={item.key} className={itemClass + ' menu-parent'}>
            {item.name} <i className="fas fa-caret-down"></i>
            <div className="menu-children">{this.generateMenu(item.subItems)}</div>
          </div>
        );
      } else {
        return (
          <div key={item.key} className={itemClass}>
            <Link to={item.path}>{item.name}</Link>
          </div>
        );
      }
    });
  };
}

// Use withRouter HOC in order to inject match, history and location in your component props.
export default withRouter(Nav);
