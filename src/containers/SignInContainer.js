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
        if(this.props.status === "SUCCESS") {
          alert('Hello! ' + this.props.currentUser); // String Interpolation
          browserHistory.push('/');
          return true;
        } else {
          // error codes 이용해서 알러트 띄우기
          alert('Sign In Fail');
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
    status: state.navigation.signin.status,
    currentUser: state.navigation.status.currentUser,
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
