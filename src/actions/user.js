import {
    USER_SIGNIN,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_GET_STATUS,
    USER_GET_STATUS_SUCCESS,
    USER_GET_STATUS_FAIL,
    USER_SIGNOUT,
    USER_SIGNUP,
    USER_UPDATE,
    USER_WITHDRAW,
} from './ActionTypes';
import request from 'superagent';

// SIGN UP
export function signupRequest(email, name, password) {
  return (dispatch) => {
    // set status
    dispatch(signup());

    return request
      .post('/api/user/signup')
      .send({email, name, password})
      .end((err, res) => {
        // --> Update codes in the server <error codes>
        if(err) dispatch(signupFail(error.response.data.code));
        dispatch(signupSuccess(email));
      });
  };
}

export function signup() {
  return {
    type: USER_SIGNUP,
  };
}

export function signupSuccess() {
  return {
    type: USER_SIGNUP_SUCCESS,
  };
}

export function signupFail(error) {
  return {
    type: AUTH_REGISTER_FAILURE,
    error,
  };
}

// SIGN IN
export function signinRequest(email, password) {
  return (dispatch) => {
    // set status
    dispatch(signin());
    return request
      .post('/api/user/signin')
      .send({email, password})
      .end((err, res) => {
        if(err) dispatch(signinFail());
        dispatch(loginSuccess(email));
      });
  };
}

export function signin() {
  return {
    type: USER_SIGNIN,
  };
}

export function signinSuccess(email) {
  return {
    type: USER_SIGNIN_SUCCESS,
    email,
  };
}

export function signinFail() {
  return {
    type: USER_SIGNIN_FAIL,
  };
}
