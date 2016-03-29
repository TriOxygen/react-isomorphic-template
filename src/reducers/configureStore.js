import promiseMiddleware from 'lib/promiseMiddleware';
import * as reducers from 'reducers';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { syncHistory, routeReducer } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { setLocale } from 'lib/I18n';

let reducer;
let middlewares;
let reduxRouterMiddleware;

if (process.env.SERVER) {
  middlewares = applyMiddleware(promiseMiddleware);
  reducer = combineReducers(reducers);
} else {
  reduxRouterMiddleware = syncHistory(browserHistory);
  middlewares = applyMiddleware(promiseMiddleware, reduxRouterMiddleware);
  reducer = combineReducers(Object.assign({}, reducers, {
    routing: routeReducer
  }));
}

// browserHistory.listen(location => console.log(location));

export { reduxRouterMiddleware as reduxRouterMiddleware };

export default function (initialState = {}) {
  if (initialState.profile && initialState.profile.settings && initialState.profile.settings.locale) {
    const { locale, defaultCurrency } = initialState.profile.settings.locale;
    setLocale(locale, defaultCurrency);
  }
  return createStore(
    reducer,
    initialState,
    compose(
      middlewares,
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    )
  );
}