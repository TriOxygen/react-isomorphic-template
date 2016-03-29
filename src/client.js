
import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import routes from 'routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore, { reduxRouterMiddleware } from 'reducers/configureStore';
injectTapEventPlugin();

window.React = React;

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

reduxRouterMiddleware.listenForReplays(store);

require('images/favicon.png');
require('styles/normalize.css');
require('styles/bundle.css');
require('oxygen-md-svg-icons/lib/bundle.css');

render(
  <Provider store={store}>
    <Router children={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('app')
);

