import React from 'react';
import loadable from '@loadable/component';
import LoadingIcon from './LoadingIcon';

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
    return <LoadingIcon show={true} />;
  } else {
    return null;
  }
};

// Using Loadable is simple. All you need to do is pass in a function which loads
// your component and a "Loading" component to show while your component loads.
export const Nav = loadable(() => import('../../components/Nav/Nav'), {
  fallback: Loading({
    pastDelay: true,
    error: false,
    timedOut: false
  })
});

export const About = loadable(() => import('../../pages/About/About'), {
  fallback: Loading({
    pastDelay: true,
    error: false,
    timedOut: false
  })
});

export const Book = loadable(() => import('../../pages/Book/Book'), {
  fallback: Loading({
    pastDelay: true,
    error: false,
    timedOut: false
  })
});

export const Staff = loadable(() => import('../../pages/Staff/Staff'), {
  fallback: Loading({
    pastDelay: true,
    error: false,
    timedOut: false
  })
});

export const Home = loadable(() => import('../../pages/Home/Home'), {
  fallback: Loading({
    pastDelay: true,
    error: false,
    timedOut: false
  })
});

export const ClockDemo = loadable(() => import('../../pages/Demo/ClockDemo'), {
  fallback: Loading({
    pastDelay: true,
    error: false,
    timedOut: false
  })
});

export const FetchDemo = loadable(() => import('../../pages/Demo/FetchDemo'), {
  fallback: Loading({
    pastDelay: true,
    error: false,
    timedOut: false
  })
});

export const CounterFC = loadable(() => import('../../pages/Demo/CounterFC'), {
  fallback: Loading({
    pastDelay: true,
    error: false,
    timedOut: false
  })
});

export const CounterCC = loadable(() => import('../../pages/Demo/CounterCC'), {
  fallback: Loading({
    pastDelay: true,
    error: false,
    timedOut: false
  })
});

export const CounterFCCallback = loadable(() => import('../../pages/Demo/CounterFCCallback'), {
  fallback: Loading({
    pastDelay: true,
    error: false,
    timedOut: false
  })
});

export const CustomHookDemo = loadable(() => import('../../pages/Demo/CustomHook/CustomHookDemo'), {
  fallback: Loading({
    pastDelay: true,
    error: false,
    timedOut: false
  })
});

export const MagicColor = loadable(() => import('../../pages/Demo/CustomHook/MagicColor'), {
  fallback: Loading({
    pastDelay: true,
    error: false,
    timedOut: false
  })
});

export const ParentMagicColor = loadable(
  () => import('../../pages/Demo/CustomHook/ParentMagicColor'),
  {
    fallback: Loading({
      pastDelay: true,
      error: false,
      timedOut: false
    })
  }
);

export const Login = loadable(() => import('../../pages/Login/Login'), {
  fallback: Loading({
    pastDelay: true,
    error: false,
    timedOut: false
  })
});

export const NotFound = loadable(() => import('../../pages/NotFound/NotFound'), {
  fallback: Loading({
    pastDelay: true,
    error: false,
    timedOut: false
  })
});
