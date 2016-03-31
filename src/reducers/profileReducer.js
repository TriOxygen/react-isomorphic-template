import api from 'lib/api';
import createReducer from 'lib/createReducer';

const LOGIN = 'profile/login';
const LOGOUT = 'profile/logout';
const SET_LOCALE = 'profile/setLocale';
const GET_LOCALE = 'profile/getLocale';
const SET_THEME = 'profile/setTheme';

const initialState = {
  loggedIn: false,
  settings: {
    locale: {
      locale: 'en-US',
      defaultCurrency: 'EUR',
    },
    theme: {
      primary: 'red',
      secondary: 'indigo',
      tertiary: 'grey',
      main: 'light'
    }
  }
};

export default createReducer(initialState, {
  [LOGIN]: (state, action) => {
    return action.data;
  },
  [LOGOUT]: (state, action) => {
    return action.data;
  },
  [SET_LOCALE]: (state, action) => {
    return action.data;
  },
  [GET_LOCALE]: (state, action) => {
    return action.data;
  },
  [SET_THEME]: (state, action) => {
    return action.data;
  }
});

export function login(email, password) {
  return {
    type: LOGIN,
    promise: api.put('profile', { email, password }),
  };
}

export function logout() {
  return {
    type: LOGOUT,
    promise: api.delete('profile'),
  };
}

export function setLocale (locale, defaultCurrency) {
  return {
    type: SET_LOCALE,
    promise: api.put('profile/locale', { locale, defaultCurrency })
  };
}

export function getLocale () {
  return {
    type: GET_LOCALE,
    promise: api.get('profile/locale')
  };
}

export function setTheme (primary, secondary, tertiary, main) {
  return {
    type: SET_THEME,
    promise: api.put('profile/theme', { primary, secondary, tertiary, main })
  };
}
