import React, { PropTypes, Component } from 'react';
import Transition from 'react-motion-ui-pack';
import shallowCompare from 'react-addons-shallow-compare';
import Scrollable from 'components/Scrollable';
import { Drawer, Dialog, DialogTitle, DialogContent, DialogActions, View, FlatButton, Layout, Toolbar, TextField, RaisedButton } from 'oxygen-md';
import fetchComponentData from 'lib/fetchComponentData';
import MainAppBar from 'components/MainAppBar';

import EditorModeEdit from 'oxygen-md-svg-icons/lib/SvgIcons/EditorModeEdit';
import ActionDelete from 'oxygen-md-svg-icons/lib/SvgIcons/ActionDelete';

import { SplitPane, Toggle, List, ListItem, DrawerHeader, IconButton, MenuItem } from 'oxygen-md';

import { SnackBar } from 'oxygen-md';

import * as userActions from 'reducers/userReducer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as homeActions from 'reducers/homeReducer';
import * as userMessageActions from 'reducers/userMessageReducer';

import { addMessages, translate as _l } from 'lib/I18n';

import ContentClear from 'oxygen-md-svg-icons/lib/SvgIcons/ContentClear';
import ActionAccessibility from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccessibility';
import ActionAccountBalance from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountBalance';
import ActionAccountBalanceWallet from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountBalanceWallet';
import ActionAccountBox from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountBox';


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
    'Locked': 'Locked',
    'Active': 'Active',
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

class Users extends Component {
  state = {
    edit: null,
    portal: false,
  };

  static propTypes = {
    dispatch: PropTypes.func,
    openDrawer: PropTypes.func,
    createUser: PropTypes.func,
    deleteUser: PropTypes.func,
    updateUser: PropTypes.func,
    users: PropTypes.object
  };

  static needs = [
    userActions.getUsers
  ];

  componentWillMount() {
    fetchComponentData(this.props.dispatch, [this.constructor]);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  addUser = () => {
    const { createUser } = this.props;
    createUser({
      name: {
        first: this.refs.first.getValue(),
        last: this.refs.last.getValue(),
      },
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
    }).then(res => {
      this.props.addMessage(res.message);
      if (!res.error) {
        this.setState({ edit: null, portal: false });
      }
      // if (res.error) {
      // } else {
      // }
    })
  };

  delete(user) {
    const { deleteUser } = this.props;
    deleteUser(user._id);
  }

  save = () => {
    if (this.state.edit) {
      this.updateUser();
    } else {
      this.addUser();
    }
  };

  edit(user) {
    this.props.getUser(user._id).then(res => {
      console.log(res);
      this.setState({ edit: res.data, portal: true });
    })
  }

  updateUser() {
    const { updateUser } = this.props;
    const { edit } = this.state;
    updateUser(edit._id, {
      name: {
        first: this.refs.first.getValue(),
        last: this.refs.last.getValue(),
      },
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
    }, _l`User updated` ).then(res => {
      if (res.error) {
        this.props.addMessage(res.message);
      } else {
        this.setState({ portal: false });
        this.props.addMessage(res.message);
      }
    });
  }

  clear = () => {
    this.setState({ edit: null });
  };

  portal = () => {
    this.setState({ portal: !this.state.portal });
  };

  handleUserTap = user => {
    this.props.getUser(user._id);
  };

  drawer = () => {
    const { openDrawer } = this.props;
    openDrawer();
  }


  message = () => {
    const { addMessage } = this.props;
    this._count = this._count || 0;

    addMessage(++this._count + ' sheep');
  }

  renderList() {
    const { users } = this.props;
    return (
      <Scrollable className={css.content} >
        <Toolbar transparent onTouchTapRightIcon={this.portal} rightIcon={<ContentClear block/>}>Users</Toolbar>
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
                  <ListItem divider key={id} payload={user} onTouchTap={this.handleUserTap}>
                    <View column grow={1}><span>{user.name.first} {user.name.last} ({user.email})</span></View>
                    <View row grow={0}>
                      <IconButton onTouchTap={this.edit.bind(this, user)} ><EditorModeEdit block/></IconButton>
                      <IconButton onTouchTap={this.delete.bind(this, user)}><ActionDelete block/></IconButton>
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
    const { edit, portal } = this.state;
    const { name, email } = edit || {};
    const list = this.renderList();

    const label = edit ? _l`Save` : _l`Add`;
//          <View row>
//            <View grow={1} column><RaisedButton primary inversed onTouchTap={this.portal} fullWidth label={_l`Dialog`} /></View>
//          </View>\
//

    let child;
    if (portal) {
      child = (
        <div>
          <Toolbar transparent onTouchTapRightIcon={this.portal} rightIcon={<ContentClear block/>}>Hi</Toolbar>
          <DialogTitle>{_l`User`}</DialogTitle>
          <DialogContent>
            <TextField autoFocus ref="first" value={edit && name.first} floatingLabelText={_l`First name`}/>
            <TextField ref="last" value={edit && name.last} floatingLabelText={_l`Last name`}/>
            <TextField ref="email" value={edit && email} floatingLabelText={_l`E-mail`}/>
            <TextField type="password" ref="password" floatingLabelText={_l`Password`}/>
            <Toggle ref="active" checked={edit && edit.active} label={_l`Active`} />
            <Toggle ref="locked" checked={edit && edit.locked} label={_l`Locked`} />
          </DialogContent>
          <DialogActions>
            <FlatButton primary onTouchTap={this.save} label={label}/>
            <FlatButton onTouchTap={this.clear} label={_l`Clear`}/>
          </DialogActions>
        </div>
      );
    }
    return (
      <Layout>
        <MainAppBar>
          <RaisedButton label={_l`Add`} onTouchTap={this.portal} />
          <RaisedButton label={_l`Message`} onTouchTap={this.message} />
        </MainAppBar>
        <SplitPane leftComponent={list}>
          {child}
        </SplitPane>
        <Dialog onRequestClose={this.portal} onRequestOpen={this.portal} open={portal && false}>
          <DialogTitle>{_l`User`}</DialogTitle>
          <DialogContent>
            <TextField autoFocus ref="first" value={edit && name.first} floatingLabelText={_l`First name`}/>
            <TextField ref="last" value={edit && name.last} floatingLabelText={_l`Last name`}/>
            <TextField ref="email" value={edit && email} floatingLabelText={_l`E-mail`}/>
            <TextField type="password" ref="password" floatingLabelText={_l`Password`}/>
          </DialogContent>
          <DialogActions>
            <FlatButton primary onTouchTap={this.save} label={label}/>
            <FlatButton onTouchTap={this.clear} label={_l`Clear`}/>
          </DialogActions>
        </Dialog>
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    addMessage: bindActionCreators(userMessageActions.addMessage, dispatch),
    openDrawer: bindActionCreators(homeActions.openDrawer, dispatch),
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

export default connect(mapStateToProps, mapDispatchToProps)(Users);