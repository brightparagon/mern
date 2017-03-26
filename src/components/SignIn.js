import React from 'react';
import {Link} from 'react-router';
import {Button, Input, Grid, Icon, Label} from 'semantic-ui-react';

class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    // if enter pressed
    if(e.charCode === 13) {
      this.handleSignIn();
    }
  };

  handleChange(e, {name, value}) {
    let nextState = {};
    nextState[name] = value;
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
    return(
      <div className="SignIn">
        <br/>
        <br/>
        <Grid verticalAlign='middle' centered columns={5}>
          <Grid.Column>
            <Label color='teal'>Email</Label>
            <br/>
            <Input focus iconPosition='left' placeholder='Email'
              value={this.state.email} name='email'
              onChange={this.handleChange}>
              <Icon name='at'/>
              <input/>
            </Input>
            <br/>
            <br/>
            <Label color='orange'>Password</Label>
            <br/>
            <Input value={this.state.password} name='password'
              onChange={this.handleChange} onKeyPress={this.handleKeyPress}>
              <input type='password'/>
            </Input>
            <br/>
            <br/>
            <Button color='green' onClick={this.handleSignIn}>Sign In</Button>
          </Grid.Column>
        </Grid>
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
