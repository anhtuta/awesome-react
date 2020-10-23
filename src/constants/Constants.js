export const ACCESS_TOKEN = 'access_token';

export const ROLES = {
  ROLE_USER: 'USER',
  ROLE_ADMIN: 'ADMIN'
};

export const MENU_ITEMS = [
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
        name: 'Hook demo',
        path: null,
        key: 'hookDemo',
        level: 2,
        subItems: [
          {
            name: 'Clock Demo',
            path: '/clock-demo',
            key: 'clockDemo',
            level: 3,
            subItems: null
          },
          {
            name: 'Fetch Demo',
            path: '/fetch-demo',
            key: 'fetchDemo',
            level: 3,
            subItems: null
          }
        ]
      }
    ]
  }
];

export const ROLE_TABLE = {
  '/book': [ROLES.ROLE_USER, ROLES.ROLE_ADMIN],
  '/fetch-demo': [ROLES.ROLE_USER, ROLES.ROLE_ADMIN]
};
