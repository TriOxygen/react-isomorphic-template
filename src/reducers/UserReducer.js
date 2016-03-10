import api from 'lib/api';
import createStore from 'lib/createStore';

const GET_USERS = 'users/get';
const CREATE_USER = 'users/create';
const UPDATE_USER = 'users/update';
const DELETE_USER = 'users/delete';

export default createStore([], {
  [GET_USERS]: (state, action) => {
    return action.data.data;
  },
  [CREATE_USER]: (state, action) => {
    return [...state, action.data.data];
  },
  [UPDATE_USER]: (state, action) => {
    const updatedUser = action.data.data;
    return state.map((todo) => {
      if (todo._id === updatedUser._id) {
        return updatedUser;
      }
      return todo;
    })
  },
  [DELETE_USER]: (state, action) => {
    const deletedUser = action.data.data;
    return state.filter(todo => {
      return todo._id !== deletedUser._id;
    });
  }
})

export function getUsers () {
  return {
    type: GET_USERS,
    promise: api.get(`users`)
  };
}

export function createUser (user) {
  return {
    type: CREATE_USER,
    promise: api.post(`users`, user)
  };
}

export function updateUser (id, user) {
  return {
    type: UPDATE_USER,
    promise: api.put(`users/${id}`, user)
  };
}

export function deleteUser (id) {
  return {
    type: DELETE_USER,
    promise: api.delete(`users/${id}`)
  };
}
