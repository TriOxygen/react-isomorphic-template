import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/App';
import Home from 'containers/Home';
import TransitionTest from 'components/TransitionTest';
import Users from 'components/Users';
import User from 'containers/User';
import ThemeChanger from 'containers/ThemeChanger';
import Login from 'containers/Login';
import NotFound from 'containers/NotFound';
import fetchComponentData from 'lib/fetchComponentData';


export default function createRoutes(dispatch) {
  function onChange(nextState, replace, callback) {
    if (nextState.location.action !== 'POP') {
      fetchComponentData(dispatch, [this.component], nextState.params).then(() => {
        callback();
      });
    } else {
      callback();
    }
  }

  return (
    <Route name="App" component={App} path="/" >
      <IndexRoute component={Home}/>
      <Route path="/test" component={TransitionTest} />
      <Route path="/users" component={Users} onEnter={onChange}>
        <Route path="/users/:userId" component={User} onEnter={onChange}/>
      </Route>
      <Route path="/theme" component={ThemeChanger} />
      <Route path="/login" component={Login} />
      <Route path="*" component={NotFound}/>
    </Route>
  );
}