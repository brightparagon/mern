import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  post: {
    status: 'INIT',
    data: {},
  },
  list: {
    status: 'INIT',
    data: [],
  },
  edit: {
    status: 'INIT',
  },
  remove: {
    status: 'INIT',
  },
};

export default function post(state, action) {
  if(typeof state === "undefined") {
    state = initialState;
  }

  switch(action.type) {
    // CREATE POST
    case types.POST_UPLOAD:
      return update(state, {
        post: {
          status: {$set: 'WAITING'},
        },
      });
    case types.POST_UPLOAD_SUCCESS:
      return update(state, {
        post: {
          status: {$set: 'SUCCESS'},
        },
      });
    case types.POST_UPLOAD_FAIL:
      return update(state, {
        post: {
          status: {$set: 'FAIL'},
          failReason: {$set: action.failReason},
        },
      });

    // LIST POST
    case types.POST_LIST:
      return update(state, {
        list: {
          status: {$set: 'WAITING'},
        },
      });
    case types.POST_LIST_SUCCESS:
      return update(state, {
        list: {
          status: {$set: 'SUCCESS'},
          data: {$set: action.posts},
        },
      });

    // RETRIEVE POST
    case types.POST_READ:
      return update(state, {
        post: {
          status: {$set: 'WAITING'},
        },
      });
    case types.POST_READ_SUCCESS:
      return update(state, {
        post: {
          status: {$set: 'SUCCESS'},
          data: {$set: action.post},
        },
      });
    case types.POST_READ_FAIL:
      return update(state, {
        post: {
          status: {$set: 'FAIL'},
          failReason: {$set: action.failReason},
        },
      });

    // EDIT POST
    case types.POST_UPDATE:
      return update(state, {
        edit: {
          status: {$set: 'WAITING'},
          data: {$set: undefined},
        },
      });

    case types.POST_UPDATE_SUCCESS:
      return update(state, {
        edit: {
          status: {$set: 'SUCCESS'},
          data: {$set: action.post},
        },
      });
    case types.POST_UPDATE_FAIL:
      return update(state, {
        edit: {
          status: {$set: 'FAIL'},
          failReason: {$set: action.failReason},
        },
      });

    // DELETE POST
    case types.POST_DELETE:
      return update(state, {
        remove: {
          status: {$set: 'WAITING'},
        },
      });
    case types.POST_DELETE_SUCCESS:
      return update(state, {
        remove: {
          status: {$set: 'WAITING'},
        },
      });
    case types.POST_DELETE_FAIL:
      return update(state, {
        remove: {
          status: {$set: 'FAIL'},
          failReason: {$set: action.failReason},
        },
      });

    default:
      return state;
  }
}
