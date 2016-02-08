import promiseMiddleware from 'lib/promiseMiddleware';
import * as reducers from 'reducers';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

const reducer = combineReducers(reducers);

export default function (initialState = {}) {
  return createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(promiseMiddleware),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    )
  );
}