
import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import routes from 'routes';
import AppWrapper from 'containers/AppWrapper';

import configureStore, { reduxRouterMiddleware } from 'reducers/configureStore';

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
    <AppWrapper>
      <Router children={routes} history={browserHistory} />
    </AppWrapper>
  </Provider>,
  document.getElementById('app')
);

