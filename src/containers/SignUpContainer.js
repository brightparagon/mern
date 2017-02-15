import React from 'react';
import {SignUp} from '../components';
import {connect} from 'react-redux';
import {signupRequest} from '../actions/user';

class SignUpContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp(email, name, password) {
    return this.props.signupRequest(email, name, password).then(
      () => {
        if(this.props.status === "SUCCESS") {
          console.log('Sign Up Success!');
          browserHistory.push('/user/signin');
          return true;
        } else {
          /*
           ERROR CODES:
             1: BAD USERNAME
             2: BAD PASSWORD
             3: USERNAME EXISTS
         */
        //  let errorMessage = [
        //    'Invalid Username',
        //    'Password is too short',
        //    'Username already exists'
        //  ];
          console.log('Sign Up Fail');
          return false;
        }
      }
    );
  }

  render() {
    return(
      <SignUp onSignUp={this.handleSignUp}/>
    );
  }
}

// GET STATE FROM STORE(REDUCERS) AND MATCH IT TO THIS.PROPS
const mapStateToProps = (state) => {
  return {
    status: state.navigation.signup.status,
  };
};

// MATCH DISPATCH FUNCS OF ACTIONS TO THIS.PROPS
const mapDispatchToProps = (dispatch) => {
  return {
    signupRequest: (email, name, password) => {
      return dispatch(signupRequest(email, name, password));
    },
  };
};

export default connect(mapStateToProps,
  mapDispatchToProps)(SignUpContainer);
