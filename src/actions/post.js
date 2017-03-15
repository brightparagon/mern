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
      }, (error) => {
        console.log(error);
        dispatch(createPostFail(error));
      });
      // .catch((error) => {
      //   dispatch(createPostFail());
      // });
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

export function createPostFail(error) {
  return {
    type: POST_UPLOAD_FAIL,
    failReason: error,
  };
}

// DISPATCHER FOR LIST POST
export function listPostRequest() {
  return (dispatch) => {
    dispatch(listPost());
    return request
      .get('/api/post/all')
      .then((response) => {
        dispatch(listPostSuccess(response.body.posts));
      }, (error) => {
        dispatch(listPostFail(error));
      });
  };
}

export function listPost() {
  return {
    type: POST_LIST,
  };
}

export function listPostSuccess(posts) {
  return {
    type: POST_LIST_SUCCESS,
    posts,
  };
}

export function listPostFail(error) {
  return {
    type: POST_LIST_FAIL,
    failReason: error,
  };
}

// DISPATCHER FOR EDIT POST
export function editPostRequest(id, title, contents) {
  return (dispatch) => {
    dispatch(editPost());
    return request
      .put('/api/post/' + id)
      .send({title, contents})
      .then((response) => {
        dispatch(editPostSuccess(response.body.post));
      }, (error) => {
        dispatch(editPostFail(error));
      });
  };
}

export function editPost() {
  return {
    type: POST_UPDATE,
  };
}

export function editPostSuccess(post) {
  return {
    type: POST_UPDATE_SUCCESS,
    post,
  };
}

export function editPostFail(error) {
  return {
    type: POST_UPDATE_FAIL,
    failReason: error,
  };
}

// DISPATCHER FOR DELETE POST
export function deletePostReqeust(id) {
  return (dispatch) => {
    dispatch(deletePost());
    return request
      .delete('/api/post/' + id)
      .then((response) => {
        console.log(response);
        dispatch(deletePostSuccess());
      }, (error) => {
        dispatch(deletePostFail(error));
      });
  };
}

export function deletePostSucess() {
  return {
    type: POST_DELETE_SUCCESS,
  };
}

export function deletePostFail(error) {
  return {
    type: POST_DELETE_FAIL,
    failReason: error,
  };
}
