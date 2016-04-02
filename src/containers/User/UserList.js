import React, { PropTypes, Component } from 'react';
import Transition from 'react-motion-ui-pack';
import shallowCompare from 'react-addons-shallow-compare';
import Scrollable from 'components/Scrollable';
import { View, Layout, Toolbar, ToolbarTitle, RaisedButton, MenuButton, MenuItem } from 'oxygen-md';
import MainAppBar from 'components/MainAppBar';

import EditorModeEdit from 'oxygen-md-svg-icons/lib/SvgIcons/EditorModeEdit';
import ActionDelete from 'oxygen-md-svg-icons/lib/SvgIcons/ActionDelete';

import { SplitPane, List, ListItem } from 'oxygen-md';
import * as userActions from 'reducers/userReducer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userMessageActions from 'reducers/userMessageReducer';
import { routeActions } from 'react-router-redux';
import { addMessages, translate as _l } from 'lib/I18n';

import NavigationMoreVert from 'oxygen-md-svg-icons/lib/SvgIcons/NavigationMoreVert';

addMessages({
  ['en-US']: {
    'First name': 'First name',
    'Last name': 'Last name',
    'E-mail': 'E-mail',
    'Add': 'Add',
    'Clear': 'Clear',
    'Save': 'Save',
    'Dialog': 'Dialog',
    'Message': 'Message',
    'User': 'User',
    'Drawer': 'Drawer',
    'Edit': 'Edit',
    'Delete': 'Delete',
    'Password': 'Password',
    'User updated': 'User might have been updated',
    'User update failed': 'User update was not successful',
  },
});

const css = oxygenCss({
  item: {
    // transition: 'all ease 0.25s',
    position: 'relative',
  },
  container: {
    position: 'relative'
  },
  content: {
    flex: 1
  },
});

class UserList extends Component {

  static propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func,
    createUser: PropTypes.func,
    deleteUser: PropTypes.func,
    updateUser: PropTypes.func,
    addMessage: PropTypes.func,
    go: PropTypes.func,
    users: PropTypes.object
  };

  static needs = [
    userActions.getUsers
  ];

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  delete = (user) => {
    const { deleteUser } = this.props;
    deleteUser(user._id);
  };

  edit = (user) => {
    this.props.go(`/users/${user._id}`);
  };

  addUser = () => {
    this.props.go('/users/new');
  }

  message = () => {
    const { addMessage } = this.props;
    this._count = this._count || 0;

    addMessage(++this._count + ' sheep');
  }

  renderList() {
    const { users } = this.props;
    const rightElement = (
      <MenuButton icon={<NavigationMoreVert block/>}>
        <MenuItem autoFocus dense onTouchTap={this.addUser}>{_l`Add`}</MenuItem>
      </MenuButton>
    );
    return (
      <Scrollable className={css.content} >
        <Toolbar transparent onTouchTapRightIcon={this.portal} rightElement={rightElement}>
          <ToolbarTitle>Users</ToolbarTitle>
        </Toolbar>
        <List>
          <Transition
            className={css.container}
            enter={{
              height: 56,
              // left: 0,
              scale: 1,
              opacity: 1,
            }}
            leave={{
              height: 0,
              scale: 0.5,
              opacity: -1,
            }}
            appear={{
              height: 0,
              scale: 0.5,
              // left: 0,
              opacity: 1,
            }}
          >
            {
              Object.keys(users).map(id => {
                const user = users[id]
                return (
                  <ListItem divider key={id} payload={user} onTouchTap={this.edit}>
                    <View column grow={1}><span>{user.name.first} {user.name.last} ({user.email})</span></View>
                    <View row grow={0}>
                      <MenuButton icon={<NavigationMoreVert block/>}>
                        <MenuItem icon={<EditorModeEdit/>} autoFocus dense onTouchTap={this.edit} payload={user}>{_l`Edit`}</MenuItem>
                        <MenuItem icon={<ActionDelete/>} dense onTouchTap={this.delete} payload={user}>{_l`Delete`}</MenuItem>
                      </MenuButton>
                    </View>
                  </ListItem>
                )
              })
            }
          </Transition>
        </List>
      </Scrollable>
    );
  }

  render() {
    const { children } = this.props;
    return (
      <Layout>
        <MainAppBar>
          <RaisedButton label={_l`Message`} onTouchTap={this.message} />
        </MainAppBar>
        <SplitPane leftComponent={this.renderList()}>
          {children}
        </SplitPane>
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    go: bindActionCreators(routeActions.push, dispatch),
    addMessage: bindActionCreators(userMessageActions.addMessage, dispatch),
    createUser: bindActionCreators(userActions.createUser, dispatch),
    getUser: bindActionCreators(userActions.getUser, dispatch),
    updateUser: bindActionCreators(userActions.updateUser, dispatch),
    deleteUser: bindActionCreators(userActions.deleteUser, dispatch),
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);