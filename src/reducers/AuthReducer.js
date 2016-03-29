import api from 'lib/api';
import createStore from 'lib/createStore';
import persistentStorage from 'lib/persistentStorage';

const LOGIN = 'auth/login';
const LOGOUT = 'auth/logout';

const initialState = {
  loggedIn: false
};

export default createStore(initialState, {
  [LOGIN]: (state, action) => {
    const auth = action.data;
    persistentStorage.set('auth', auth);
    return {
      ...state,
      ...auth
    }
  },
  [LOGOUT]: (state, action) => {
    const auth = action.data;
    persistentStorage.set('auth', auth);
    return {
      ...auth
    };
  }
});

export function login(email, password, successMessage, errorMessage) {
  return {
    type: LOGIN,
    promise: api.put('auth', { email, password }),
    successMessage,
    errorMessage
  };
}

export function logout(successMessage, errorMessage) {
  return {
    type: LOGOUT,
    promise: api.delete('auth'),
    successMessage,
    errorMessage
  };
}