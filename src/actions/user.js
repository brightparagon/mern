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
      .then((response) => { // response가 server에서 전달된 결과를 갖고 있음
        // response 객체 구조를 모르겠으면 console.log로 뜯어보면 된다
        // response.data가 없어서 찾아보니 response.body.token으로 전달되었음
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
