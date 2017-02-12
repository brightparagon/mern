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

// Sign In
export function signinRequest(email, password) {
  return (dispatch) => {
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
