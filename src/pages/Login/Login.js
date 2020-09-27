import React, { PureComponent } from 'react';
import Button from '../../components/Button/Button';
import InputText from '../../components/Input/InputText';
import Cookies from 'js-cookie';
import { auth } from '../../components/Auth/Auth';
import { ACCESS_TOKEN } from '../../constants/Constants';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: false
    };
  }

  onChange = (obj) => {
    this.setState({
      [obj.name]: obj.value
    });
  };

  handleSubmit = () => {
    const { username, password } = this.state;
    const data = {
      username,
      password
    };
    auth
      .login(data)
      .then((res) => {
        const expiredDate = new Date(new Date().getTime() + res.expires_in * 1000);
        Cookies.set(ACCESS_TOKEN, res[ACCESS_TOKEN], { expires: expiredDate });
        window.location = '/';
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="login-wrapper">
        <h2 className="login-header">Login</h2>
        <InputText
          label="Username"
          name="username"
          value={username}
          onChange={this.onChange}
        />
        <InputText
          label="Password"
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
        />
        <Button text="Login" onClick={this.handleSubmit} />
      </div>
    );
  }
}

export default Login;
