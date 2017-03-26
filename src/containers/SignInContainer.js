import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {SignIn} from '../components';
import {signinRequest} from '../actions/user';

class SignInContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleSignIn(email, password) {
    return this.props.signinRequest(email, password).then(
      () => {
        if(this.props.signinStatus.status === "SUCCESS") {
          alert('Hello! ' + this.props.token.name); // String Interpolation
          let signinData = {
            isSignedIn: true,
            userName: this.props.token.name,
            userEmail: this.props.token.email,
          };
          document.cookie = 'key=' + btoa(JSON.stringify(signinData));
          browserHistory.push('/');
          return true;
        } else {
          alert('Sign In Fail: ' + this.props.signinStatus.failReason);
          return false;
        }
      }
    );
  }

  render() {
    return(
      <SignIn onSignIn={this.handleSignIn}/>
    );
  }
}

// GET STATE FROM STORE(REDUCERS) AND MATCH IT TO THIS.PROPS
const mapStateToProps = (state) => {
  return {
    signinStatus: state.navigation.signin,
    token: state.navigation.status.token,
  };
};

// MATCH DISPATCH FUNCS OF ACTIONS TO THIS.PROPS
const mapDispatchToProps = (dispatch) => {
  return {
    signinRequest: (email, password) => {
      return dispatch(signinRequest(email, password));
    },
  };
};

export default connect(mapStateToProps,
  mapDispatchToProps)(SignInContainer);
