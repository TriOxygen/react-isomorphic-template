import api from 'lib/api';
import createStore from 'lib/createStore';

const SET_LOCALE = 'locale/set';
const GET_LOCALE = 'locale/get';

const initialState = {
  locale: 'en-US',
  defaultCurrency: 'EUR',
};

export default createStore(initialState, {
  [SET_LOCALE]: (state, action) => {
    return {
      ...action.data
    }
  },
  [GET_LOCALE]: (state, action) => {
    return {
      ...action.data
    }
  }
})

export function setLocale (locale, defaultCurrency) {
  return {
    type: SET_LOCALE,
    promise: api.put('locale', { locale, defaultCurrency })
  };
}

export function getLocale () {
  return {
    type: GET_LOCALE,
    promise: api.get('locale')
  };
}
