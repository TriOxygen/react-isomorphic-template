import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import createRoutes from 'routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore, { reduxRouterMiddleware } from 'reducers/configureStore';
import IntlProvider from 'lib/IntlProvider';
import { ThemeProvider } from 'oxygen-md/Styles';

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
  <Provider store={store}>
    <IntlProvider>
      <ThemeProvider>
        <Router children={createRoutes(store)} history={browserHistory} />
      </ThemeProvider>
    </IntlProvider>
  </Provider>,
  document.getElementById('app')
);