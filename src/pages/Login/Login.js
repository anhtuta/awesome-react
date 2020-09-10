import React, { PureComponent } from 'react';
import InputText from '../../components/Input/InputText';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: false
    };
  }

  onChange = (e) => {};

  render() {
    return (
      <div className="login-wrapper">
        <h2 className="login-header">Login</h2>
        <InputText
          label="Username"
          name="username"
          value="username"
          onChange={this.onChange}
        />
        <InputText
          label="Password"
          name="username"
          value="username"
          onChange={this.onChange}
          type="password"
        />
      </div>
    );
  }
}

export default Login;
