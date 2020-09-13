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

export default Loading;

export const Login = Loadable({
  loader: () => import('../../pages/Login/Login'),
  loading: Loading,
  delay: 250 // This delay defaults to 200ms
});
