import React from 'react';
import {SignIn} from '../components';
import {connect} from 'react-redux';
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
          console.log('Sign In Success!');
          browserHistory.push('/');
          return true;
        } else {
          console.log('Sign In Fail');
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
