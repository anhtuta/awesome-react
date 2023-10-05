export const ACCESS_TOKEN = 'access_token';

export const ACTION_ADD = 'ADD';
export const ACTION_EDIT = 'EDIT';

export const ROLES = {
  ROLE_USER: 'USER',
  ROLE_ADMIN: 'ADMIN',
  ROLE_STORE_MANAGER: 'STORE_MANAGER',
  ROLE_BOOK_MANAGER: 'BOOK_MANAGER'
};

// việc set enabled sẽ dựa vào permission của từng user. Sau khi login,
// nếu user ko có quyền xem menu nào, thì sẽ set enabled = false
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
          },
          {
            name: 'CounterFC',
            path: '/counter-fc',
            key: 'counterFC',
            level: 3,
            enabled: true,
            subItems: null
          },
          {
            name: 'CounterCC',
            path: '/counter-cc',
            key: 'counterCC',
            level: 3,
            enabled: true,
            subItems: null
          },
          {
            name: 'CounterFCCallback',
            path: '/counter-fc-callback',
            key: 'counterFCCallback',
            level: 3,
            enabled: true,
            subItems: null
          },
          {
            name: 'CustomHookDemo',
            path: '/custom-hook-demo',
            key: 'customHookDemo',
            level: 3,
            enabled: true,
            subItems: null
          },
          {
            name: 'MagicColor',
            path: '/magic-color',
            key: 'magicColor',
            level: 3,
            enabled: true,
            subItems: null
          },
          {
            name: 'ParentMagicColor',
            path: '/parent-magic-color',
            key: 'parentMagicColor',
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

export const STAFF_ALIVE = 1;
export const STAFF_DEAD = 0;

export const GENDERS = {
  MALE: 'male',
  FEMALE: 'female',
  GAY: 'gay',
  LESBIAN: 'lesbian',
  UNKNOWN: 'unknown'
};
