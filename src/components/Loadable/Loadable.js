import React from 'react';
import Loadable from 'react-loadable';

const Loading = (props) => {
  if (props.error) {
    return (
      <div>
        Error! <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else if (props.timedOut) {
    return (
      <div>
        Taking a long time... <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else if (props.pastDelay) {
    return (
      <div className="loading-wrapper">
        <div>Loading...</div>
      </div>
    );
  } else {
    return null;
  }
};

// Using Loadable is simple. All you need to do is pass in a function which loads
// your component and a "Loading" component to show while your component loads.
export const Nav = Loadable({
  loader: () => import('../../components/Nav/Nav'),
  loading: Loading,
  delay: 250
});

export const About = Loadable({
  loader: () => import('../../pages/About/About'),
  loading: Loading,
  delay: 250 // This delay defaults to 200ms
});

export const Book = Loadable({
  loader: () => import('../../pages/Book/Book'),
  loading: Loading,
  delay: 250
});

export const Home = Loadable({
  loader: () => import('../../pages/Home/Home'),
  loading: Loading,
  delay: 250
});

export const ClockDemo = Loadable({
  loader: () => import('../../pages/Demo/ClockDemo'),
  loading: Loading,
  delay: 250
});

export const FetchDemo = Loadable({
  loader: () => import('../../pages/Demo/FetchDemo'),
  loading: Loading,
  delay: 250
});

export const Login = Loadable({
  loader: () => import('../../pages/Login/Login'),
  loading: Loading,
  delay: 250
});

export const NotFound = Loadable({
  loader: () => import('../../pages/NotFound/NotFound'),
  loading: Loading,
  delay: 250
});
