import createReducer from 'lib/createReducer';

const GET_USERS = 'users/get';
const GET_USER = 'users/getUser';
const CREATE_USER = 'users/create';
const UPDATE_USER = 'users/update';
const DELETE_USER = 'users/delete';

export default createReducer({}, {
  [GET_USER]: (state, action) => {
    return {
      ...state,
      [action.data._id]: {
        ...state[action.data._id],
        ...action.data
      }
    };
  },
  [GET_USERS]: (state, action) => {
    return action.data;
  },
  [CREATE_USER]: (state, action) => {
    return {
      ...state,
      [action.data._id]: action.data
    };
  },
  [UPDATE_USER]: (state, action) => {
    const updatedUser = action.data;
    return {
      ...state,
      [updatedUser._id]: {
        ...state[updatedUser._id],
        ...updatedUser
      }
    };
  },
  [DELETE_USER]: (state, action) => {
    const newState = Object.assign({}, state);
    delete(newState[action.data._id]);
    return newState;
  }
})

export function getUsers () {
  return {
    type: GET_USERS,
    apiCall: api => api.get('users'),
  };
}

export function getUser ({userId}) {
  return {
    type: GET_USER,
    apiCall: api => api.get(`users/${userId}`),
    checkCache: state => {
      if (state.users[userId] && state.users[userId].hasOwnProperty('active')) {
        return state.users[userId];
      }
      return false;
    }
  };
}

export function createUser (user) {
  return {
    type: CREATE_USER,
    apiCall: api => api.post('users', user),
  };
}

export function updateUser (id, user) {
  return {
    type: UPDATE_USER,
    apiCall: api => api.put(`users/${id}`, user),
  };
}

export function deleteUser (id) {
  return {
    type: DELETE_USER,
    apiCall: api => api.delete(`users/${id}`),
  };
}