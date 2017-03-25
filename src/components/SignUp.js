import React from 'react';
import {Link} from 'react-router';
import {Button, Input, Grid, Icon, Label} from 'semantic-ui-react';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleChange(e, {name, value}) {
    let nextState = {};
    nextState[name] = value;
    this.setState(nextState);
  }

  handleSignUp() {
    let email = this.state.email;
    let name = this.state.name;
    let password = this.state.password;

    this.props.onSignUp(email, name, password).then(
      (success) => {
        if(!success) {
          // 회원가입 실패하면 비밀번호 초기화
          this.setState({
            password: '',
          });
        }
      }
    );
  }

  render() {
    return(
      <div className="SignUp">
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
            <Label color='olive'>Email</Label>
            <br/>
            <Input placeholder='Name'
              value={this.state.name} name='name'
              onChange={this.handleChange}>
              <input/>
            </Input>
            <br/>
            <br/>
            <Label color='orange'>Password</Label>
            <br/>
            <Input value={this.state.password} name='password'
              onChange={this.handleChange}>
              <input type='password'/>
            </Input>
            <br/>
            <br/>
            <Button color='green' onClick={this.handleSignUp}>Sign Up!</Button>
          </Grid.Column>
        </Grid>
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
