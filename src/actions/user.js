import {
  USER_SIGNUP,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNIN,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_GET_STATUS,
  USER_GET_STATUS_SUCCESS,
  USER_GET_STATUS_FAIL,
  USER_SIGNOUT,
  USER_UPDATE,
  USER_WITHDRAW,
} from './ActionTypes';
import request from 'superagent';

// DISPATCHER FOR SIGN UP
export function signupRequest(email, name, password) {
  return (dispatch) => {
    // set status
    dispatch(signup());

    return request
      .post('/api/user/signup')
      .send({email, name, password})
      .then((response) => {
        dispatch(signupSuccess());
      }).catch((error) => {
        dispatch(signupFail());
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
    // 회원가입 이후 곧바로 로그인(세션 저장) 추후 구현
    // email
  };
}

export function signupFail() {
  return {
    type: USER_SIGNUP_FAIL,
  };
}

// DISPATCHER FOR SIGN IN
export function signinRequest(email, password) {
  return (dispatch) => {
    // set status
    dispatch(signin());
    return request
      .post('/api/user/signin')
      .send({
        email: email,
        password: password,
      })
      .then((response) => {
        // response.body.token으로 전달되었음
        let processedToken = response.body.token.split('.')[1];
        processedToken = JSON.parse(atob(processedToken));
        dispatch(signinSuccess(processedToken));
      }).catch((error) => {
        dispatch(signinFail(error));
      });
  };
}

export function signin() {
  return {
    type: USER_SIGNIN,
  };
}

export function signinSuccess(token) {
  return {
    type: USER_SIGNIN_SUCCESS,
    token,
  };
}

export function signinFail(failReason) {
  return {
    type: USER_SIGNIN_FAIL,
    failReason,
  };
}

// DISPATCHER FOR SIGN OUT
export function signoutRequest() {
  return (dispatch) => {
    dispatch(signout());
  };
}

export function signout() {
  return {
    type: USER_SIGNOUT,
  };
}

export function getStatusRequest(id) {
  return (dispatch) => {
    dispatch(getStatus());
    return request
      .get('/api/user/getstatus')
      .send({id: id})
      .then((response) => {
        dispatch(getStatusSuccess(response.body.result));
      }, (error) => {
        dispatch(getStatusFail(error));
      });
  };
}

export function getStatus() {
  return {
    type: USER_GET_STATUS,
  };
}

export function getStatusSuccess(result) {
  return {
    type: USER_GET_STATUS_SUCCESS,
    result,
  };
}

export function getStatusFail(failReason) {
  return {
    type: USER_GET_STATUS_FAIL,
    failReason,
  };
}
