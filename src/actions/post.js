import {
  POST_UPLOAD,
  POST_UPLOAD_SUCCESS,
  POST_UPLOAD_FAIL,
  POST_UPDATE,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_FAIL,
  POST_LIST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_READ,
  POST_READ_SUCCESS,
  POST_READ_FAIL,
  POST_DELETE,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAIL,
} from './ActionTypes';
import request from 'superagent';

// DISPATCHER FOR CREATE POST
export function createPostRequest(title, contents, userId) {
  return (dispatch) => {
    dispatch(createPost());

    return request
      .post('/api/post/')
      .send({title, contents, userId})
      .then((response) => {
        dispatch(createPostSuccess());
      }).catch((error) => {
        dispatch(createPostFail());
      });
  };
}

export function createPost() {
  return {
    type: POST_UPLOAD,
  };
}

export function createPostSuccess() {
  return {
    type: POST_UPLOAD_SUCCESS,
  };
}

export function createPostFail() {
  return {
    type: POST_UPLOAD_FAIL,
  };
}

// DISPATCHER FOR LIST POST
export function listPostRequest() {
  return (dispatch) => {
    dispatch(signin());
    return request
      .post('/api/user/signin')
      .send({
        email: email,
        password: password,
      })
      .then((response) => {
        dispatch(createPostSuccess());
      }).catch((error) => {
        dispatch(createPostFail());
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
