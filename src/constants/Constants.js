export const ACCESS_TOKEN = 'access_token';

export const ACTION_ADD = 'ADD';
export const ACTION_EDIT = 'EDIT';

export const ROLES = {
  ROLE_USER: 'USER',
  ROLE_ADMIN: 'ADMIN',
  ROLE_STORE_MANAGER: 'STORE_MANAGER',
  ROLE_BOOK_MANAGER: 'BOOK_MANAGER'
};

export const MENU_ITEMS = [
  {
    name: 'Home',
    path: '/',
    key: 'home',
    level: 1,
    enabled: true,
    subItems: null
  },
  {
    name: 'Book',
    path: '/book',
    key: 'book',
    level: 1,
    enabled: true,
    subItems: null
  },
  {
    name: 'Staff',
    path: '/staff',
    key: 'staff',
    level: 1,
    enabled: true,
    subItems: null
  },
  {
    name: 'About',
    path: '/about',
    key: 'about',
    level: 1,
    enabled: true,
    subItems: null
  },
  {
    name: 'Demo',
    path: null,
    key: 'demo',
    level: 1,
    enabled: true,
    subItems: [
      {
        name: 'Hook demo',
        path: null,
        key: 'hookDemo',
        level: 2,
        enabled: true,
        subItems: [
          {
            name: 'Clock Demo',
            path: '/clock-demo',
            key: 'clockDemo',
            level: 3,
            enabled: true,
            subItems: null
          },
          {
            name: 'Fetch Demo',
            path: '/fetch-demo',
            key: 'fetchDemo',
            level: 3,
            enabled: true,
            subItems: null
          }
        ]
      }
    ]
  }
];

// Những URL nào ko có trong này là public URL, role nào cũng access được
export const ROLE_TABLE = {
  '/book': [ROLES.ROLE_USER],
  '/staff': [ROLES.ROLE_STORE_MANAGER],
  '/fetch-demo': [ROLES.ROLE_USER]
};
