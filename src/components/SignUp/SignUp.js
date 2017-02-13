import React from 'react';
import {Link} from 'react-router';
// import './SignUp.css';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    // those three variables are changeable -> should be states not props
    this.state = {
      email: '',
      name: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleRegister() {
    let email = this.state.email;
    let name = this.state.name;
    let password = this.state.password;

    this.props.onRegister(email, name, password).then(
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
        <div className="Name">
          <label>Name</label>
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
      <div className="SignUp">
        {inputBoxes}
        <a onClick={this.handleSignUp}>SIGN UP</a>
      </div>
    );
  }
}

SignUp.propTypes = {
  onSignUp: React.PropTypes.func,
};

SignUp.defaultProps = {
  onSignUp: (email, name, password) => {
    console.error("onRegister not defined");
  },
};

export default SignUp;
