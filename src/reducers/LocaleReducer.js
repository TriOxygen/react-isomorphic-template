import createStore from 'lib/createStore';
import persistentStorage from 'lib/persistentStorage';

const SET_LOCALE = 'locale/set';

const initialState = {
  locale: 'en-US',
  defaultCurrency: 'EUR',
};

export default createStore(initialState, {
  [SET_LOCALE]: (state, action) => {
    const { locale, defaultCurrency } = action;
    if (state.locale !== locale && state.defaultCurrency !== defaultCurrency) {
      return {
        ...state,
        locale,
        defaultCurrency
      };
    }
    persistentStorage.set('locale', state);
    return state;
  }
})

export function setLocale (locale, defaultCurrency) {
  return {
    type: SET_LOCALE,
    locale,
    defaultCurrency
  };
}
