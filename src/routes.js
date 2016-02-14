import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/App';
import Home from 'containers/Home';
import TransitionTest from 'components/TransitionTest';

export default (
  <Route name="App" component={App} path="/">
      <IndexRoute component={Home}/>
      <Route path="/test" component={TransitionTest} />
  </Route>
);
