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
      // .end((err, res) => {
      //   // --> Update codes in the server <error codes>
      //   // if(err) dispatch(signupFail(error.response.data.code));
      //   if(err) return dispatch(signupFail());
      //   dispatch(signupSuccess());
      // });
      // superagent의 .end는 가장 마지막에 실행되는 Promise이다(.then 보다도 더).
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

// export function signupFail(error) {
//   return {
//     type: USER_SIGNUP_FAIL,
//     error,
//   };
// }

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
        // 어떻게 서버에서 보낸 에러 메시지를 error object에서 받는가..?
        console.log(error);
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

export function getStatusRequest() {
  return (dispatch) => {
    dispatch(getStatus());
    return request
      .get('/api/user/getstatus')
      .then((response) => {
        dispatch(getStatusSuccess(response.body.info.userName));
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

export function getStatusSuccess(userName) {
  return {
    type: USER_GET_STATUS_SUCCESS,
    userName,
  };
}

export function getStatusFail(error) {
  return {
    type: USER_GET_STATUS_FAIL,
    failReason: error,
  };
}
