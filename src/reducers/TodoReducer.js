import request from 'axios';
import createStore from 'lib/createStore';

//const API_URL = 'https://webtask.it.auth0.com/api/run/wt-milomord-gmail_com-0/redux-tutorial-backend?webtask_no_cache=1';
const API_URL = 'http://localhost:3000/api';
const GET_TODOS = 'todos/get';
const CREATE_TODO = 'todos/create';
const EDIT_TODO = 'todos/edit';
const DELETE_TODO = 'todos/delete';

export default createStore([], {
  [GET_TODOS]: (state, action) => {
    return action.data;
  },
  [CREATE_TODO]: (state, action) => {
    return [action.data, ...state];
  },
  [EDIT_TODO]: (state, action) => {
    const updatedTodo = action.data;
    return state.map((todo) => {
      if (todo._id === updatedTodo._id) {
        return updatedTodo;
      }
      return todo;
    })
  },
  [DELETE_TODO]: (state, action) => {
    const deletedTodo = action.data;
    return state.filter(todo => {
      return todo._id !== deletedTodo._id;
    });
  }
})

export function getTodos () {
  return {
    type: GET_TODOS,
    promise: request.get(`${API_URL}/todo`)
  };
}

export function createTodo (text) {
  return {
    type: CREATE_TODO,
    promise: request.post(`${API_URL}/todo`, { text })
  };
}

export function editTodo (id, text) {
  return {
    type: EDIT_TODO,
    promise: request.put(`${API_URL}/todo/${id}`, { text })
  };
}

export function deleteTodo (id) {
  return {
    type: DELETE_TODO,
    promise: request.delete(`${API_URL}/todo/${id}`)
  };
}
