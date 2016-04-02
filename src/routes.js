import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/App';
import Home from 'containers/Home';
import TransitionTest from 'components/TransitionTest';
import UserCreateForm from 'containers/User/UserCreateForm';
import UserEditForm from 'containers/User/UserEditForm';
import UserList from 'containers/User/UserList';
import ThemeChanger from 'containers/ThemeChanger';
import Login from 'containers/Login';
import NotFound from 'containers/NotFound';
import fetchComponentData from 'lib/fetchComponentData';


export default function createRoutes(store) {

  function requireLogin(nextState, replace, callback) {
    const { profile } = store.getState();
    if (profile && profile.loggedIn) {
      return onEnter.apply(this, [nextState, replace, callback]);
    } else {
      replace('/login');
      callback();
    }
  }

  function onEnter(nextState, replace, callback) {
    if (nextState.location.action !== 'POP') {
      fetchComponentData(store.dispatch, [this.component], nextState.params).then(() => {
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
      <Route path="/users" component={UserList} onEnter={requireLogin}>
        <Route path="/users/new" component={UserCreateForm} onEnter={requireLogin}/>
        <Route path="/users/:userId" component={UserEditForm} onEnter={requireLogin}/>
      </Route>
      <Route path="/theme" component={ThemeChanger} onEnter={requireLogin}/>
      <Route path="/login" component={Login} />
      <Route path="*" component={NotFound}/>
    </Route>
  );
}