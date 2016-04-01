import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/App';
import Home from 'containers/Home';
import TransitionTest from 'components/TransitionTest';
import UserList from 'containers/User/UserList';
import UserEditForm from 'containers/User/UserEditForm';
import UserCreateForm from 'containers/User/UserCreateForm';
import ThemeChanger from 'containers/ThemeChanger';
import Login from 'containers/Login';
import NotFound from 'containers/NotFound';
import fetchComponentData from 'lib/fetchComponentData';


export default function createRoutes(dispatch) {
  function onEnter(nextState, replace, callback) {
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
      <Route path="/users" component={UserList} onEnter={onEnter}>
        <Route path="/users/new" component={UserCreateForm} onEnter={onEnter}/>
        <Route path="/users/:userId" component={UserEditForm} onEnter={onEnter}/>
      </Route>
      <Route path="/theme" component={ThemeChanger} />
      <Route path="/login" component={Login} />
      <Route path="*" component={NotFound}/>
    </Route>
  );
}