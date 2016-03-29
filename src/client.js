import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import routes from 'routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore, { reduxRouterMiddleware } from 'reducers/configureStore';
import { IntlProvider } from 'lib/I18n';

injectTapEventPlugin();

window.React = React;

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

reduxRouterMiddleware.listenForReplays(store);

require('images/favicon.png');
require('styles/normalize.css');
require('styles/bundle.css');
require('oxygen-md-svg-icons/lib/bundle.css');

ReactDOM.render(
  <IntlProvider>
    <Provider store={store}>
      <Router children={routes} history={browserHistory} />
    </Provider>
  </IntlProvider>,
  document.getElementById('app')
);