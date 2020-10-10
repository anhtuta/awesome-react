import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { auth } from './components/Auth/Auth';
import PrivateRoute from './components/Auth/PrivateRoute';
import RestrictedRoute from './components/Auth/RestrictedRoute';
import * as Loadable from './components/Loadable/Loadable';
import Nav from './components/Nav/Nav';
import { ToastContainer } from 'react-toastify';
import './scss/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null
    };
  }

  componentDidMount() {
    const isAuthenticated = auth.isAuthenticated();
    if (isAuthenticated) {
      auth
        .getMe()
        .then((res) => {
          this.setState({
            userInfo: res.data
          });
        })
        .catch((err) => {
          console.log('Error: ', err);
        });
    }
  }

  render() {
    const { userInfo } = this.state;
    return (
      <HashRouter>
        <div className="app">
          <Loadable.Nav userInfo={userInfo} />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Loadable.Home} />
              <Route exact path="/clock-demo" component={Loadable.ClockDemo} />
              <Route exact path="/about" component={Loadable.About} />
              <RestrictedRoute exact path="/login" component={Loadable.Login} />
              <PrivateRoute exact path="/book" component={Loadable.Book} />
              <PrivateRoute exact path="/fetch-demo" component={Loadable.FetchDemo} />
              <Route path="" component={Loadable.NotFound} />
            </Switch>
          </div>
        </div>
        <ToastContainer />
      </HashRouter>
    );
  }
}

export default App;
