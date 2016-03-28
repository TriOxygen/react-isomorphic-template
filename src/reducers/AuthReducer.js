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
    const auth = action.data.data;
    persistentStorage.set('auth', auth);
    return {
      ...state,
      ...auth
    }
  },
  [LOGOUT]: (state, action) => {
    const auth = action.data.data;
    persistentStorage.set('auth', auth);
    return {
      ...auth
    };
  }
});

export function login(email, password) {
  return {
    type: LOGIN,
    promise: api.put('auth', { email, password })
  };
}

export function logout() {
  return {
    type: LOGOUT,
    promise: api.delete('auth')
  };
}