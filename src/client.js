import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Provider } from 'react-redux';
import routes from 'routes';
import AppWrapper from 'containers/AppWrapper';
import configureStore from 'reducers/configureStore';

window.React = React;

process.env.browser = true;

const initialState = window.__INITIAL_STATE__;

const history = createBrowserHistory();


const store = configureStore(initialState);

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
  document.getElementById('app')
);

