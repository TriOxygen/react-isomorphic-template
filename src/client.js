import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Provider } from 'react-redux';
import * as reducers from 'reducers';
import routes from 'routes';
import promiseMiddleware from 'lib/promiseMiddleware';
import { createStore,
         combineReducers,
         applyMiddleware } from 'redux';
import AppWrapper from 'containers/AppWrapper';
import path from 'path';

process.env.browser = true;

const initialState = window.__INITIAL_STATE__;

const history = createBrowserHistory();

const reducer = combineReducers(reducers);
const store = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState);

require('images/favicon.png');
require('styles/normalize.css');
require('styles/bundle.css');
require('oxygen-md-svg-icons/lib/bundle.css');

render(
  <Provider store={store}>
    <AppWrapper>
      <Router children={routes} history={history} />
    </AppWrapper>
  </Provider>,
  document.getElementById('react-view')
);

