import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/App';
import Home from 'containers/Home';
import TransitionTest from 'components/TransitionTest';
import Users from 'components/Users';
import ThemeChanger from 'containers/ThemeChanger';
import Login from 'containers/Login';
import NotFound from 'containers/NotFound';

export default (
  <Route name="App" component={App} path="/">
    <IndexRoute component={Home}/>
    <Route path="/test" component={TransitionTest} />
    <Route path="/users" component={Users} />
    <Route path="/theme" component={ThemeChanger} />
    <Route path="/login" component={Login} />
    <Route path="*" component={NotFound}/>
  </Route>
);
