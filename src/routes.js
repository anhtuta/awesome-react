import React from 'react';
import Home from './pages/Home/Home';
import Book from './pages/Book/Book';
import About from './pages/About/About';
import HookDemo from './pages/HookDemo/HookDemo';
import NotFound from './pages/NotFound/NotFound';

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Home />
  },
  {
    path: '/book',
    exact: true,
    main: () => <Book />
  },
  {
    path: '/about',
    exact: false,
    main: () => <About />
  },
  {
    path: '/hook-demo',
    exact: false,
    main: () => <HookDemo />
  },
  {
    path: '',
    exact: false,
    main: () => <NotFound />
  }
];

export default routes;
