import React from 'react';
import {Link} from 'react-router';
import './SignIn.css';

class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleSignIn() {
    let email = this.state.email;
    let password = this.state.password;

    this.props.onSignIn(email, password).then(
      (success) => {
        if(!success) {
          this.setState({
            password: '',
          });
        }
      }
    );
  }

  render() {
    const inputBoxes = (
      <div>
        <div className="Email">
          <label>Email</label>
          <input
            name="email"
            type="text"
            className="validate"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
        <div className="input-field col s12">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="validate"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );

    return(
      <div className="SignIn">
        {inputBoxes}
        <a onClick={this.handleSignIn}>SIGN IN</a>
      </div>
    );
  }
}

SignIn.propTypes = {
  onSignIn: React.PropTypes.func,
};

SignIn.defaultProps = {
  onSignIn: (email, password) => {
    console.error("onRegister not defined");
  },
};

export default SignIn;
