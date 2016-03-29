import React, { PropTypes, Component } from 'react';
import Transition from 'react-motion-ui-pack';
import shallowCompare from 'react-addons-shallow-compare';
import Scrollable from 'components/Scrollable';
import { Drawer, Dialog, DialogTitle, DialogContent, DialogActions, View, FlatButton, Layout, Toolbar, TextField, RaisedButton } from 'oxygen-md';
import fetchComponentData from 'lib/fetchComponentData';
import MainAppBar from 'components/MainAppBar';

import EditorModeEdit from 'oxygen-md-svg-icons/lib/SvgIcons/EditorModeEdit';
import ActionDelete from 'oxygen-md-svg-icons/lib/SvgIcons/ActionDelete';

import { List, ListItem, DrawerHeader, IconButton, MenuItem } from 'oxygen-md';

import { SnackBar } from 'oxygen-md';

import * as userActions from 'reducers/UserReducer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as homeActions from 'reducers/HomeReducer';

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
    'User updated': 'User updated',
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
    users: PropTypes.array
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
    });
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
    this.setState({ edit: null });
  };

  edit(user) {
    this.setState({ edit: user, portal: true });
  }

  updateUser() {
    const { updateUser, addMessage } = this.props;
    const { edit } = this.state;
    updateUser(edit._id, {
      name: {
        first: this.refs.first.getValue(),
        last: this.refs.last.getValue(),
      },
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
    }, _l`User updated` ).then(() => {
      this.setState({ portal: false });
    });
  }

  clear = () => {
    this.setState({ edit: null });
  };

  portal = () => {
    this.setState({ portal: !this.state.portal });
  };

  handleUserTap = user => {
    this.edit(user);
  };

  drawer = () => {
    const { openDrawer } = this.props;
    openDrawer();
  }

  nextMessage = () => {
    const { nextMessage } = this.props;
    nextMessage();
  }

  message = () => {
    const { addMessage } = this.props;
    this._count = this._count || 0;

    addMessage(++this._count + ' sheep');
  }

  render() {
    const { users, message } = this.props;
    const { edit, portal } = this.state;
    const { name, email } = edit || {};

    const label = edit ? _l`Save` : _l`Add`;
//          <View row>
//            <View grow={1} column><RaisedButton primary inversed onTouchTap={this.portal} fullWidth label={_l`Dialog`} /></View>
//          </View>
    return (
      <Layout>
        <MainAppBar>
          <RaisedButton label={_l`Add`} onTouchTap={this.portal} />
          <RaisedButton label={_l`Message`} onTouchTap={this.message} />
        </MainAppBar>
        <Scrollable className={css.content} >
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
              users.map(user =>
                <ListItem divider key={user._id} payload={user} onTouchTap={this.handleUserTap}>
                  <View column grow={1}><span>{user.name.first} {user.name.last} ({user.email})</span></View>
                  <View row grow={0}>
                    <IconButton onTouchTap={this.edit.bind(this, user)} ><EditorModeEdit block/></IconButton>
                    <IconButton onTouchTap={this.delete.bind(this, user)}><ActionDelete block/></IconButton>
                  </View>
                </ListItem>
              )
            }
          </Transition>
          </List>
        </Scrollable>
        <Dialog onRequestClose={this.portal} onRequestOpen={this.portal} open={portal}>
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
        <SnackBar message={message.message} time={message.time} onRequestNext={this.nextMessage}/>
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    addMessage: bindActionCreators(userMessageActions.addMessage, dispatch),
    nextMessage: bindActionCreators(userMessageActions.nextMessage, dispatch),
    openDrawer: bindActionCreators(homeActions.openDrawer, dispatch),
    createUser: bindActionCreators(userActions.createUser, dispatch),
    updateUser: bindActionCreators(userActions.updateUser, dispatch),
    deleteUser: bindActionCreators(userActions.deleteUser, dispatch),
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    message: state.userMessage.currentMessage
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);